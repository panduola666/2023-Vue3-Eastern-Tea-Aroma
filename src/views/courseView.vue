<template>
  <main class="wrap">
    <teleport to="title">{{ currentCourse.course?.title }}</teleport>
    <div class="flex justify-end mb-2">
      <router-link
        to="/courses"
        class="flex items-center text-gray-02 hover:text-gray-01"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4 mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
        返回搜尋</router-link
      >
    </div>
    <h1 class="text-3xl font-black font-self text-brand-02">
      {{ currentCourse.course?.title }}
    </h1>
    <div class="grid lg:grid-cols-3 gap-3 mt-5">
      <img
        :src="currentCourse.course?.coverUrl"
        :alt="currentCourse.course?.title"
        class="w-full h-56 object-cover"
      />
      <section
        class="lg:col-span-2 flex flex-col justify-between gap-3 lg:text-xl"
      >
        <h3 class="flex justify-between items-center">
          時間：{{ $date(currentCourse.start).format('YYYY-MM-DD HH:mm') }}~{{
            $date(currentCourse.end).format('HH:mm')
          }}
          <button
            type="button"
            class="btn-outline flex-shrink-0 md:text-base py-2 px-2 sm:px-5 text-sm"
            @click="() => patchSaved(currentCourse)"
            v-if="isLogin"
          >
            {{ isSaved ? '取消收藏' : '收藏課程' }}
          </button>
        </h3>
        <h2>講師：{{ currentCourse.user?.name }} 講師</h2>
        <p class="flex justify-between">
          價格：{{
            currentCourse.course && toThousand(currentCourse.course?.price)
          }}
          元<span class="text-gray-02 text-base"
            >剩餘: {{ currentCourse.total - remainingNumber }}</span
          >
        </p>
        <button
          type="button"
          class="btn-primary"
          :disabled="
            currentCourse.total - remainingNumber <= 0 ||
            currentCourse.start < new Date()
          "
          @click="() => addToCart('courses', currentCourse)"
        >
          <span v-if="currentCourse.start < new Date()">已結束</span>
          <span v-else-if="currentCourse.total - remainingNumber <= 0"
            >預約已滿</span
          >
          <span v-else>加入購物車</span>
        </button>
      </section>
    </div>
    <DiscountInfo v-if="currentCourse.isDiscount" />
    <article
      class="text-brand-05 lg:text-lg font-medium leading-8 tracking-wider mt-10"
    >
      <p class="font-self text-2xl font-black">課程簡介</p>
      <ul class="grid gap-4 my-4">
        <li
          v-for="(content, index) in currentCourse.course?.contents"
          :key="content + index"
        >
          {{ content }}
        </li>
      </ul>
    </article>
    <p class="font-self text-gray-01 mt-16">其他時段</p>
    <ol class="list-disc list-inside">
      <template v-for="(course, index) in courses" :key="index">
        <template
          v-for="(courseDate, index) in course.courseDates"
          :key="index"
        >
          <li
            class="text-gray-02 py-2 px-1"
            v-if="
              courseDate.courseId === currentCourse.course?.id &&
              courseDate.start > new Date() &&
              courseDate.id !== +this.$route.params.id
            "
          >
            <router-link
              :to="`/course/${courseDate.id}`"
              class="hover:text-gray-01 underline underline-offset-2 hover:bg-brand-03 hover:bg-opacity-20"
            >
              <span
                >{{ $date(courseDate.start).format('YYYY-MM-DD') }} /星期{{
                  ['日', '一', '二', '三', '四', '五', '六'][
                    $date(courseDate.start).day()
                  ]
                }}
                - {{ $date(courseDate.start).format('HH:mm') }}~{{
                  $date(courseDate.end).format('HH:mm')
                }}
                ／ 價格: {{ toThousand(course.price) }} 元 (
                {{ modeUrl + courseDate.id }} )
              </span>
            </router-link>
          </li>
        </template>
      </template>
    </ol>
    <CourseList class="border-t-2 border-line mt-10 pt-5" />
  </main>
</template>
<script>
import CourseList from '../components/CourseList.vue'
import DiscountInfo from '../components/DiscountInfo.vue'
import {
  userStore,
  coursesStore,
  ordersStore,
  toThousand
} from '../stores/index.js'
import { mapState, mapActions } from 'pinia'
const { MODE } = import.meta.env
export default {
  computed: {
    ...mapState(coursesStore, ['currentCourse', 'courses']),
    ...mapState(ordersStore, ['orders']),
    ...mapState(userStore, ['isLogin']),
    remainingNumber() {
      const reserveDates = []
      this.orders.forEach((order) => {
        order.cart.forEach((item) => {
          if (item.courseDateId) {
            reserveDates.push({
              courseDateId: item.courseDateId,
              number: item.number
            })
          }
        })
      })
      let reserveNum = 0
      reserveDates.forEach((item) => {
        if (item.courseDateId === +this.$route.params.id) {
          reserveNum += item.number
        }
      })
      return reserveNum
    },
    isSaved() {
      return (
        this.currentCourse.savedUsersId &&
        this.currentCourse.savedUsersId.includes(
          +sessionStorage.getItem('userId')
        )
      )
    },
    modeUrl() {
      return MODE === 'production'
        ? 'https://panduola666.github.io/2023-Vue3-Eastern-Tea-Aroma/#/course/'
        : 'http://127.0.0.1:5173/#/course/'
    }
  },
  methods: {
    ...mapActions(coursesStore, ['getCurrent', 'getCoursesData', 'patchSaved']),
    ...mapActions(ordersStore, ['getOrdersData']),
    ...mapActions(userStore, ['addToCart']),
    toThousand
  },
  watch: {
    '$route.params.id'(id) {
      if (id) this.getCurrent(id)
    }
  },
  mounted() {
    const { id } = this.$route.params
    this.getCurrent(id)
    this.getOrdersData()
    this.getCoursesData()
  },
  components: {
    CourseList,
    DiscountInfo
  }
}
</script>
