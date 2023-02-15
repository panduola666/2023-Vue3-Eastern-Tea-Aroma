<template>
  <div class="wrap min-h-[50vh]">
    <h1 class="text-3xl font-black font-GenRyuMin text-brand-02">折扣專區</h1>
    <div class="text-end">
      <PostDiscountModal>
        <template #btn-content>
          <button type="button" class="btn-primary">新增折扣碼</button>
        </template>
      </PostDiscountModal>
    </div>
    <section class="bg-brand-03 bg-opacity-30 text-xl p-3 my-5">
      <h2 class="text-center text-2xl font-bold mb-3">當前已有折扣優惠</h2>
      <section class="grid lg:grid-cols-2">
        <h3 class="lg:self-center lg:text-center mb-3 lg:mb-0">優惠碼：dewrr2113</h3>
        <div>
          <p class="mb-3">截止日期：2023-1-23 00:00:00</p>
          <p class="col-start-2">折扣額度：95 折</p>
        </div>
      </section>
    </section>
    <table class="w-full my-5 divide-y divide-gray-01 border border-gray-01">
      <thead>
        <tr class="bg-brand-01 bg-opacity-30">
          <th class="p-2">商品系列</th>
          <th>原價</th>
          <th>優惠價</th>
          <th>是否套用折扣</th>
        </tr>
      </thead>
      <tbody class="bg-white bg-opacity-30 text-center divide-y divide-gray-01">
        <!-- <tr>
          <td colspan="5" class="p-2">當前沒有任何商品</td>
        </tr> -->
        <tr class="hover:bg-gray-03 hover:bg-opacity-30">
          <td class="p-3">高山烏龍</td>
          <td>300</td>
          <td>200</td>
          <td><input type="checkbox" class="scale-150 cursor-pointer" /></td>
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
