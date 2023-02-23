<template>
  <section>
    <h1></h1>
    <label for="" class="mt-3">訂單查詢</label>
    <div class="relative">
      <input
        type="text"
        name=""
        id=""
        placeholder="請輸入訂單編號..."
        aria-label="訂單編號搜尋"
        class="w-full p-2 pr-10 shadow-md"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 absolute right-3 top-2 cursor-pointer hover:top-1"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </div>

    <ul class="grid md:grid-cols-3 gap-3 mt-5">
      <li class="bg-white text-xl text-brand-05 font-self p-3">
        <h2 class="flex justify-between items-end">
          訂單編號: 2
          <PostOrdersModal>
            <template #btn-content>
              <button type="button" class="btn-primary py-2 px-3 text-base">
                訂單詳情
              </button>
            </template>
          </PostOrdersModal>
        </h2>
        <section class="border-t-2 border-line pt-3 mt-1">
          <p>購買人：王小明</p>
          <p>手機：0912345678</p>
          <p>取貨方式：店家寄件</p>
          <p>付款方式：貨到付款</p>
          <p>金額：$ 999</p>
          <p class="mt-5 text-base font-sans flex justify-between items-center">
            物流編號：qw12312eqw
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5 flex-shrink-0 cursor-pointer hover:-translate-y-1"
              @click="postTrackingNum"
            >
              <path
                d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z"
              />
              <path
                d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z"
              />
            </svg>
          </p>
        </section>
        <button
          type="button"
          class="btn-outline w-full mt-3 disabled:bg-gray-03 disabled:text-white disabled:border-gray-03"
          @click="orderCheck"
        >
          結單
        </button>
      </li>
    </ul>
  </section>
</template>
<script>
import PostOrdersModal from "../components/PostOrdersModal.vue";

export default {
  methods: {
    async postTrackingNum() {
      const { value: trackingNumber } = await this.$swal.fire({
        title: "物流查詢編號",
        input: "text",
        inputValue: "",
        inputPlaceholder: "請輸入物流查詢編號",
        showCancelButton: true,
        cancelButtonText: "取消",
        confirmButtonText: "確認",
        reverseButtons: true,
        inputValidator: (value) => {
          if (!value) {
            return "物流編號 必填";
          }
        },
      });
      console.log(trackingNumber);
      if (trackingNumber) {
        this.$swal.fire(`物流查詢編號為: ${trackingNumber}`);
      }
    },
    async orderCheck() {
      const { value: choose } = await this.$swal.fire({
        title: "請選擇訂單狀態",
        input: "select",
        customClass: {
          input: "border-2 border-black",
        },
        inputOptions: {
          cancel: "取消訂單",
          finish: "完成訂單",
        },
        inputPlaceholder: "訂單狀態",
        showCancelButton: true,
        cancelButtonText: "取消",
        confirmButtonText: "確認",
        reverseButtons: true,
        inputValidator: (value) => {
          if (!value) {
            return new Promise((resolve) => {
              resolve("請選擇訂單狀態");
            });
          }
        },
      });

      if (choose === "cancel") {
        this.$swal.fire("已取消該筆訂單");
      } else if (choose === "finish") {
        this.postTrackingNum();
      }
    },
  },
  components: {
    PostOrdersModal,
  },
};
</script>
