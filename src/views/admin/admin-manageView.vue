<template>
  <main class="admin-wrap">
    <h1 class="text-3xl font-black font-self text-brand-02 mb-5">項目總管理</h1>
    <div class="grid grid-cols-4">
      <ul class="text-center text-2xl font-black font-self text-brand-02">
        <li
          v-for="(item, index) in ['商品', '訂單','會員', '文章', '活動']"
          :key="item + index"
        >
          <button
            class="btn-outline w-full"
            :class="{
              'bg-brand-02 text-white border-brand-02':
                this.$route.query.current === item + '管理',
              '-translate-y-[1px]': index === 1,
              '-translate-y-[2px]': index === 2,
              '-translate-y-[3px]': index === 3,
              '-translate-y-[4px]': index === 4,
            }"
            @click="
              this.$router.push(`${this.$route.path}?current=${item}管理`)
            "
          >
            {{ item }}管理
          </button>
        </li>
      </ul>
      <div
        class="col-span-3 border-2 border-brand-02 bg-white bg-opacity-20 p-5"
      >
        <AdminProductsManage
          v-if="this.$route.query.current === '商品管理'"
        ></AdminProductsManage>
        <AdminOrdersManage
          v-else-if="this.$route.query.current === '訂單管理'"
        ></AdminOrdersManage>
        <p v-else class="text-center text-2xl font-self">~ 未完成 ~</p>

        <PagingComponent class="mt-5"></PagingComponent>
      </div>
    </div>
  </main>
</template>
<script>
import PagingComponent from "../../components/PagingComponent.vue";
import AdminProductsManage from "../../components/AdminProductsManage.vue";
import AdminOrdersManage from "../../components/AdminOrdersManage.vue";

export default {
  data() {
    return {};
  },
  components: {
    // CoursesCard,
    PagingComponent,
    AdminProductsManage,
    AdminOrdersManage,
  },
};
</script>
