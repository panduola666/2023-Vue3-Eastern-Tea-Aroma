<template>
  <div
    class="bg-brand-06 flex flex-col lg:flex-row lg:items-center justify-between px-4 py-10 gap-3"
  >
    <div>
      <p>共 2 件商品</p>
      <div class="flex flex-wrap gap-x-2">
        <p class="text-gray-01 flex flex-wrap gap-x-2">
          折扣碼
          <span
            class="underline underline-offset-2 cursor-pointer hover:text-brand-02 hover:font-bold"
            @click="inputPrompt"
            >{{ !discount ? "輸入折扣碼" : discount }}</span
          >
        </p>
        <p
          class="text-red-500 font-bold flex items-center left-0 top-full whitespace-nowrap"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          折扣碼不存在
        </p>
      </div>
    </div>
    <div class="">
      <p class="flex flex-wrap gap-x-2 items-center">
        總計<del class="text-base text-gray-01">$ 3,000</del
        ><span class="text-xl">$ 1,999</span>
      </p>
      <p class="text-gray-01">已節省 1,001 元</p>
    </div>
    <div>
      <button
        type="submit"
        class="btn-primary w-full"
        v-if="this.$route.name === 'buyerInfo'"
      >
        結帳
      </button>
      <router-link :to="{ name: 'buyerInfo' }" class="btn-primary block" v-else
        >確認購買</router-link
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      discount: "",
    };
  },
  methods: {
    inputPrompt() {
      this.$swal({
        titleText: "請輸入折扣碼代號",
        input: "text",
        inputValue: "",
        showCancelButton: true,
        inputValidator: (value) => {
          this.discount = value;
        },
      });
    },
    // 點擊按鈕後把 discount 值傳到 pinia
  },
  mounted() {
    // 從 pinia 獲取資料
  },
};
</script>
