<template>
  <section>
    <h1></h1>
    <div
      class="flex lg:flex-row flex-col gap-5 justify-between lg:items-center"
    >
      <label
        for=""
        class="w-full flex lg:flex-row flex-col lg:items-center items-start lg:gap-3"
      >
        <p class="flex-shrink-0">商品分類</p>
        <select
          name=""
          id=""
          class="py-2 shadow flex-grow w-full"
          aria-label="請選擇商品分類"
        >
          <option value="" selected>全部</option>
          <option value="茶葉">茶葉</option>
          <option value="茶壺">茶壺</option>
          <option value="茶罐">茶罐</option>
          <option value="茶具組">茶具組</option>
          <option value="品茶小物">品茶小物</option>
        </select>
      </label>

      <div class="flex-shrink-0 flex justify-end gap-3">
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
            src="../assets/最新活動03@3x.png"
            alt=""
            class="w-full h-full object-cover"
          />
        </template>
        <template #card-header>
          <section
            class="w-full flex flex-col lg:flex-row lg:justify-between gap-3"
          >
            <h2 class="lg:w-4/5 overflow-hidden truncate">
              阿里山烏龍茶阿里山烏龍茶阿里山烏龍茶阿里山烏龍茶阿里山烏龍茶阿里山烏龍茶阿里山烏龍茶阿里山烏龍茶阿里山烏龍茶阿里山烏龍茶阿里山烏龍茶阿里山烏龍茶阿里山烏龍茶阿里山烏龍茶
            </h2>
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
