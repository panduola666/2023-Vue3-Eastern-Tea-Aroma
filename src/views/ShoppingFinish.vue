<template>
  <div class="wrap">
    <ShopStep />
    <div class="text-center pt-20">
      <h1 class="text-3xl mb-5">購買完成，感謝您的購買</h1>
      <router-link to="/courses" class="btn-primary text-xl inline-block"
        >再去逛逛</router-link
      >
    </div>
  </div>
</template>
<script setup>
import ShopStep from '../components/ShopStep.vue'
</script>
