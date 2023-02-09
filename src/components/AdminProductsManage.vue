<template>
  <section>
    <h1></h1>
    <div class="flex justify-between items-center">
      <select name="" id="" class="lg:min-w-[300px] py-2 shadow" aria-label="請選擇商品分類">
        <option value="" selected>全部</option>
        <option value="茶葉">茶葉</option>
        <option value="茶壺">茶壺</option>
        <option value="茶罐">茶罐</option>
        <option value="茶具組">茶具組</option>
        <option value="品茶小物">品茶小物</option>
      </select>
      <PostProductsModal>
        <template #btn-content>
          <button type="button" class="btn-primary lg:px-10">新增商品</button>
        </template>
      </PostProductsModal>
    </div>
    <DiscountInfo>
      <template #scale>200 元</template>
      <template #code>dqw213</template>
      <template #endDate>2013-01-23 23:59:59</template>
    </DiscountInfo>
    <ul class="grid gap-3">
      <li is="vue:CoursesCard">
        <template #image>
          <img
            src="../assets/課堂02.png"
            alt=""
            class="w-full h-full object-cover"
          />
        </template>
        <template #card-header>
          <h1>阿里山烏龍茶</h1>
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
import DiscountInfo from "../components/DiscountInfo.vue";
import CoursesCard from "../components/CoursesCard.vue";

export default {
  components: {
    CoursesCard,
    DiscountInfo,
    PostProductsModal,
  },
};
</script>
