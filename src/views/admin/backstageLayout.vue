<template>
  <div>
    <AdminNav></AdminNav>
    <router-view></router-view>
    <BaseFooter></BaseFooter>
  </div>
</template>
<script>
// import { RouterLink, RouterView } from "vue-router";
import AdminNav from "../../components/AdminNav.vue";
import BaseFooter from "../../components/BaseFooter.vue";

export default {
  components: {
    AdminNav,
    BaseFooter,
  },
};
</script>
