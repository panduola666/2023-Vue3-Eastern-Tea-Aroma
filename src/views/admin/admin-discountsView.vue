<template>
  <div class="wrap min-h-[50vh]">
    <h1 class="text-3xl font-black font-GenRyuMin text-brand-02">折扣碼專區</h1>
    <div class="text-end">
      <PostDiscountModal>
        <template #btn-content>
          <button type="button" class="btn-primary">新增折扣碼</button>
        </template>
      </PostDiscountModal>
    </div>
    <table class="w-full my-5 divide-y divide-gray-01 border border-gray-01">
      <thead>
        <tr class="bg-brand-01 bg-opacity-30">
          <th></th>
          <th class="p-2">折扣碼</th>
          <th>方式</th>
          <th>截止日期 <span class="text-sm text-gray-02">(0 點整)</span></th>
          <th>折扣額度</th>
        </tr>
      </thead>
      <tbody class="bg-white bg-opacity-30 text-center divide-y divide-gray-01">
        <!-- <tr>
          <td colspan="5" class="p-2">當前沒有折扣碼</td>
        </tr> -->
        <tr class="hover:bg-gray-03 hover:bg-opacity-30">
          <td>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 mx-auto cursor-pointer stroke-brand-02 hover:stroke-brand-01"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </td>
          <td class="p-2">teaq23</td>
          <td>實際金額</td>
          <td>2011-23-21</td>
          <td>300 元</td>
        </tr>
        <tr class="hover:bg-gray-03 hover:bg-opacity-30">
          <td>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 mx-auto cursor-pointer stroke-brand-02 hover:stroke-brand-01"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </td>
          <td class="p-2">teaq23</td>
          <td>百分比</td>
          <td>已截止</td>
          <td>65 折</td>
        </tr>
      </tbody>
    </table>
    <PagingComponent>
      <template #default> 1 / 3 </template>
    </PagingComponent>
  </div>
</template>
<script>
import PostDiscountModal from "../../components/PostDiscountModal.vue";
import PagingComponent from "../../components/PagingComponent.vue";
export default {
  components: {
    PostDiscountModal,
    PagingComponent,
  },
};
</script>
