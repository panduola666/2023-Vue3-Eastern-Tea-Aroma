<template>
  <main class="wrap">
    <h2 class="text-3xl font-black font-self text-brand-02">茶藝課堂</h2>
    <form
      class="shadow bg-white bg-opacity-20 border-2 border-brand-01 border-opacity-50 mt-2 mb-6 text-xl p-3 grid gap-3"
    >
      <p>
        <label for="keyWord" class="mr-3">課程關鍵字 /</label>
        <input
          type="text"
          name="keyWord"
          id="keyWord"
          placeholder="請輸入關鍵字..."
          class="border border-brand-01 px-3 py-1 md:w-2/3 w-full"
          v-model="search.input"
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
              v-model="search.weeks"
            />星期{{ item }}</label
          >
        </div>
      </div>
      <div>
        <p>上課時段 /</p>
        <div class="flex flex-wrap gap-3">
          <label for="afternoon" class="cursor-pointer"
            ><input
              type="radio"
              name="time"
              id="afternoon"
              class="scale-125 mr-2"
              v-model="search.moment"
              value="AM"
            />下午</label
          >
          <label for="evening" class="cursor-pointer"
            ><input
              type="radio"
              name="time"
              id="evening"
              class="scale-125 mr-2"
              value="PM"
              v-model="search.moment"
            />晚上</label
          >
        </div>
      </div>
      {{ search }}
      <div class="flex justify-end gap-5 md:flex-row flex-col md:mt-0 mt-5">
        <button
          type="button"
          class="text-gray-02 py-2 px-4 hover:text-gray-01 duration-500"
          @click="searchReset()"
        >
          清空列表
        </button>
        <button type="submit" class="btn-outline py-2 px-4 duration-500">
          搜尋
        </button>
      </div>
    </form>
    <!-- {{ courses }} -->
    <ul class="flex flex-col gap-5 min-h-[5rem]">
      <li
        class="text-2xl text-gray-01 md:tracking-widest text-center"
        v-if="!courses.length"
      >
        該時段暫無課程
      </li>
      <template v-else>
        <template v-for="course in courses" :key="course.id">
          <template
            v-for="(date, index) in course.dates"
            :key="`第${index + 1}堂-${date}`"
          >
            <li is="vue:CoursesCard">
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
                    "YYYY-MM-DD"
                  )
                }}</span>
              </template>
              <template #card-body>
                <p>
                  時間：<span
                    >星期{{ weekText(date.start) }} /
                    {{ $dayjs(new Date(date.start)).hour() }}:{{
                      $dayjs(new Date(date.start)).minute()
                    }}~{{ $dayjs(new Date(date.end)).hour() }}:{{
                      $dayjs(new Date(date.end)).minute()
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
                <p class="text-end text-lg">$ {{ course.price }}</p>
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
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
                <router-link
                  :to="`/course/${course.id}`"
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
import CoursesCard from "../components/CoursesCard.vue";
import { coursesStore } from "../stores/index.js";
import { mapState, mapActions } from "pinia";
import { useDate } from "vue3-dayjs-plugin/useDate";
export default {
  data() {
    return {
      date: useDate(),
      search: {
        weeks: [],
        moment: "",
        input: "",
      },
    };
  },
  computed: {
    ...mapState(coursesStore, ["courses"]),
  },
  methods: {
    ...mapActions(coursesStore, ["getCoursesData"]),
    weekText(timer) {
      const text = ["日", "一", "二", "三", "四", "五", "六"];
      return text[new Date(timer).getDay()];
    },
    conversionScore(score) {
      return score ? `${Math.round(score * 10) / 10} / 5.0` : "尚未評分";
    },
    searchReset() {
      console.log(this.$options.data().search);
      this.search = {
        weeks: [],
        moment: "",
        input: "",
      };
    },
  },
  mounted() {
    this.getCoursesData();
  },
  components: {
    CoursesCard,
  },
};
</script>
