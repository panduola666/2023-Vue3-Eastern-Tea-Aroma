<template>
  <div>
    <DialogModal>
      <template #modal-btn>
        <slot name="btn-content">按鈕</slot>
      </template>
      <template #modal-header>
        <h3 class="text-xl font-GenRyuMin">新增折扣碼</h3>
      </template>
      <template #modal-body>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col">
            <label for="">* 折扣碼</label>
            <input
              type="text"
              name=""
              id=""
              placeholder="請輸入折扣碼..."
              class="border border-gray-01 p-2"
            />
          </div>
          <div class="flex flex-col">
            <label for="" class="">* 折扣方式</label>
            <select name="" id="" class="border border-gray-01 p-2">
              <option value="" selected disabled hidden>請選擇折扣方式</option>
              <option value="百分比">百分比</option>
              <option value="實際金額">實際金額</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-6">
            <div class="flex flex-col">
              <label for="" class="">* 有效期間</label>
              <select name="" id="" class="border border-gray-01 p-2">
                <option value="" selected disabled hidden>
                  請選擇折扣有效期間
                </option>
                <option value="3">3 天</option>
                <option value="7">7 天</option>
                <option value="14">14 天</option>
              </select>
            </div>
            <div class="flex flex-col">
              <label for="">* 折扣額度</label>
              <input
                type="text"
                name=""
                id=""
                placeholder="請輸入金額..."
                class="border border-gray-01 p-2"
              />
            </div>
            <div class="flex flex-col">
              <label for="">* 折扣額度</label>
              <select name="" id="" class="border border-gray-01 p-2">
                <option value="" selected disabled hidden>
                  請選擇折扣比例
                </option>
                <option value="95 折">95 折</option>
                <option value="9 折">9 折</option>
                <option value="85 折">85 折</option>
                <option value="8 折">8 折</option>
                <option value="75 折">75 折</option>
              </select>
            </div>
          </div>
        </div>
      </template>
    </DialogModal>
  </div>
</template>
<script>
import DialogModal from "./DialogModal.vue";
export default {
  components: {
    DialogModal,
  },
};
</script>
