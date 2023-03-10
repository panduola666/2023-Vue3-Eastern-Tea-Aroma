<template>
  <div>
    <loading
      :active="isLoading"
      :is-full-page="true"
      :lock-scroll="true"
    ></loading>
    <router-view></router-view>
  </div>
</template>
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { mapState } from 'pinia'
import { vueLoadingStore } from './stores/index.js'
export default {
  computed: {
    ...mapState(vueLoadingStore, ['isLoading'])
  },
  components: { Loading }
}
</script>
