<template>
  <div>
    <AdminNav></AdminNav>
    <router-view></router-view>
    <BaseFooter></BaseFooter>
  </div>
</template>
<script>
import AdminNav from '../../components/AdminNav.vue'
import BaseFooter from '../../components/BaseFooter.vue'
import { mapState, mapActions } from 'pinia'
import { userStore } from '../../stores/index'
export default {
  components: {
    AdminNav,
    BaseFooter
  },
  computed: {
    ...mapState(userStore, ['isLogin', 'user'])
  },
  methods: {
    ...mapActions(userStore, ['checkLogin', 'overLogin'])
  },
  watch: {
    '$route.fullPath'(path) {
      this.checkLogin()
      if (!this.isLogin) this.overLogin()
    },
    mounted() {
      // this.checkLogin()
    }
  }
}
</script>
