<template>
  <nav class="shadow-md">
    <div class="wrap my-0 flex justify-between items-center pb-2">
      <router-link to="/" class="pb-[10px] pt-[18px]">
        <img
          src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/logo.png?raw=true"
          alt="東方茶香logo"
        />
      </router-link>
      <ul class="hidden items-center text-brand-02 gap-5 xl:gap-10 lg:flex">
        <li
          class="text-xl leading-[30px] pb-[10px] pt-[18px] hover:text-brand-01"
        >
          <router-link
            :to="{ name: '課程列表' }"
            :class="{ 'font-semibold': this.$route.path === '/admin' }"
            >課程列表</router-link
          >
        </li>
        <li
          class="text-xl leading-[30px] pb-[10px] pt-[18px] hover:text-brand-01"
        >
          <router-link
            :to="{ name: '折扣碼' }"
            :class="{ 'font-semibold': this.$route.path === '/admin/discount' }"
            >折扣碼</router-link
          >
        </li>
        <li class="group relative">
          <router-link
            to="/admin/manage/products"
            class="flex transition-all group-hover:text-brand-01 text-xl leading-[30px] pb-[10px] pt-[18px]"
            :class="{ 'font-semibold': this.$route.path === '/admin/manage' }"
          >
            管理項目
            <img
              src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/Property%201=arrow-down.png?raw=true"
              alt="展開"
              class="group-hover:-rotate-180 transition"
            />
          </router-link>
          <ul
            class="absolute button-0 left-0 hidden group-hover:block bg-white min-w-[216px] z-10 text-gray-01 shadow-lg"
          >
            <li>
              <router-link
                to="/admin/manage/products"
                class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20"
                :class="{
                  'font-semibold': this.$route.query.current === '商品管理'
                }"
                >商品管理</router-link
              >
            </li>
            <li>
              <router-link
                to="/admin/manage/orders"
                class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20"
                :class="{
                  'font-semibold': this.$route.query.current === '訂單管理'
                }"
                >訂單管理</router-link
              >
            </li>
            <li>
              <router-link
                to="/admin/manage/activities"
                class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20"
                :class="{
                  'font-semibold': this.$route.query.current === '活動管理'
                }"
                >活動管理</router-link
              >
            </li>
          </ul>
        </li>
        <li
          class="text-xl leading-[30px] pb-[10px] pt-[18px] hover:text-brand-01"
        >
          <router-link
            :to="{ name: '數據分析' }"
            :class="{ 'font-semibold': this.$route.path === '/admin/analyze' }"
          >
            數據分析
          </router-link>
        </li>
      </ul>
      <div class="flex items-center">
        <div class="relative group lg:mr-8 mr-3">
          <img
            src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/Property%201=account.png?raw=true"
            alt="會員"
            class="object-contain h-9 max-w-[30px]"
          />
          <ul
            class="absolute bg-white min-w-[216px] button-0 -translate-x-1/4 md:-translate-x-0 group-hover:block hidden text-gray-01 z-10 shadow-lg"
          >
            <li>
              <router-link
                to="/admin/user"
                class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20"
                >會員專區</router-link
              >
            </li>
            <li>
              <router-link
                to="/admin"
                class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20"
                :class="{ 'font-semibold': this.$route.path === '/admin' }"
                >課程列表</router-link
              >
            </li>
            <li>
              <router-link
                to="/admin/discount"
                class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20"
                :class="{
                  'font-semibold': this.$route.path === '/admin/discount'
                }"
                >折扣碼</router-link
              >
            </li>
            <li>
              <router-link
                to="/admin/manage/products"
                class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20"
                :class="{
                  'font-semibold': this.$route.path === '/admin/manage'
                }"
                >管理項目</router-link
              >
            </li>
            <li>
              <router-link
                to="/admin/analyze"
                class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20"
                :class="{
                  'font-semibold': this.$route.path === '/admin/analyze'
                }"
                >數據分析</router-link
              >
            </li>
            <li>
              <router-link
                to="/"
                class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20 text-gray-02"
                @click="() => signOut()"
                >登出</router-link
              >
            </li>
          </ul>
        </div>
        <router-link to="/" type="button" class="btn-outline"
          >退出後台</router-link
        >
      </div>
    </div>
  </nav>
</template>
<script>
import { mapActions } from 'pinia'
import { userStore } from '../stores/index.js'
export default {
  methods: {
    ...mapActions(userStore, ['signOut'])
  }
}
</script>
