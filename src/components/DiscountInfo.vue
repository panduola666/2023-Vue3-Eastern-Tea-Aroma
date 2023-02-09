<template>
  <div
    class="bg-brand-03 bg-opacity-20 px-5 py-8 text-xl text-gray-01 mt-5 font-GenRyuMin mb-5"
  >
    <p class="mb-2">
      當前商品已有生效中的折扣，折扣額度為：
      <span class="text-2xl font-black">
        <slot name="scale">折扣額度</slot>
      </span>，優惠碼：<span
        >
        <slot name="code">優惠碼</slot></span
      >
    </p>
    <p class="text-base text-gray-02">截止日期： <slot name="endDate">截止日期</slot></p>
  </div>
</template>
