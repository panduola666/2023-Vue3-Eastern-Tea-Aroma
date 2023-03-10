<template>
  <main class="wrap">
    <teleport to="title">收藏項目</teleport>
    <h2 class="text-3xl font-black font-self text-brand-02">收藏項目</h2>
    <div class="flex justify-between gap-3 flex-col md:flex-row my-3">
      <div class="flex gap-3">
        <button
          type="button"
          :class="{
            'btn-primary': sort.title === item,
            'btn-outline': sort.title !== item
          }"
          @click="() => (sort.title = item)"
          v-for="(item, index) in ['講師', '評分', '價格']"
          :key="item + index"
        >
          {{ item }}
        </button>
      </div>
      <div class="flex gap-3 justify-end">
        <button
          type="button"
          :class="{
            'btn-primary': sort.order === item,
            'btn-outline': sort.order !== item
          }"
          @click="() => (sort.order = item)"
          v-for="(item, index) in ['升序', '降序']"
          :key="item + index"
        >
          {{ item }}
        </button>
      </div>
    </div>
    <p v-if="!hasSaved" class="text-center text-3xl py-28">當前沒有收藏項目</p>
    <ol class="grid lg:grid-cols-2 gap-3" v-else>
      <template v-for="course in sortData" :key="course.id">
        <template
          v-for="date in course.courseDates"
          :key="'第' + date.id + '課'"
        >
          <li
            class="bg-white text-brand-05 font-self font-semibold grid lg:grid-cols-2 gap-3 shadow-md min-h-max"
            v-if="date.savedUsersId.includes(user.id)"
          >
            <div class="h-64 overflow-hidden">
              <img
                :src="course.coverUrl"
                :alt="course.title"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="flex flex-col justify-between flex-grow p-3">
              <section class="flex-grow mb-3 flex flex-col justify-around">
                <h1 class="text-xl flex flex-wrap items-center justify-between">
                  {{ course.title }}
                  <span class="text-base text-gray-02">
                    {{ $date(date.start).format('YYYY-MM-DD HH:mm') }} ~
                    {{ $date(date.end).format('HH:mm') }}
                  </span>
                </h1>
                <h2>講師：{{ course.user.name }}</h2>
                <p>
                  評分：
                  <span v-if="!score(course.scores)">尚未評分</span>
                  <span v-else>{{ score(course.scores) }} / 5.0</span>
                </p>
                <p class="text-end font-sans">
                  $ {{ toThousand(course.price) }}
                </p>
              </section>
              <div class="font-normal font-sans flex gap-3 justify-end text-sm">
                <button
                  type="button"
                  class="btn-outline py-2 px-3"
                  @click="() => patchSaved(date)"
                >
                  取消收藏
                </button>
                <router-link
                  :to="`/course/${date.id}`"
                  class="btn-primary py-2 px-3"
                  >課程詳情</router-link
                >
              </div>
            </div>
          </li>
        </template>
      </template>
    </ol>
  </main>
</template>
<script>
import { mapState, mapActions } from 'pinia'
import { coursesStore, userStore, toThousand } from '../stores/index.js'
export default {
  data() {
    return {
      sort: {
        title: '講師',
        order: '升序'
      },
      sortData: []
    }
  },
  watch: {
    sort: {
      handler({ title, order }) {
        if (title === '評分') {
          if (order === '升序') {
            this.sortData.sort(
              (a, b) => this.score(a.scores) - this.score(b.scores)
            )
          } else {
            this.sortData.sort(
              (a, b) => this.score(b.scores) - this.score(a.scores)
            )
          }
        }
        const config = {
          價格: 'price',
          講師: 'userId'
        }
        if (order === '升序') {
          this.sortData = this.sortData.sort(
            (a, b) => a[config[title]] - b[config[title]]
          )
        } else {
          this.sortData = this.sortData.sort(
            (a, b) => b[config[title]] - a[config[title]]
          )
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapState(userStore, ['user']),
    ...mapState(coursesStore, ['courses']),
    hasSaved() {
      let hasSaved = false
      this.sortData.forEach((course) => {
        course.courseDates.forEach((date) => {
          if (date.savedUsersId.includes(this.user.id)) hasSaved = true
        })
      })
      return hasSaved
    }
  },
  methods: {
    ...mapActions(coursesStore, ['getCoursesData', 'patchSaved']),
    toThousand,
    score(data) {
      const score = data.reduce((num, item) => (num += item.score), 0)
      const avg = score / data.length
      if (isNaN(avg)) {
        return 0
      } else {
        return (Math.round(avg * 10) / 10).toFixed(1)
      }
    }
  },
  async mounted() {
    await this.getCoursesData()
    this.sortData = [...this.courses]
  }
}
</script>
