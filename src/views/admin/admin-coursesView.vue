<template>
  <main class="wrap">
    <h1 class="text-3xl font-black font-self text-brand-02">課程列表</h1>
    <div class="flex justify-end gap-5 mb-5">
      <button type="button" class="btn-outline">全部套用</button>
      <PostCourseModal>
        <template #btn-content>
          <button typeof="button" class="btn-primary">開新課程</button>
        </template>
      </PostCourseModal>
    </div>
    <ul class="grid gap-5">
      <li is="vue:CoursesCard">
        <template #image>
          <img
            src="../../assets/BANNER@3x-2.png"
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
            <DiscountToggle
              class="justify-end my-3 lg:my-0 lg:justify-start flex-grow"
            ></DiscountToggle>
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
import CoursesCard from "../../components/CoursesCard.vue";
import PostCourseModal from "../../components/PostCourseModal.vue";
import OrderCourseModal from "../../components/OrderCourseModal.vue";
import DiscountToggle from "../../components/DiscountToggle.vue";

export default {
  components: {
    CoursesCard,
    PostCourseModal,
    OrderCourseModal,
    DiscountToggle,
  },
};
</script>
