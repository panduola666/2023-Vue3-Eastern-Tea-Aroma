<template>
  <section>
    <h1></h1>
    <div class="flex gap-10 justify-between items-start md:items-center">
      <select
        name=""
        id=""
        class="flex-grow py-2 shadow max-w-[400px]"
        aria-label="請選擇商品分類"
      >
        <option value="" selected>全部</option>
        <option value="茶葉">茶葉</option>
        <option value="茶壺">茶壺</option>
        <option value="茶罐">茶罐</option>
        <option value="茶具組">茶具組</option>
        <option value="品茶小物">品茶小物</option>
      </select>
      <div class="flex gap-3 flex-col-reverse md:flex-row">
        <button type="button" class="btn-outline py-2" disabled>
          全部套用
        </button>
        <PostProductsModal>
          <template #btn-content>
            <button type="button" class="btn-primary lg:px-10">新增商品</button>
          </template>
        </PostProductsModal>
      </div>
    </div>

    <ul class="grid gap-3 mt-3">
      <li is="vue:CoursesCard">
        <template #image>
          <img
            src="../assets/課堂02.png"
            alt=""
            class="w-full h-full object-cover"
          />
        </template>
        <template #card-header>
          <section
            class="w-full flex flex-col lg:flex-row lg:justify-between gap-3"
          >
            <h1 class="lg:w-4/5 overflow-hidden truncate">
              阿里山烏龍茶阿里山烏龍茶阿里山烏龍茶阿里山烏龍茶阿里山烏龍茶阿里山烏龍茶阿里山烏龍茶阿里山烏龍茶阿里山烏龍茶阿里山烏龍茶阿里山烏龍茶阿里山烏龍茶阿里山烏龍茶阿里山烏龍茶
            </h1>
            <DiscountToggle
              class="text-sm self-end lg:self-center mb-1 lg:mb-0"
            ></DiscountToggle>
          </section>
        </template>
        <template #card-body>
          <p>分類：茶葉</p>
          <p>系列：高山烏龍</p>
          <p class="flex justify-between items-center text-lg">
            單價：$ 500 <span class="text-sm text-gray-02">剩餘：15</span>
          </p>
        </template>
        <template #card-footer>
          <PostProductsModal>
            <template #btn-content>
              <button type="button" class="btn-outline py-2">編輯</button>
            </template>
          </PostProductsModal>
          <button type="button" class="btn-outline py-2">刪除</button>
        </template>
      </li>
    </ul>
  </section>
</template>
<script>
import PostProductsModal from "./PostProductsModal.vue";
import CoursesCard from "../components/CoursesCard.vue";
import DiscountToggle from "./DiscountToggle.vue";

export default {
  components: {
    CoursesCard,
    PostProductsModal,
    DiscountToggle,
  },
};
</script>
