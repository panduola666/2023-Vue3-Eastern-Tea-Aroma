<template>
  <div>
    <DialogModal>
      <template #modal-btn>
        <slot name="btn-content">按鈕</slot>
      </template>
      <template #modal-header>
        <p class="text-xl font-black font-self text-brand-02">訂單詳情</p>
      </template>
      <template #modal-body>
        <div class="flex justify-between text-lg">
          <p>訂單編號: 2</p>
          <p>成立時間：2022-11-23</p>
        </div>
        <table
          class="my-4 w-full border border-brand-02 divide-y divide-brand-02 text-center"
        >
          <thead class="bg-brand-01 bg-opacity-50">
            <tr class="divide-x md:divide-x-0 divide-brand-02">
              <th>商品</th>
              <th>品項</th>
              <th>數量</th>
              <th>原價</th>
              <th>優惠價</th>
            </tr>
          </thead>
          <tbody class="border divide-y divide-brand-02">
            <tr
              class="hover:bg-gray-03 hover:bg-opacity-30 divide-x md:divide-x-0 divide-brand-02"
            >
              <td class="py-2">全手工紫砂壺</td>
              <td>八角壺</td>
              <td>1</td>
              <td class="">799</td>
              <td class="font-semibold text-lg">399</td>
            </tr>
            <tr
              class="hover:bg-gray-03 hover:bg-opacity-30 divide-x md:divide-x-0 divide-brand-02"
            >
              <td class="py-2">茶葉的風味鑑賞學</td>
              <td>2022-03-10 (三) / 15:00~16:30</td>
              <td>3</td>
              <td>3500</td>
              <td class="font-semibold text-lg"></td>
            </tr>
          </tbody>
        </table>
        <section
          class="grid grid-cols-2 gap-y-1 lg:w-1/4 text-end sm:text-lg ml-auto mt-5"
        >
          <p>原價</p>
          <p class="line-through text-gray-02">5299</p>
          <p>折扣碼</p>
          <p>無</p>
          <h2>總計</h2>
          <p>3899</p>
        </section>
      </template>
      <template #modal-footer></template>
    </DialogModal>
  </div>
</template>
<script>
import DialogModal from "../components/DialogModal.vue";
export default {
  components: {
    DialogModal,
  },
};
</script>
