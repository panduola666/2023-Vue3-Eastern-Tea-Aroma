<template>
  <main class="admin-wrap">
    <teleport to="title">項目管理</teleport>
    <h1 class="text-3xl font-black font-self text-brand-02 mb-5">項目總管理</h1>
    <div class="grid lg:grid-cols-5 grid-cols-1">
      <ul class="text-center text-2xl font-black font-self text-brand-02">
        <li
          v-for="(item, index) in ['商品', '訂單', '活動']"
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
              '-translate-y-[4px]': index === 4
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
        class="col-span-4 border-2 border-brand-02 bg-white bg-opacity-20 p-5 min-h-[330px]"
      >
        <AdminProductsManage
          v-if="this.$route.query.current === '商品管理'"
        ></AdminProductsManage>
        <AdminOrdersManage
          v-else-if="this.$route.query.current === '訂單管理'"
        ></AdminOrdersManage>
        <AdminActivitiesManage
          v-else-if="this.$route.query.current === '活動管理'"
        ></AdminActivitiesManage>
      </div>
    </div>
  </main>
</template>
<script>
import AdminProductsManage from '../../components/AdminProductsManage.vue'
import AdminOrdersManage from '../../components/AdminOrdersManage.vue'
import AdminActivitiesManage from '../../components/AdminActivitiesManage.vue'
export default {
  data() {
    return {}
  },
  components: {
    // CoursesCard,
    AdminProductsManage,
    AdminOrdersManage,
    AdminActivitiesManage
  }
}
</script>
