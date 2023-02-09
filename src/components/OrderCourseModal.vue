<template>
  <DialogModal>
    <template #modal-btn>
      <slot name="btn-content">按鈕</slot>
    </template>
    <template #modal-header>
      <h3 class="text-xl font-GenRyuMin">茶葉的風味鑑賞學</h3>
    </template>
    <template #modal-body>
      <div class="grid lg:grid-cols-3 gap-3">
        <img
          src="../assets/課堂04@2x.png"
          alt=""
          class="w-full h-64 object-cover"
        />
        <div class="lg:col-span-2 lg:text-2xl flex flex-col gap-5">
          <p>時段：2022-03-10 (三) / 15:00~16:30</p>
          <p>開放人數：30人</p>
          <p class="grid lg:grid-cols-2 gap-y-3">
            已預約：20人<span class="text-gray-02">剩餘：10人</span>
          </p>
        </div>
      </div>
      <p class="my-4 text-xl">學員名單</p>
      <table class="w-full table-auto text-center divide-y-2 border-2">
        <thead class="bg-brand-03 bg-opacity-20">
          <tr>
            <th class="py-2">用戶名</th>
            <th>姓名</th>
            <th>手機號碼</th>
            <th>付款方式</th>
            <th>已付款</th>
            <th>評分</th>
          </tr>
        </thead>
        <tbody class="divide-y-2">
          <tr>
            <td class="truncate py-2 max-w-[40px]">王某人</td>
            <td>王小明</td>
            <td>
                <input type="number" value="0912342124" class="text-center w-full" disabled>
            </td>
            <td>貨到付款</td>
            <td></td>
            <td>尚未評分</td>
          </tr>
          <tr>
            <td class="truncate py-2 max-w-[40px]">王某人</td>
            <td>王小明</td>
            <td>
                <input type="number" value="0912342124" class="text-center w-full" disabled>
            </td>
            <td>信用卡</td>
            <td>
              <span>是</span>
              <span class="text-red-500">否</span>
            </td>
            <td>尚未評分</td>
          </tr>
          <tr>
            <td class="truncate py-2 max-w-[40px]">王某人</td>
            <td>王小明</td>
            <td>
                <input type="number" value="0912342124" class="text-center w-full" disabled>
            </td>
            <td>信用卡</td>
            <td>
              <span>是</span>
              <span class="text-red-500">否</span>
            </td>
            <td>尚未評分</td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-center gap-3 mt-2">
        <button type="button" class="hover:font-medium">上一頁</button>
        1 / 2
        <button type="button" class="hover:font-medium">下一頁</button>
      </div>
    </template>
    <template #modal-footerBTN>
      <span></span>
    </template>
  </DialogModal>
</template>
<script>
import DialogModal from "../components/DialogModal.vue";

export default {
  data() {
    return {
      range: {
        start: new Date(),
        end: new Date(),
      },
      masks: {
        input: "YYYY-MM-DD h:mm A",
      },
    };
  },
  components: {
    DialogModal,
  },
};
</script>
