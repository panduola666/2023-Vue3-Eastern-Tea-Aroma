<template>
  <main class="admin-wrap">
    <h1 class="text-3xl font-black font-self text-brand-02">課程列表</h1>
    <div class="flex justify-end gap-5 mb-5">
      <button type="button" class="btn-outline" @click="allDiscount">
        全部套用
      </button>
      <PostCourseModal :is-new="true">
        <template #btn-content>
          <button
            typeof="button"
            class="btn-primary"
            @click="() => getCurrent(0, true)"
          >
            開新課程
          </button>
        </template>
      </PostCourseModal>
    </div>
    <ul class="grid gap-5">
      <template
        v-for="course in courses.sort((a, b) => b.id - a.id)"
        :key="course.id + course.title"
      >
        <div
          v-for="date in course.courseDates.sort((a, b) => b.id - a.id)"
          :key="`課程編號${date.courseId}的第${date.id}堂`"
        >
          <li is="vue:CoursesCard" v-if="date.userId === user.id">
            <template #image>
              <img
                :src="course.coverUrl"
                :alt="course.title"
                class="w-full h-64 object-cover"
              />
            </template>
            <template #card-header>
              <h1>{{ course.title }}</h1>
              <PostCourseModal :is-new="false">
                <template #btn-content>
                  <button
                    typeof="button"
                    class="btn-outline py-2 text-base mb-1"
                    @click="() => getCurrent(date.id)"
                  >
                    編輯
                  </button>
                </template>
              </PostCourseModal>
            </template>
            <template #card-body>
              <p>
                時段：{{ $date(date.start).format('YYYY-MM-DD') }} /
                {{ $date(date.start).format('HH:mm') }}~{{
                  $date(date.end).format('HH:mm')
                }}
              </p>
              <p>開放人數：{{ date.total }}人</p>
              <p>評分：{{ score(course.scores) }}</p>
              <p class="text-xl text-end">$ {{ toThousand(course.price) }}</p>
            </template>
            <template #card-footer>
              <div
                class="flex flex-grow gap-3 flex-col md:flex-row justify-between"
              >
                <DiscountToggle
                  v-model:is-discount="date.isDiscount"
                  :id="date.id"
                  :which="'courseDates'"
                  class="justify-end my-3 md:my-0 md:justify-start"
                ></DiscountToggle>
                <div class="flex flex-col-reverse md:flex-row gap-3">
                  <button
                    typeof="button"
                    class="btn-outline"
                    @click="() => deleteCurrent(date.id)"
                  >
                    刪除
                  </button>
                  <router-link
                    :to="`/course/${date.id}`"
                    class="btn-outline text-center"
                    >課程詳情</router-link
                  >
                  <OrderCourseModal :orders="orders" :id="date.id">
                    <template #btn-content>
                      <button
                        typeof="button"
                        class="btn-primary md:w-max w-full"
                        @click="() => getCurrent(date.id)"
                      >
                        預約詳情
                      </button>
                    </template>
                  </OrderCourseModal>
                </div>
              </div>
            </template>
          </li>
        </div>
      </template>
    </ul>
  </main>
</template>
<script>
import CoursesCard from '../../components/CoursesCard.vue'
import PostCourseModal from '../../components/PostCourseModal.vue'
import OrderCourseModal from '../../components/OrderCourseModal.vue'
import DiscountToggle from '../../components/DiscountToggle.vue'
import { mapState, mapActions } from 'pinia'
import {
  coursesStore,
  userStore,
  ordersStore,
  toThousand
} from '../../stores/index'
const { VITE_BASEURL } = import.meta.env

export default {
  data() {
    return {
      // isNew: false
    }
  },
  computed: {
    ...mapState(coursesStore, ['courses']),
    ...mapState(userStore, ['user']),
    ...mapState(ordersStore, ['orders'])
  },
  methods: {
    toThousand,
    ...mapActions(coursesStore, ['getCoursesData', 'getCurrent']),
    ...mapActions(userStore, ['getUserData']),
    ...mapActions(ordersStore, ['getOrdersData']),
    score(scoreData) {
      const total = scoreData.reduce((num, item) => (num += item.score), 0)
      const avg = Math.round((total / scoreData.length) * 10) / 10
      return isNaN(avg) ? 0 : avg.toFixed(1)
    },
    allDiscount() {
      this.courses.forEach((course) => {
        course.courseDates.forEach((date) => {
          if (date.isDiscount) return
          this.$http
            .patch(`${VITE_BASEURL}/courseDates/${date.id}`, {
              isDiscount: true
            })
            .then(() => {
              date.isDiscount = true
            })
        })
      })
      //   console.log(this.courses)
    },
    deleteCurrent(id) {
      this.$http.delete(`${VITE_BASEURL}/courseDates/${id}`).then(() => {
        return this.$swal
          .fire({
            icon: 'success',
            title: '刪除課程成功',
            showConfirmButton: false,
            timer: 1500,
            allowOutsideClick: false
          })
          .then((res) => {
            if (res.isDismissed) {
              this.getCoursesData()
            }
          })
      })
    }
  },
  mounted() {
    this.getCoursesData()
    this.getUserData()
    this.getOrdersData()
  },
  components: {
    CoursesCard,
    PostCourseModal,
    OrderCourseModal,
    DiscountToggle
  }
}
</script>
