<template>
  <div class="xl:w-[70%] lg:w-[80%] w-[90%] mx-auto">
    <section class="flex justify-between mt-14 mb-2">
      <h2
        class="text-brand-02 text-[32px] leading-[38px] font-black font-self self-center"
      >
        活動資訊
      </h2>
      <div class="flex">
        <div class="relative group cursor-pointer">
          <img src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/src/assets/type=L,%20status=Default.png?raw=true" alt="上一頁" />
          <img
            src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/src/assets/type=L,%20status=Hover.png?raw=true"
            alt="上一頁"
            class="absolute top-0 group-hover:opacity-100 opacity-0 px-3 py-2 transition-all duration-500"
          />
        </div>
        <div class="relative group cursor-pointer">
          <img src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/src/assets/type=R,%20status=Default.png?raw=true" alt="下一頁" />
          <img
            src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/src/assets/type=R,%20status=Hover.png?raw=true"
            alt="下一頁"
            class="absolute top-0 group-hover:opacity-100 opacity-0 px-3 py-2 transition-all duration-500"
          />
        </div>
      </div>
    </section>
    <ul class="grid lg:grid-cols-3 lg:gap-6 gap-4 justify-between">
      <li
        class="bg-white hover:shadow-[4px_16px_30px_rgba(0,0,0,.1)] cursor-pointer"
      >
        <router-link to="">
          <img
            src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/src/assets/%E6%9C%80%E6%96%B0%E6%B4%BB%E5%8B%9501.png?raw=true"
            alt="521國際茶日"
            class="w-full h-[312px] object-cover"
          />
          <article class="relative lg:px-8 px-4 lg:py-10 py-6">
            <span
              class="absolute text-white lg:py-2 py-1 lg:px-3 px-2 lg:text-xl text-base lg:leading-6 leading-5 font-medium bg-brand-01 top-0 lg:left-[8%] md:left-[2%] left-[3%] -translate-y-1/2"
              >優惠</span
            >
            <section
              class="flex items-center justify-between lg:pb-4 pb-3 border-b-2 border-line"
            >
              <h1
                class="lg:text-[28px] text-2xl lg:leading-8 leading-7 font-black font-self text-brand-05 truncate"
              >
                521國際茶日
              </h1>
              <span
                class="lg:text-xl text-base lg:leading-[30px] text-brand-04 whitespace-nowrap"
                >2022-05-21</span
              >
            </section>
            <div
              class="lg:h-[120px] h-[72px] overflow-hidden lg:text-xl text-base lg:leading-[30px] text-gray-02 lg:mt-4 mt-3 lg:mb-6 mb-4"
            >
              在2020年5月21日，聯合國首次確定＂國際茶日＂。
              為表紀念每年521將推出全場商品 9 折活動為期 3 日，折扣碼：Tea521。
            </div>
            <p
              class="text-brand-02 lg:text-xl text-base lg:leading-6 leading-5 font-medium"
            >
              活動詳情 >
            </p>
          </article>
        </router-link>
      </li>
    </ul>
  </div>
</template>
