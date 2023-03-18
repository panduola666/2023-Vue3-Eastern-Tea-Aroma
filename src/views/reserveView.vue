<template>
  <main class="wrap">
    <teleport to="title">課程預約</teleport>
    <h1 class="text-3xl font-black font-self text-brand-02">課程預約</h1>
    <ol class="grid gap-3 my-5">
      <template v-for="course in courses" :key="course.id + course.title">
        <template v-for="date in course.courseDates" :key="`第${date.id}課`">
          <template
            v-for="(reserve, index) in reserves"
            :key="reserve.description + index"
          >
            <li
              is="vue:CoursesCard"
              v-if="
                date.dates === reserve.start &&
                reserve.description.match(course.title) &&
                isReserveDay(date)
              "
            >
              <template #image>
                <img
                  :src="course.coverUrl"
                  :alt="course.title"
                  class="h-full w-full object-cover"
                />
              </template>
              <template #card-header>
                {{ course.title }}
                <span class="text-brand-04 text-base self-center font-sans">{{
                  $date(date.start).format('YYYY-MM-DD')
                }}</span>
              </template>
              <template #card-body>
                <p>
                  時間：<span
                    >星期{{
                      ['日', '一', '二', '三', '四', '五', '六'][
                        $date(date.start).day()
                      ]
                    }}
                    / {{ $date(date.start).format('HH:mm') }}~{{
                      $date(date.end).format('HH:mm')
                    }}</span
                  >
                </p>
                <h2>講師：{{ course.user.name }} 講師</h2>
                <div class="grid lg:grid-cols-2">
                  <p>
                    評分：
                    {{
                      isNaN(scoreAvg(course.scores))
                        ? '尚未評分'
                        : `${scoreAvg(course.scores)} / 5.0`
                    }}
                  </p>
                  <p class="text-brand-01">
                    <span v-if="scoreGiven(course.scores)"
                      >已評分: {{ scoreGiven(course.scores) }} 分</span
                    >
                    <template v-else>
                      給老師打分: {{ score ? score : hoverScore }}
                      <span class="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          class="w-5 h-5 stroke-brand-02 cursor-pointer"
                          :class="{
                            'fill-brand-02': (i <= score) | (i <= hoverScore),
                            'fill-transparent': i > hoverScore
                          }"
                          v-for="i in 5"
                          :key="i"
                          @mouseover="() => (hoverScore = i)"
                          @mouseleave="() => (hoverScore = score)"
                          @click="() => patchScore(course.id)"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </span>
                    </template>
                  </p>
                </div>
                <p class="text-end text-lg">$ {{ toThousand(course.price) }}</p>
              </template>
              <template #card-footer>
                <router-link
                  :to="`/course/${date.id}`"
                  class="btn-primary py-2 px-3"
                  >課程詳情</router-link
                >
              </template>
            </li>
          </template>
        </template>
      </template>
    </ol>
    <p v-if="!hasReserve" class="text-center text-2xl py-10">
      {{ $date(calendarDate).format('M / D') }} 無預約課程
    </p>
    <v-date-picker
      v-model="calendarDate"
      :model-config="modelConfig"
      color="teal"
      :attributes="attributes"
      is-expanded
      trim-weeks
    />
  </main>
</template>
<script>
import { mapState, mapActions } from 'pinia'
import {
  ordersStore,
  coursesStore,
  userStore,
  toThousand
} from '../stores/index.js'
import CoursesCard from '../components/CoursesCard.vue'
const { VITE_BASEURL } = import.meta.env

export default {
  data() {
    return {
      score: 0,
      hoverScore: 0,
      calendarDate: new Date(), // 選擇日曆的某一天
      modelConfig: {
        type: 'number'
      },
      hasReserve: false
    }
  },
  computed: {
    ...mapState(userStore, ['user']),
    ...mapState(ordersStore, ['orders']),
    ...mapState(coursesStore, ['courses']),
    reserves() {
      const reserves = []
      const final = []
      this.orders.forEach((order) => {
        if (order.isCancel) return
        if (order.userId === +sessionStorage.getItem('userId')) {
          order.cart.forEach((product) => {
            if (product.courseDateId) {
              const data = {
                dates: product.start,
                description: `${product.name} ${this.$date(
                  product.start
                ).format('HH:mm')} ~ ${this.$date(product.end).format('HH:mm')}`
              }
              if (!reserves.includes(JSON.stringify(data))) {
                reserves.push(JSON.stringify(data))
                final.push(data)
              }
            }
          })
        }
      })
      return final
    },
    // 日歷設定,勿碰
    attributes() {
      return [
        ...this.reserves.map((course) => {
          return {
            dates: course.dates,
            dot: {
              color: 'red'
            },
            popover: {
              // 彈跳視窗配置
              label: course.description,
              visibility: 'hover', // 顯示彈出窗口方式 點擊顯示:focus/click 默認:hover
              hideIndicator: false, // 是否隱藏彈跳視窗前方圖標
              customData: course // 自定義數據
            }
          }
        })
      ]
    }
  },
  methods: {
    ...mapActions(ordersStore, ['getOrdersData']),
    ...mapActions(coursesStore, ['getCoursesData']),
    toThousand,
    scoreAvg(scoreDate) {
      const avg =
        Math.round(
          (scoreDate.reduce((num, item) => (num += item.score), 0) * 10) /
            scoreDate.length
        ) / 10
      return avg.toFixed(1)
    },
    isReserveDay(date) {
      const flag =
        this.$date(date.start).format('YYYY-MM-DD') ===
        this.$date(this.calendarDate).format('YYYY-MM-DD')
      if (flag) {
        this.hasReserve = flag
        return flag
      }
    },
    scoreGiven(scoreDate) {
      let userScore = 0
      scoreDate.forEach((item) => {
        if (item.userId === +sessionStorage.getItem('userId')) {
          userScore = item.score
        }
      })
      return userScore
    },
    patchScore(id) {
      this.score = this.hoverScore
      const index = this.courses.findIndex((item) => item.id === id)
      const { scores } = this.courses[index]
      const data = {
        score: this.score,
        userId: this.user.id
      }
      scores.push(data)
      this.$http
        .patch(`${VITE_BASEURL}/courses/${id}`, { scores })
        .then((res) => {
          console.log(res.data)
        })
    }
  },
  watch: {
    calendarDate() {
      this.hasReserve = false
    }
  },
  mounted() {
    this.getOrdersData()
    this.getCoursesData()
  },
  components: {
    CoursesCard
  }
}
</script>
<style>
.vc-weekday {
  color: #727272;
}
</style>
