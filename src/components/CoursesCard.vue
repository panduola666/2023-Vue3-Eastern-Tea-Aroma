<template>
  <div
    class="bg-white bg-opacity-100 text-brand-05 font-semibold lg:flex gap-3 hover:shadow-xl group min-h-max"
  >
    <div class="lg:w-1/3 h-64 overflow-hidden">
      <slot name="image">圖片</slot>
    </div>
    <article class="flex flex-col justify-between flex-grow p-3">
      <section class="flex-grow mb-3 flex flex-col justify-around">
        <h1
          class="md:text-2xl text-xl font-GenRyuMin border-b-2 border-line flex flex-wrap justify-between items-center gap-1"
        >
          <slot name="card-header">
            標題
            <span class="text-brand-04 text-base self-center font-sans"
              >日期</span
            >
          </slot>
        </h1>
        <slot name="card-body">詳細資訊</slot>
      </section>
      <div
        class="font-normal font-sans flex gap-3 justify-end items-center text-sm relative"
      >
        <slot name="card-footer">尾端選項</slot>
      </div>
    </article>
  </div>
</template>
