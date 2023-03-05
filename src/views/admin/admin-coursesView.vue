<template>
  <main class="admin-wrap">
    <h1 class="text-3xl font-black font-self text-brand-02">課程列表</h1>
    <div class="flex justify-end gap-5 mb-5">
      <button type="button" class="btn-outline">全部套用</button>
      <PostCourseModal>
        <template #btn-content>
          <button typeof="button" class="btn-primary">開新課程</button>
        </template>
      </PostCourseModal>
    </div>
    <ul class="grid gap-5">
      <template v-for="course in courses" :key="course.id + course.title">
        <div
          v-for="date in course.courseDates"
          :key="`課程編號${date.courseId}的第${date.id}堂`"
        >
          <li is="vue:CoursesCard" v-if="date.userId === user.id">
            <template #image>
              <img
                :src="course.coverUrl"
                :alt="course.title"
                class="w-full h-full object-cover"
              />
            </template>
            <template #card-header>
              <h1>{{ course.title }}</h1>
              <PostCourseModal>
                <template #btn-content>
                  <button
                    typeof="button"
                    class="btn-outline py-2 text-base mb-1"
                  >
                    編輯
                  </button>
                </template>
              </PostCourseModal>
            </template>
            <template #card-body>
              <!-- {{ date }} -->
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
                class="flex flex-grow gap-3 flex-col md:flex-row justify-end"
              >
                <DiscountToggle
                  v-model:is-discount="date.isDiscount"
                  class="justify-end my-3 md:my-0 md:justify-start flex-grow"
                ></DiscountToggle>
                <div class="grid grid-cols-2 gap-3">
                  <button typeof="button" class="btn-outline">刪除</button>
                  <router-link to="" class="btn-outline text-center"
                    >課程詳情</router-link
                  >
                </div>
                <OrderCourseModal>
                  <template #btn-content>
                    <button typeof="button" class="btn-primary md:w-max w-full">
                      預約詳情
                    </button>
                  </template>
                </OrderCourseModal>
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
import { coursesStore, userStore, toThousand } from '../../stores/index'
export default {
  computed: {
    ...mapState(coursesStore, ['courses']),
    ...mapState(userStore, ['user'])
  },
  methods: {
    toThousand,
    ...mapActions(coursesStore, ['getCoursesData']),
    ...mapActions(userStore, ['getUserData']),
    score(scoreData) {
      const total = scoreData.reduce((num, item) => (num += item.score), 0)
      const avg = Math.round((total / scoreData.length) * 10) / 10
      return isNaN(avg) ? 0 : avg.toFixed(1)
    }
  },
  mounted() {
    this.getCoursesData()
    this.getUserData()
  },
  components: {
    CoursesCard,
    PostCourseModal,
    OrderCourseModal,
    DiscountToggle
  }
}
</script>
