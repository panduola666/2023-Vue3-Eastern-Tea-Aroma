<template>
  <div>
    <loading
      v-model:active="modalLoading"
      :is-full-page="true"
      :can-cancel="true"
      :on-cancel="closeLoading"
    />
    <router-view />
  </div>
</template>
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { mapState, mapActions } from 'pinia'
import { vueLoadingStore } from './stores/index.js'
export default {
  data() {
    return {
      modalLoading: false
    }
  },
  computed: {
    ...mapState(vueLoadingStore, ['isLoading'])
  },
  methods: {
    ...mapActions(vueLoadingStore, ['closeLoading'])
  },
  watch: {
    isLoading() {
      this.modalLoading = this.isLoading
    }
  },
  components: { Loading }
}
</script>
