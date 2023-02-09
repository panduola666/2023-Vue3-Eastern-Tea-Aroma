<template>
  <div>
    <admin-nav v-if="this.$route.fullPath.includes('admin')"></admin-nav>
    <normal-nav v-else></normal-nav>
    <router-view></router-view>
    <base-footer></base-footer>
  </div>
</template>
<script>
// import indexView from './views/indexView.vue';
// import { RouterLink, RouterView } from "vue-router";
import normalNav from "./components/NormalNav.vue";
import adminNav from "./components/AdminNav.vue";
import baseFooter from "./components/BaseFooter.vue";
export default {
  components: {
    normalNav,
    baseFooter,
    adminNav,
  },
};
</script>
