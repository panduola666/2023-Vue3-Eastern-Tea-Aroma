<template>
  <div>
    <DialogModal
      :finish-fn="finishFn"
      :cancel-fn="cancelFn"
      :is-finish="isFinish"
    >
      <template #modal-btn>
        <div @click="() => (isFinish = false)">
          <slot name="btn-content">按鈕</slot>
        </div>
      </template>
      <template #modal-header>
        <h3 class="text-xl font-self">修改折扣碼</h3>
      </template>
      <template #modal-body>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col">
            <label for="code">* 折扣碼</label>
            <input
              type="text"
              name="code"
              id="code"
              placeholder="請輸入折扣碼..."
              class="border border-gray-01 p-2 shadow-lg"
              v-model.trim="editorData.code"
            />
          </div>
          <div class="flex flex-col">
            <label for="type" class="">* 折扣方式</label>
            <select
              name="type"
              id="type"
              class="border border-gray-01 p-2 shadow-lg"
              v-model="editorData.type"
              @change="() => (editorData.scale = '')"
            >
              <option value="" selected disabled>請選擇折扣方式</option>
              <option value="percentage">百分比</option>
              <option value="money">實際金額</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-6">
            <div class="flex flex-col">
              <p>* 截止日期</p>
              <v-date-picker
                class="inline-block flex-grow"
                v-model="editorData.end"
                color="teal"
              >
                <template v-slot="{ inputValue, togglePopover }">
                  <div
                    class="flex items-center border border-gray-01 shadow-lg h-full"
                  >
                    <button
                      type="button"
                      class="p-2 bg-brand-01 bg-opacity-10 border-r border-gray-01 hover:bg-opacity-30 focus:bg-brand-02 focus:outline-none group h-full"
                      @click="() => togglePopover()"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        class="w-4 h-4 fill-brand-01 group-focus:fill-white"
                      >
                        <path
                          d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
                        ></path>
                      </svg>
                    </button>
                    <input
                      :value="inputValue"
                      class="bg-white text-gray-700 border w-full py-1 px-2 appearance-none focus:outline-none h-full"
                      readonly
                    />
                  </div>
                </template>
              </v-date-picker>
            </div>
            <div v-if="editorData.type === 'money'">
              <label for="moneyScale">* 折扣額度</label>
              <input
                type="number"
                name="moneyScale"
                id="moneyScale"
                placeholder="請輸入金額..."
                class="border border-gray-01 p-2 shadow-lg w-full"
                v-model.number="editorData.scale"
                onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
              />
            </div>
            <div class="flex flex-col" v-else>
              <label for="percentageScale">* 折扣額度</label>
              <select
                name="percentageScale"
                id="percentageScale"
                class="border border-gray-01 p-2"
                v-model="editorData.scale"
              >
                <option value="" selected disabled>請選擇折扣比例</option>
                <option value="95">95 折</option>
                <option value="9">9 折</option>
                <option value="85">85 折</option>
                <option value="8">8 折</option>
                <option value="75">75 折</option>
              </select>
            </div>
          </div>
          <div class="bg-brand-03 bg-opacity-30 py-5 px-3 m-10">
            <table class="w-full text-center">
              <caption class="text-xl">
                優惠資訊
              </caption>
              <tr class="border-b border-b-gray-01">
                <th class="p-2">折扣碼</th>
                <th>折扣方式</th>
                <th>截止日期</th>
                <th>折扣額度</th>
              </tr>
              <tr class="text-2xl">
                <td class="p-2">{{ editorData.code }}</td>
                <td>
                  {{ editorData.type === 'money' ? '實際金額' : '百分比' }}
                </td>
                <td
                  :class="{
                    'text-red-500': editorData.end < new Date().getTime()
                  }"
                >
                  {{ $date(editorData.end).format('YYYY-MM-DD') }}
                </td>
                <td>
                  {{
                    editorData.type === 'money'
                      ? `${editorData.scale} 元`
                      : `${editorData.scale} 折`
                  }}
                </td>
              </tr>
            </table>
            <p
              v-if="editorData.end < new Date().getTime()"
              class="text-red-500 mt-5 text-xl font-bold text-end"
            >
              * 截止日期不可小於今日
            </p>
          </div>
        </div>
      </template>
    </DialogModal>
  </div>
</template>
<script>
import DialogModal from './DialogModal.vue'
import { mapActions } from 'pinia'
import { discountStore, productsStore, coursesStore } from '../stores/index.js'
const { VITE_BASEURL } = import.meta.env
export default {
  props: {
    discountData: {
      type: Object,
      required: true
    },
    allProducts: {
      type: Object,
      required: true
    },
    courses: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editorData: {},
      isFinish: false
    }
  },
  computed: {
    endDate() {
      const dateArr = new Date(this.date).toLocaleDateString().split('/')
      const date = new Date(...dateArr)
      return date
    }
  },
  methods: {
    ...mapActions(discountStore, ['getDiscountData']),
    ...mapActions(productsStore, ['getAllProducts']),
    ...mapActions(coursesStore, ['getCoursesData']),
    async finishFn() {
      const { code, type, scale, end } = this.editorData
      // 基本驗證
      if (!code) {
        this.$swal.fire({
          icon: 'error',
          title: '折扣碼 未填寫',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }
      if (!type) {
        this.$swal.fire({
          icon: 'error',
          title: '請選擇 折扣方式',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }
      if (!scale || scale <= 0) {
        this.$swal.fire({
          icon: 'error',
          title: '折扣額度 未填寫',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }
      if (end < new Date()) {
        this.$swal.fire({
          icon: 'error',
          title: '截止日期 不可小於今日',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }

      if (end < new Date()) {
        this.$swal.fire({
          icon: 'error',
          title: '截止日期不可小於今日',
          showConfirmButton: false,
          timer: 1500,
          allowOutsideClick: false
        })
        return
      }
      if (type === 'percentage') {
        this.editorData.scale = `0.${scale}`
      }
      const year = new Date(end).getFullYear()
      const month = new Date(end).getMonth()
      const day = new Date(end).getDate()
      this.editorData.end = new Date(year, month, day, 23, 59, 59).getTime()
      this.allProducts.forEach((product) => {
        if (type === 'money' && product.price - scale <= 0) {
          product.isDiscount = false
          if (product.isDiscount) return
          this.$http.patch(`${VITE_BASEURL}/products/${product.id}`, {
            isDiscount: false
          })
        }
      })
      this.courses.forEach((course) => {
        if (type === 'money' && course.price - scale <= 0) {
          course.courseDates.forEach((date) => {
            date.isDiscount = false
            if (course.isDiscount) return
            this.$http.patch(`${VITE_BASEURL}/courseDates/${date.id}`, {
              isDiscount: false
            })
          })
        }
      })
      await this.$http
        .patch(`${VITE_BASEURL}/discount`, this.editorData)
        .then(() => {
          this.$swal.fire({
            icon: 'success',
            title: '折扣碼修改成功',
            showConfirmButton: false,
            timer: 1500
          })
          this.editorData = { ...this.discountData }
          this.getDiscountData()
        })
      this.isFinish = true
    },
    cancelFn() {
      this.editorData = { ...this.discountData }
    }
  },
  watch: {
    discountData() {
      this.editorData = { ...this.discountData }
      if (this.editorData.type === 'percentage') {
        if ((this.editorData.scale * 100) % 10 === 0) {
          this.editorData.scale = this.editorData.scale * 10
        } else {
          this.editorData.scale = this.editorData.scale * 100
        }
      }
    }
  },
  components: {
    DialogModal
  }
}
</script>
