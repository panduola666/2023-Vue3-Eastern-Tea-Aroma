<template>
  <div>
    <section class="flex justify-between mb-2">
      <h2
        class="text-brand-02 text-[32px] leading-[38px] font-black font-self self-center"
      >
        茶藝課堂
      </h2>
      <div class="flex">
        <div class="relative group cursor-pointer">
          <img src="../assets/type=L, status=Default.png" alt="上一頁" />
          <img
            src="../assets/type=L, status=Hover.png"
            alt="上一頁"
            class="absolute top-0 group-hover:opacity-100 opacity-0 px-3 py-2 transition-all duration-500"
          />
        </div>
        <div class="relative group cursor-pointer">
          <img src="../assets/type=R, status=Default.png" alt="下一頁" />
          <img
            src="../assets/type=R, status=Hover.png"
            alt="下一頁"
            class="absolute top-0 group-hover:opacity-100 opacity-0 px-3 py-2 transition-all duration-500"
          />
        </div>
      </div>
    </section>
    <ul class="flex lg:flex-row flex-col gap-6 justify-between">
      <li class="group overflow-hidden lg:w-[25%] lg:h-[230px] h-64">
        <router-link to="" class="relative">
          <span
            class="absolute bg-white bg-opacity-60 text-brand-02 py-2 px-3 top-3 left-3 z-10"
            >NEW</span
          >
          <img
            src="../assets/課堂01.png"
            alt="茶的風味鑑賞學"
            class="h-full w-full object-cover group-hover:scale-125 transition-all duration-[1.5s]"
          />
          <h1
            class="absolute bg-[#003416] bg-opacity-60 text-white text-2xl leading-7 font-self py-4 px-2 truncate bottom-0 left-0 right-0 z-10"
          >
            茶的風味鑑賞學
          </h1>
        </router-link>
      </li>
      <li class="group overflow-hidden lg:w-[25%] lg:h-[230px] h-64">
        <a href="" class="relative">
          <span
            class="absolute bg-white bg-opacity-60 text-brand-02 py-2 px-3 top-3 left-3 z-10"
            >NEW</span
          >
          <img
            src="../assets/課堂02.png"
            alt="茶席基礎入門"
            class="h-full w-full object-cover group-hover:scale-125 transition-all duration-[1.5s]"
          />
          <h1
            class="absolute bg-[#003416] bg-opacity-60 text-white text-2xl leading-7 font-self py-4 px-2 truncate bottom-0 left-0 right-0 z-10"
          >
            茶席基礎入門
          </h1>
        </a>
      </li>
      <li class="group overflow-hidden lg:w-[25%] lg:h-[230px] h-64">
        <a href="" class="relative">
          <span
            class="absolute bg-white bg-opacity-60 text-brand-02 py-2 px-3 top-3 left-3 z-10"
            >NEW</span
          >
          <img
            src="../assets/課堂03.png"
            alt="不一樣的台灣茶"
            class="h-full w-full object-cover group-hover:scale-125 transition-all duration-[1.5s]"
          />
          <h1
            class="absolute bg-[#003416] bg-opacity-60 text-white text-2xl leading-7 font-self py-4 px-2 truncate bottom-0 left-0 right-0 z-10"
          >
            不一樣的台灣茶
          </h1>
        </a>
      </li>
      <li class="group overflow-hidden lg:w-[25%] lg:h-[230px] h-64">
        <a href="" class="relative">
          <span
            class="absolute bg-white bg-opacity-60 text-brand-02 py-2 px-3 top-3 left-3 z-10"
            >NEW</span
          >
          <img
            src="../assets/課堂04.png"
            alt="鍋煮香料奶茶學"
            class="h-full w-full object-cover group-hover:scale-125 transition-all duration-[1.5s]"
          />
          <h1
            class="absolute bg-[#003416] bg-opacity-60 text-white text-2xl leading-7 font-self py-4 px-2 truncate bottom-0 left-0 right-0 z-10"
          >
            鍋煮香料奶茶學
          </h1>
        </a>
      </li>
    </ul>
  </div>
</template>
