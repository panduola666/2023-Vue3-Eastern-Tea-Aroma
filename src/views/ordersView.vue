<template>
  <main class="wrap">
    <h2 class="text-3xl font-black font-GenRyuMin text-brand-02">訂單資訊</h2>
    <table
      class="w-full table-fixed h-20 text-center border border-brand-05 overflow-scroll bg-white bg-opacity-20 my-4"
    >
      <thead class="bg-[#003416] bg-opacity-30 font-GenRyuMin">
        <tr>
          <th class="text-xs sm:text-base py-2">2022 - 11 - 23</th>
          <th class="py-2" colspan="2">
            物流查詢編號：<span class="sm:text-xl">123dq1e</span>
          </th>
        </tr>
      </thead>
      <tbody class="block w-[300%] max-h-40 overflow-auto">
        <tr class="table w-full text-lg hover:bg-brand-01 hover:bg-opacity-20">
          <td class="tracking-wider py-2">全手工紫砂壺</td>
          <td class="py-2">八角壺 * <span>1</span></td>
          <td class="sm:block flex flex-col py-2">
            <span class="mx-2 text-gray-02 line-through">$ 799</span>
            <span>$ 499</span>
          </td>
        </tr>
        <tr class="table w-full text-lg hover:bg-brand-01 hover:bg-opacity-20">
          <td class="tracking-wider py-2">全手工紫砂壺</td>
          <td class="py-2">八角壺 * <span>1</span></td>
          <td class="sm:block flex flex-col py-2">
            <span class="mx-2 text-gray-02 line-through">$ 799</span>
            <span>$ 499</span>
          </td>
        </tr>
        <tr class="table w-full text-lg hover:bg-brand-01 hover:bg-opacity-20">
          <td class="tracking-wider py-2">全手工紫砂壺</td>
          <td class="py-2">八角壺 * <span>1</span></td>
          <td class="sm:block flex flex-col py-2">
            <span class="mx-2 text-gray-02 line-through">$ 799</span>
            <span>$ 499</span>
          </td>
        </tr>
        <tr class="table w-full text-lg hover:bg-brand-01 hover:bg-opacity-20">
          <td class="tracking-wider py-2">全手工紫砂壺</td>
          <td class="py-2">八角壺 * <span>1</span></td>
          <td class="sm:block flex flex-col py-2">
            <span class="mx-2 text-gray-02 line-through">$ 799</span>
            <span>$ 499</span>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td class="pt-3">3件商品</td>
          <td class="pt-3 font-bold text-gray-02">未出貨</td>
          <td class="flex justify-center pt-3">
            <p>價格</p>
            <div class="sm:block flex flex-col">
              <span class="mx-2 text-gray-02 line-through">$ 1299</span>
              <span class="sm:text-xl">$ 999</span>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
    <table
      class="w-full table-fixed h-20 text-center border border-brand-05 overflow-scroll bg-white bg-opacity-20 my-4"
    >
      <thead class="bg-[#003416] bg-opacity-30 font-GenRyuMin">
        <tr>
          <th class="text-xs sm:text-base py-2">2022 - 11 - 23</th>
          <th class="py-2" colspan="2">
            物流查詢編號：<span class="sm:text-xl">123dq1e</span>
          </th>
        </tr>
      </thead>
      <tbody class="block w-[300%] max-h-40 overflow-auto">
        <tr class="table w-full text-lg hover:bg-brand-01 hover:bg-opacity-20">
          <td class="tracking-wider py-2">全手工紫砂壺</td>
          <td class="py-2">八角壺 * <span>1</span></td>
          <td class="sm:block flex flex-col py-2">
            <span class="mx-2 text-gray-02 line-through">$ 799</span>
            <span>$ 499</span>
          </td>
        </tr>
        <tr class="table w-full text-lg hover:bg-brand-01 hover:bg-opacity-20">
          <td class="tracking-wider py-2">全手工紫砂壺</td>
          <td class="py-2">八角壺 * <span>1</span></td>
          <td class="sm:block flex flex-col py-2">
            <span class="mx-2 text-gray-02 line-through">$ 799</span>
            <span>$ 499</span>
          </td>
        </tr>
        <tr class="table w-full text-lg hover:bg-brand-01 hover:bg-opacity-20">
          <td class="tracking-wider py-2">全手工紫砂壺</td>
          <td class="py-2">八角壺 * <span>1</span></td>
          <td class="sm:block flex flex-col py-2">
            <span class="mx-2 text-gray-02 line-through">$ 799</span>
            <span>$ 499</span>
          </td>
        </tr>
        <tr class="table w-full text-lg hover:bg-brand-01 hover:bg-opacity-20">
          <td class="tracking-wider py-2">全手工紫砂壺</td>
          <td class="py-2">八角壺 * <span>1</span></td>
          <td class="sm:block flex flex-col py-2">
            <span class="mx-2 text-gray-02 line-through">$ 799</span>
            <span>$ 499</span>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td class="pt-3">3件商品</td>
          <td class="pt-3 font-bold text-brand-02">已出貨</td>
          <td class="flex justify-center pt-3">
            <p>價格</p>
            <div class="sm:block flex flex-col">
              <span class="mx-2 text-gray-02 line-through">$ 1299</span>
              <span class="sm:text-xl">$ 999</span>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  </main>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-button {
  display: none;
}

::-webkit-scrollbar-track-piece {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 52, 22, 0.6);
}

::-webkit-scrollbar-track {
  box-shadow: transparent;
}
</style>
