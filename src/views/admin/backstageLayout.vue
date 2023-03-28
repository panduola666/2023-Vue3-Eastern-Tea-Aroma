<template>
  <div class="flex flex-col justify-between h-screen">
    <div>
      <AdminNav />
      <router-view v-if="this.user.isAdmin" />
      <div class="wrap flex items-center" v-else>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-96"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
        <div class="flex-grow text-center">
          <p class="text-5xl mb-5">僅講師登入</p>
          <router-link to="/" class="text-3xl text-brand-01 hover:text-brand-02"
            >返回首頁 ></router-link
          >
        </div>
      </div>
    </div>
    <BaseFooter />
  </div>
</template>
<script>
import AdminNav from '../../components/AdminNav.vue'
import BaseFooter from '../../components/BaseFooter.vue'
import { mapState, mapActions } from 'pinia'
import { userStore } from '../../stores/index.js'
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
      if (!this.isLogin) {
        this.overLogin()
      }
    }
  },
  mounted() {
    this.checkLogin()
    if (!sessionStorage.getItem('userId')) {
      this.$swal
        .fire({
          icon: 'warning',
          title: '請登入後重試',
          showConfirmButton: false,
          timer: 1500
        })
        .then((res) => {
          if (res.isDismissed) this.$router.push('/login')
        })
    }
  }
}
</script>
