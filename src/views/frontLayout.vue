<template>
  <div class="flex flex-col justify-between h-screen">
    <div>
      <NormalNav />
      <router-view />
    </div>
    <BaseFooter />
  </div>
</template>
<script>
// import { RouterLink, RouterView } from "vue-router";
import NormalNav from '../components/NormalNav.vue'
import BaseFooter from '../components/BaseFooter.vue'
import { mapState, mapActions } from 'pinia'
import { userStore } from '../stores/index.js'

export default {
  components: {
    NormalNav,
    BaseFooter
  },
  computed: {
    ...mapState(userStore, ['isLogin'])
  },
  methods: {
    ...mapActions(userStore, ['checkLogin', 'overLogin'])
  },
  watch: {
    '$route.fullPath'(path) {
      this.checkLogin()
      if (
        (path.startsWith('/user') ||
          path === '/shopCart' ||
          path === '/shopCart/info') &&
        !this.isLogin
      ) {
        this.overLogin()
      }
    }
  },
  mounted() {
    this.checkLogin()
    if (
      (this.$route.fullPath.startsWith('/user') ||
        this.$route.fullPath === '/shopCart' ||
        this.$route.fullPath === '/shopCart/info') &&
      !this.isLogin
    ) {
      this.overLogin()
    }
  }
}
</script>
