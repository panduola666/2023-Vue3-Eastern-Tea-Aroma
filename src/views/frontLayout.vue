<template>
  <div>
    <NormalNav></NormalNav>
    <router-view></router-view>
    <BaseFooter></BaseFooter>
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
    console.log(this.$route)
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
