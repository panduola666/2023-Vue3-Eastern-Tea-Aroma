<template>
  <div>
    <section class="flex justify-between mb-2">
      <h2
        class="text-brand-02 text-[32px] leading-[38px] font-black font-self self-center"
      >
        茶藝課堂
      </h2>
      <div class="flex">
        <div
          class="relative group cursor-pointer"
          @click="() => finalCourses.unshift(...finalCourses.splice(-4, 4))"
        >
          <img
            src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/type=L,%20status=Default.png?raw=true"
            alt="上一頁"
          />
          <img
            src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/type=L,%20status=Hover.png?raw=true"
            alt="上一頁"
            class="absolute top-0 group-hover:opacity-100 opacity-0 px-3 py-2 transition-all duration-500"
          />
        </div>
        <div
          class="relative group cursor-pointer"
          @click="() => finalCourses.push(...finalCourses.splice(0, 4))"
        >
          <img
            src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/type=R,%20status=Default.png?raw=true"
            alt="下一頁"
          />
          <img
            src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/type=R,%20status=Hover.png?raw=true"
            alt="下一頁"
            class="absolute top-0 group-hover:opacity-100 opacity-0 px-3 py-2 transition-all duration-500"
          />
        </div>
      </div>
    </section>
    <ul class="grid lg:grid-cols-4 lg:gap-6 gap-4">
      <template v-for="(course, index) in finalCourses" :key="course.id">
        <li
          class="group overflow-hidden lg:h-[230px] h-64 flex-shrink-0"
          v-if="index < 4"
        >
          <router-link :to="`/course/${course.id}`" class="relative">
            <span
              class="absolute bg-white bg-opacity-60 text-brand-02 py-2 px-3 top-3 left-3 z-10"
              v-if="course.created + 7 * 24 * 60 * 60 * 1000 > new Date()"
              >NEW</span
            >
            <img
              :src="course.coverUrl"
              :alt="course.title"
              class="h-full w-full object-cover group-hover:scale-125 transition-all duration-[1.5s]"
            />
            <h1
              class="absolute bg-[#003416] bg-opacity-60 text-white text-2xl leading-7 font-self py-4 px-2 truncate bottom-0 left-0 right-0 z-10"
            >
              {{ course.title }}
            </h1>
          </router-link>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia'
import { coursesStore } from '../stores/index'
export default {
  data() {
    return {
      finalCourses: []
    }
  },
  computed: {
    ...mapState(coursesStore, ['courses'])
  },
  methods: {
    ...mapActions(coursesStore, ['getCoursesData']),
    init() {
      this.courses.forEach((course) => {
        course.courseDates.forEach((date) => {
          const data = {
            id: date.id,
            created: date.created,
            coverUrl: course.coverUrl,
            title: course.title
          }
          const index = this.finalCourses.findIndex(
            (item) => item.title === data.title
          )
          if (index !== -1) {
            this.finalCourses.splice(index, 1)
          }
          this.finalCourses.push(data)
          this.finalCourses.sort((a, b) => b.created - a.created)
        })
      })
    }
  },
  async mounted() {
    await this.getCoursesData()
    await this.init()
  }
}
</script>
