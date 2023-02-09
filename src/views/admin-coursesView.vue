<template>
  <main class="wrap">
    <h2 class="text-3xl font-black font-GenRyuMin text-brand-02">課程列表</h2>
    <div class="flex justify-end gap-5 mb-5">
      <DialogModal>
        <template #modal-btn>
          <button type="button" class="btn-outline">新增折扣碼</button>
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
                <option value="" selected disabled hidden>
                  請選擇折扣方式
                </option>
                <option value="百分比">百分比</option>
                <option value="實際金額">實際金額</option>
              </select>
            </div>
            <div class="grid grid-cols-2 gap-6">
              <div class="flex flex-col">
                <label for="" class="">* 持續時間</label>
                <select name="" id="" class="border border-gray-01 p-2">
                  <option value="" selected disabled hidden>
                    請選擇折扣持續時間
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
      <PostCourseModal>
        <template #btn-content>
          <button typeof="button" class="btn-primary">開新課程</button>
        </template>
      </PostCourseModal>
    </div>
    <DiscountInfo>
      <template #scale>95 折</template>
      <template #code>Tea231</template>
      <template #endDate>2023-03-04 23:59:59</template>
    </DiscountInfo>
    <ul class="grid gap-5">
      <li is="vue:CoursesCard">
        <template #image>
          <img
            src="../assets/BANNER@3x-2.png"
            alt=""
            class="w-full h-full object-cover"
          />
        </template>
        <template #card-header>
          茶葉的風味鑑賞學
          <PostCourseModal>
            <template #btn-content>
              <button typeof="button" class="btn-outline py-2 text-base mb-1">
                編輯
              </button>
            </template>
          </PostCourseModal>
        </template>
        <template #card-body>
          <p>時段：2022-03-10 (三) / 15:00~16:30</p>
          <p>開放人數：30人</p>
          <div class="flex justify-between">
            <p>評分：尚未評分</p>
            <p class="text-xl">$ 3500</p>
          </div>
          <p class="text-gray-02 text-end text-sm">剩餘：10</p>
        </template>
        <template #card-footer>
          <div class="flex flex-grow gap-3 flex-col lg:flex-row justify-end">
            <div class="grid grid-cols-2 gap-3">
              <button typeof="button" class="btn-outline">刪除</button>
              <router-link to="" class="btn-outline text-center"
                >課程詳情</router-link
              >
            </div>
            <OrderCourseModal>
              <template #btn-content>
                <button typeof="button" class="btn-primary">預約管理</button>
              </template>
            </OrderCourseModal>
          </div>
        </template>
      </li>
    </ul>
  </main>
</template>
<script>
import CoursesCard from "../components/CoursesCard.vue";
import PostCourseModal from "../components/PostCourseModal.vue";
import DialogModal from "../components/DialogModal.vue";
import OrderCourseModal from "../components/OrderCourseModal.vue";
import DiscountInfo from "../components/DiscountInfo.vue";
export default {
  components: {
    CoursesCard,
    PostCourseModal,
    DialogModal,
    OrderCourseModal,
    DiscountInfo,
  },
};
</script>
