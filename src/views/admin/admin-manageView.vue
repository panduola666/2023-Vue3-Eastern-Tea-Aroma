<template>
  <main class="wrap">
    <ul
      class="grid md:grid-cols-4 grid-cols-2 text-center text-2xl font-black font-GenRyuMin text-brand-02"
    >
      <li v-for="(item, index) in navText" :key="item + index">
        <button
          class="btn-outline w-full"
          :class="{
            'bg-brand-02 text-white border-brand-02':
              this.$route.query.current === item + '管理',
          }"
          @click="this.$router.push(`${this.$route.path}?current=${item}管理`)"
        >
          {{ item }}管理
        </button>
      </li>
    </ul>
    <div class="border-2 border-t-0 border-brand-01 bg-white bg-opacity-20 p-2">
      <AdminProductsManage v-if="this.$route.query.current === '商品管理'"></AdminProductsManage>
      <AdminOrdersManage v-else-if="this.$route.query.current === '訂單管理'"></AdminOrdersManage>
      <p v-else class="text-center text-2xl font-GenRyuMin">~ 未完成 ~</p>

      <PagingComponent class="mt-5"></PagingComponent>
    </div>
  </main>
</template>
<script>
import PagingComponent from "../../components/PagingComponent.vue";
import AdminProductsManage from "../../components/AdminProductsManage.vue";
import AdminOrdersManage from "../../components/AdminOrdersManage.vue";

export default {
  data() {
    return {
      navText: ["商品", "訂單", "文章", "活動"],
    };
  },
  components: {
    // CoursesCard,
    PagingComponent,
    AdminProductsManage,
    AdminOrdersManage,
  },
};
</script>
