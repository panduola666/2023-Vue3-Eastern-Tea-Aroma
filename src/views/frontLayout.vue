<template>
  <div>
    <NormalNav></NormalNav>
    <router-view></router-view>
    <BaseFooter></BaseFooter>
  </div>
</template>
<script>
import { RouterLink, RouterView } from "vue-router";
import NormalNav from "../components/NormalNav.vue";
import BaseFooter from "../components/BaseFooter.vue";
export default {
  components: {
    NormalNav,
    BaseFooter,
  },
};
</script>
