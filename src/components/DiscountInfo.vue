<template>
  <p
    v-if="discountData.end > new Date()"
    class="bg-brand-03 bg-opacity-20 px-5 py-8 text-xl text-gray-01 mt-5 font-self"
  >
    當前商品享活動優惠：全面
    <span class="text-2xl font-black">{{
      discountData.type === 'money'
        ? `折扣 ${discountData.scale} 元`
        : `${discountData.scale * 100} 折`
    }}</span
    >，優惠碼：{{ discountData.code }}
  </p>
</template>
<script>
import { mapState, mapActions } from 'pinia'
import { discountStore } from '../stores/index.js'
export default {
  computed: {
    ...mapState(discountStore, ['discountData'])
  },
  methods: {
    ...mapActions(discountStore, ['getDiscountData'])
  },
  mounted() {
    this.getDiscountData()
  }
}
</script>
