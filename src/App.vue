<template>
  <div>
    <loading
      v-model:active="isLoading"
      :is-full-page="true"
      :can-cancel="true"
      :on-cancel="closeLoading"
    >
    </loading>
    <router-view></router-view>
  </div>
</template>
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { mapState, mapActions } from 'pinia'
import { vueLoadingStore } from './stores/index.js'
export default {
  computed: {
    ...mapState(vueLoadingStore, ['isLoading'])
  },
  methods: {
    ...mapActions(vueLoadingStore, ['closeLoading'])
  },
  components: { Loading }
}
</script>
