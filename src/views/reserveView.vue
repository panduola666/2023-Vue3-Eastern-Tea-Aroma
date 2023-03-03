<template>
  <main class="wrap">
    <h1 class="text-3xl font-black font-self text-brand-02">課程預約</h1>
    <ol class="grid gap-3 my-5">
      <li is="vue:CoursesCard">
        <template #image>
          <img
            src="../assets/課堂04.png"
            alt=""
            class="h-full w-full object-cover"
          />
        </template>
        <template #card-header>
          茶葉的風味鑑賞學
          <span class="text-brand-04 text-base self-center font-sans"
            >2022-03-10</span
          >
        </template>
        <template #card-body>
          <p>時間：<span>星期三 / 15:00~16:30</span></p>
          <h2>講師：李小花 講師</h2>
          <div class="grid lg:grid-cols-2">
            <p>評分：4.2 / 5.0</p>
            <p class="text-brand-01">
              給老師打分: {{ score ? score : hoverScore }}
              <span class="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5 stroke-brand-02 fill-transparent cursor-pointer"
                  :class="{
                    'fill-brand-02': i <= hoverScore || i <= score
                  }"
                  v-for="i in 5"
                  :key="i"
                  @mouseover="hoverScore = i"
                  @mouseleave="score ? score : (hoverScore = '尚未評分')"
                  @click="score = hoverScore"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </p>
          </div>
          <p class="text-end text-lg">$ 3500</p>
        </template>
        <template #card-footer>
          <p class="text-gray-03">課程前三天內取消需電話告知</p>
          <button
            type="button"
            class="btn-outline py-2 px-3 disabled:bg-gray-03 disabled:border-gray-03 disabled:text-white"
          >
            取消預約
          </button>
          <router-link to="" class="btn-primary py-2 px-3"
            >課程詳情</router-link
          >
        </template>
      </li>
    </ol>
    <user-calendar :todos="userReserve"></user-calendar>
  </main>
</template>
<script>
import CoursesCard from '../components/CoursesCard.vue'
import UserCalendar from '../components/UserCalendar.vue'
export default {
  data() {
    return {
      score: 0,
      hoverScore: '尚未評分',
      userReserve: [
        {
          dates: 1674692023970, // 每周五
          description: '外部傳入的彈跳視窗說明文字'
        },
        {
          dates: 1675002323970, // 每周五
          description: '茶葉的風味鑑賞學 15:00~16:30'
        },
        {
          dates: 1675002322170, // 每周五
          description: '茶葉的風味 13:00~15:30'
        }
      ]
    }
  },
  components: {
    CoursesCard,
    UserCalendar
  }
}
</script>
<style>
.vc-weekday {
  color: #727272;
}
</style>
