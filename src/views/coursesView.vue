<template>
  <main class="wrap">
    <teleport to="title">茶藝課堂</teleport>
    <h2 class="text-3xl font-black font-self text-brand-02">茶藝課堂</h2>
    <form
      class="shadow bg-white bg-opacity-20 border-2 border-brand-01 border-opacity-50 mt-2 mb-6 text-xl p-3 grid gap-3"
      @submit.prevent="() => userSearch()"
    >
      <p>
        <label for="keyWord" class="mr-3">課程關鍵字 /</label>
        <input
          type="text"
          name="keyWord"
          id="keyWord"
          placeholder="請輸入關鍵字..."
          class="border border-brand-01 px-3 py-1 md:w-2/3 w-full"
          v-model.trim="search.input"
        />
      </p>
      <div>
        <p>上課時間 /</p>
        <div class="flex flex-wrap gap-3">
          <label
            :for="item"
            class="cursor-pointer"
            v-for="(item, index) in ['一', '二', '三', '四', '五', '六', '日']"
            :key="item + index"
            ><input
              type="checkbox"
              :name="item"
              :id="item"
              class="scale-125 mr-2"
              :value="item"
              v-model.trim="search.weeks"
            />星期{{ item }}</label
          >
        </div>
      </div>
      <div class="flex justify-end gap-5 md:flex-row flex-col md:mt-0 mt-5">
        <button
          type="button"
          class="text-gray-02 py-2 px-4 hover:text-gray-01 duration-500"
          @click="() => clearSearch()"
        >
          清空列表
        </button>
        <button type="submit" class="btn-outline py-2 px-4 duration-500">
          搜尋
        </button>
      </div>
    </form>
    <ul class="flex flex-col gap-5 min-h-[5rem]">
      <template v-if="isUserSearch">
        <li
          class="text-2xl text-gray-01 md:tracking-widest text-center"
          v-if="!finalSearch.length"
        >
          查無此課程
        </li>
        <template
          v-else-if="
            finalSearch.filter((item) => item.courseDates.length).length
          "
        >
          <template
            v-for="course in finalSearch.filter(
              (item) => item.courseDates.length
            )"
            :key="course.id"
          >
            <template
              v-for="(date, index) in course.courseDates"
              :key="`第${index + 1}堂-${date}`"
            >
              <li is="vue:CoursesCard" v-if="date.end > new Date()">
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
                    $date(new Date(date.start).toLocaleDateString()).format(
                      'YYYY-MM-DD'
                    )
                  }}</span>
                </template>
                <template #card-body>
                  <p>
                    時間：<span
                      >星期{{ weekText(date.start) }} /
                      {{ $dayjs(new Date(date.start)).format('HH:mm') }}~{{
                        $dayjs(new Date(date.end)).format('HH:mm')
                      }}</span
                    >
                  </p>
                  <h2>講師：{{ course.user.name }} 講師</h2>
                  <p>
                    評分：{{
                      conversionScore(
                        course.scores.reduce(
                          (score, item) => score + item.score,
                          0
                        ) / course.scores.length
                      )
                    }}
                  </p>
                  <p class="text-end text-lg">
                    $ {{ toThousand(course.price) }}
                  </p>
                </template>
                <template #card-footer>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-label="課程收藏"
                    class="w-6 h-6 cursor-pointer stroke-brand-02 hover:fill-brand-02"
                    v-if="isLogin"
                    @click="() => patchSaved(date)"
                    :class="{ 'fill-brand-02': isUserSaved(date) }"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>
                  <router-link
                    :to="`/course/${date.id}`"
                    class="btn-primary py-2 px-4"
                    >課程詳情</router-link
                  >
                </template>
              </li>
            </template>
          </template>
        </template>
        <li class="text-2xl text-gray-01 md:tracking-widest text-center" v-else>
          該時段暫無課程
        </li>
      </template>
      <template v-else>
        <template v-for="course in courses" :key="course.id">
          <template
            v-for="(date, index) in course.courseDates"
            :key="`第${index + 1}堂-${date}`"
          >
            <li is="vue:CoursesCard" v-if="date.end > new Date()">
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
                  $date(new Date(date.start).toLocaleDateString()).format(
                    'YYYY-MM-DD'
                  )
                }}</span>
              </template>
              <template #card-body>
                <p>
                  時間：<span
                    >星期{{ weekText(date.start) }} /
                    {{ $dayjs(new Date(date.start)).format('HH:mm') }}~{{
                      $dayjs(new Date(date.end)).format('HH:mm')
                    }}</span
                  >
                </p>
                <h2>講師：{{ course.user.name }} 講師</h2>
                <p>
                  評分：{{
                    conversionScore(
                      course.scores.reduce(
                        (score, item) => score + item.score,
                        0
                      ) / course.scores.length
                    )
                  }}
                </p>
                <p class="text-end text-lg">$ {{ toThousand(course.price) }}</p>
              </template>
              <template #card-footer>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-label="課程收藏"
                  class="w-6 h-6 cursor-pointer stroke-brand-02 hover:fill-brand-02"
                  v-if="isLogin"
                  @click="($event) => patchSaved(date)"
                  :class="{ 'fill-brand-02': isUserSaved(date) }"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
                <router-link
                  :to="`/course/${date.id}`"
                  class="btn-primary py-2 px-4"
                  >課程詳情</router-link
                >
              </template>
            </li>
          </template>
        </template>
      </template>
    </ul>
  </main>
</template>
<script>
import CoursesCard from '../components/CoursesCard.vue'
import { coursesStore, userStore, toThousand } from '../stores/index.js'
import { mapState, mapActions } from 'pinia'
export default {
  data() {
    return {
      search: {
        weeks: [],
        input: ''
      },
      isUserSearch: false,
      finalSearch: []
    }
  },
  computed: {
    ...mapState(coursesStore, ['courses']),
    ...mapState(userStore, ['isLogin'])
  },
  methods: {
    ...mapActions(coursesStore, ['getCoursesData', 'patchSaved']),
    toThousand,
    weekText(timer) {
      const text = ['日', '一', '二', '三', '四', '五', '六']
      return text[this.$date(timer).day()]
    },
    conversionScore(score) {
      return score
        ? `${(Math.round(score * 10) / 10).toFixed(1)} / 5.0`
        : '尚未評分'
    },
    clearSearch() {
      this.search = this.$options.data().search
      this.isUserSearch = false
    },
    isUserSaved(courseDate) {
      return courseDate.savedUsersId.includes(+sessionStorage.getItem('userId'))
    },
    userSearch() {
      this.isUserSearch = true
      const courses = JSON.parse(JSON.stringify(this.courses))
      const keyWordSearch = courses.filter((course) =>
        course.title.match(this.search.input)
      )
      this.finalSearch = keyWordSearch.filter((item) => item.length !== 0)
      if (this.search.weeks.length) {
        const finalSearch = keyWordSearch.map((item) => {
          const weekFilter = item.courseDates.filter((date) =>
            this.search.weeks.includes(this.weekText(date.start)) ? date : ''
          )
          item.courseDates = weekFilter
          return item
        })
        this.finalSearch = finalSearch.filter((item) => item.length !== 0)
      }
    }
  },
  mounted() {
    this.getCoursesData()
  },
  components: {
    CoursesCard
  }
}
</script>
