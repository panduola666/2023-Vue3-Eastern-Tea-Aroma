<template>
  <DialogModal>
    <template #modal-btn>
      <slot name="btn-content">按鈕</slot>
    </template>
    <template #modal-header>
      <h3 class="text-xl font-self">{{ currentCourse.course?.title }}</h3>
    </template>
    <template #modal-body>
      <div class="grid lg:grid-cols-3 gap-3">
        <img
          :src="currentCourse.course?.coverUrl"
          :alt="currentCourse.course?.title"
          class="w-full h-64 object-cover"
        />
        <div class="lg:col-span-2 lg:text-2xl flex flex-col gap-5">
          <p>
            時段：{{ $date(currentCourse.start).format('YYYY-MM-DD') }} ({{
              ['日', '一', '二', '三', '四', '五', '六'][
                $date(currentCourse.start).day()
              ]
            }}) / {{ $date(currentCourse.start).format('HH:mm') }}~{{
              $date(currentCourse.end).format('HH:mm')
            }}
          </p>
          <p>開放人數：{{ currentCourse.total }}人</p>
          <p class="grid lg:grid-cols-2 gap-y-3">
            已預約：{{ reserveNumber }}人<span class="text-gray-02"
              >剩餘：{{ currentCourse.total - reserveNumber }}人</span
            >
          </p>
        </div>
      </div>
      <p class="my-4 text-xl">學員名單</p>
      <table class="w-full table-auto text-center divide-y-2 border-2">
        <thead class="bg-brand-03 bg-opacity-20">
          <tr>
            <th class="py-2">姓名</th>
            <th>手機號碼</th>
            <th>付款方式</th>
            <th>人數</th>
            <th>評分</th>
          </tr>
        </thead>
        <tbody class="divide-y-2">
          <tr v-for="user in reserveList" :key="user.userId">
            <td class="truncate py-2 max-w-[40px]">{{ user.name }}</td>
            <td>
              {{ user.tel }}
            </td>
            <td>{{ user.method }}</td>
            <td>{{ user.number }}</td>
            <td>{{ user.score ? user.score : '尚未評分' }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <template #modal-footerBTN>
      <span></span>
    </template>
  </DialogModal>
</template>
<script>
import DialogModal from '../components/DialogModal.vue'
import { mapState } from 'pinia'
import { coursesStore } from '../stores/index'
export default {
  props: {
    orders: {
      type: Object
    },
    id: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      range: {
        start: new Date(),
        end: new Date()
      },
      masks: {
        input: 'YYYY-MM-DD h:mm A'
      }
    }
  },
  computed: {
    ...mapState(coursesStore, ['currentCourse']),
    reserveNumber() {
      let number = 0
      this.orders.forEach((order) => {
        order.cart.forEach((product) => {
          if (
            product.courseDateId &&
            product.courseDateId === this.currentCourse.id
          ) {
            number += product.number
          }
        })
      })
      return number
    },
    reserveList() {
      const final = []
      this.orders.forEach((order) => {
        order.cart.forEach((product) => {
          if (
            product.courseDateId &&
            product.courseDateId === this.currentCourse.id
          ) {
            console.log(order.buyerInfo)
            const data = {
              userId: order.userId,
              name: order.buyerInfo.name,
              tel: order.buyerInfo.tel,
              method: order.buyerInfo.payMethods.choose,
              number: product.number,
              score: 0
            }
            final.push(data)
          }
        })
      })
      if (this.id === this.currentCourse.id) {
        this.currentCourse.course.scores.forEach((item) => {
          const index = final.findIndex((list) => list.userId === item.userId)
          if (index !== -1) {
            final[index].score = item.score
          }
        })
      }
      return final
    }
  },
  components: {
    DialogModal
  }
}
</script>
