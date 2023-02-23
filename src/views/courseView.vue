<template>
  <main class="wrap">
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
      茶葉的風味鑑賞學
    </h1>
    <div class="grid lg:grid-cols-3 gap-3 mt-5">
      <img src="../assets/課堂01.png" alt="" class="w-full h-56 object-cover" />
      <section
        class="lg:col-span-2 flex flex-col justify-between gap-3 lg:text-xl"
      >
        <h3 class="flex justify-between items-center">
          時間：2022-03-10 15:00~16:30
          <button
            type="button"
            class="btn-outline flex-shrink-0 md:text-base py-2 px-2 sm:px-5 text-sm"
          >
            收藏課程
          </button>
        </h3>
        <h2>講師：李小花 講師</h2>
        <p class="flex justify-between">
          價格：3500 元<span class="text-gray-02 text-base">剩餘: 51</span>
        </p>
        <button type="button" class="btn-primary">加入購物車</button>
        <button type="button" class="btn-primary" disabled>
          預約已滿 / 已結束
        </button>
      </section>
    </div>
    <p
      class="bg-brand-03 bg-opacity-20 px-5 py-8 text-xl text-gray-01 mt-5 font-self"
    >
      當前商品享活動優惠：全面
      <span class="text-2xl font-black">95 折</span>，優惠碼：<span
        >Tea231</span
      >
    </p>
    <article
      class="text-brand-05 lg:text-lg font-medium leading-8 tracking-wider mt-10"
    >
      <p class="font-self text-2xl font-black">課程簡介</p>
      <ul class="grid gap-4 my-4">
        <li>認識主流茶葉的特性與風味</li>
        <li>
          學習5種泡茶法，並實作其中2種，體驗茶葉在不同溫度、沖泡時間以及技巧下的變化
        </li>
        <li>學習基本茶桌禮儀，讓你可以在生活中展現儀態加分</li>
        <li>建立自己的品位，足夠的知識亦可在人際交流上擁有更多話題</li>
      </ul>
      <div class="grid sm:grid-cols-3 gap-3 my-4">
        <img
          src="../assets/BANNER@3x-1.png"
          alt=""
          class="w-full h-48 object-cover"
        />
        <img
          src="../assets/課堂01.png"
          alt=""
          class="w-full h-48 object-cover"
        />
        <img
          src="../assets/課堂04.png"
          alt=""
          class="w-full h-48 object-cover"
        />
      </div>
    </article>
    <p class="font-self text-gray-01 mt-16">其他時段</p>
    <ol class="list-disc list-inside">
      <li class="text-gray-02 py-2 px-1">
        <router-link
          to=""
          class="hover:text-gray-01 underline underline-offset-2 hover:bg-brand-03 hover:bg-opacity-20"
        >
          2022-03-10 /星期四 - 13:00~15:30 ／ 價格: 3500 元 ／ 剩餘: 13
        </router-link>
      </li>
      <li class="text-gray-02 py-2 px-1">
        <router-link
          to=""
          class="hover:text-gray-01 underline underline-offset-2 hover:bg-brand-03 hover:bg-opacity-20"
        >
          2022-03-10 /星期四 - 13:00~15:30 ／ 價格: 3500 元 ／ 剩餘: 13
        </router-link>
      </li>
      <li class="text-gray-02 py-2 px-1">
        <router-link
          to=""
          class="hover:text-gray-01 underline underline-offset-2 hover:bg-brand-03 hover:bg-opacity-20"
        >
          2022-03-10 /星期四 - 13:00~15:30 ／ 價格: 3500 元 ／ 剩餘: 13
        </router-link>
      </li>
    </ol>
    <CourseList class="border-t-2 border-line mt-10 pt-5"></CourseList>
  </main>
</template>
<script>
import CourseList from "../components/CourseList.vue";
export default {
  components: {
    CourseList,
  },
};
</script>
