<template>
  <main class="wrap">
    <h2 class="text-3xl font-black font-GenRyuMin text-brand-02">茶藝課堂</h2>
    <form
      class="border-2 border-brand-01 border-opacity-50 shadow bg-gray-03 bg-opacity-20 mt-2 mb-6 text-xl p-3 grid gap-3"
    >
      <p>
        <label for="keyWord" class="mr-3">課程關鍵字 /</label>
        <input
          type="text"
          name="keyWord"
          id="keyWord"
          placeholder="請輸入關鍵字..."
          class="border border-brand-01 px-3 py-1 md:w-2/3 w-full"
        />
      </p>
      <div>
        <p>上課時間 /</p>
        <div class="flex flex-wrap gap-3">
          <label for="MON" class="cursor-pointer"
            ><input
              type="checkbox"
              name="day"
              id="MON"
              class="scale-125 mr-2"
            />星期一</label
          >
          <label for="TUE" class="cursor-pointer"
            ><input
              type="checkbox"
              name="day"
              id="TUE"
              class="scale-125 mr-2"
            />星期二</label
          >
          <label for="WED" class="cursor-pointer"
            ><input
              type="checkbox"
              name="day"
              id="WED"
              class="scale-125 mr-2"
            />星期三</label
          >
          <label for="THU" class="cursor-pointer"
            ><input
              type="checkbox"
              name="day"
              id="THU"
              class="scale-125 mr-2"
            />星期四</label
          >
          <label for="FRI" class="cursor-pointer"
            ><input
              type="checkbox"
              name="day"
              id="FRI"
              class="scale-125 mr-2"
            />星期五</label
          >
          <label for="SAT" class="cursor-pointer"
            ><input
              type="checkbox"
              name="day"
              id="SAT"
              class="scale-125 mr-2"
            />星期六</label
          >
          <label for="SUN" class="cursor-pointer"
            ><input
              type="checkbox"
              name="day"
              id="SUN"
              class="scale-125 mr-2"
            />星期日</label
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
            />下午</label
          >
          <label for="evening" class="cursor-pointer"
            ><input
              type="radio"
              name="time"
              id="evening"
              class="scale-125 mr-2"
            />晚上</label
          >
        </div>
      </div>
      <div class="flex justify-end gap-5 md:flex-row flex-col md:mt-0 mt-5">
        <button
          type="button"
          class="text-gray-02 py-2 px-4 hover:text-gray-01 duration-500"
        >
          清空列表
        </button>
        <button type="submit" class="btn-outline py-2 px-4 duration-500">
          搜尋
        </button>
      </div>
    </form>
    <ul class="flex flex-col gap-5 min-h-[5rem]">
      <li class="text-2xl text-gray-01 md:tracking-widest text-center">
        該時段暫無課程
      </li>
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
          <p class=" ">時間：<span>星期三 / 15:00~16:30</span></p>
          <h2 class="">講師：李小花 講師</h2>
          <p class="">評分：4.2 / 5.0</p>
          <p class="text-end text-lg">$ 3500</p>
        </template>
        <template #card-footer>
          <button type="button" class="btn-outline py-2 px-3">收藏課程</button>
          <router-link to="" class="btn-primary py-2 px-3"
            >課程詳情</router-link
          >
        </template>
      </li>
    </ul>
  </main>
</template>
<script>
import CoursesCard from "../components/CoursesCard.vue";
export default {
  components: {
    CoursesCard,
  },
};
</script>
