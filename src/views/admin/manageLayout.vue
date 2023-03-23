<template>
  <main class="admin-wrap">
    <teleport to="title">項目管理</teleport>
    <h1 class="text-3xl font-black font-self text-brand-02 mb-5">項目總管理</h1>
    <div class="grid lg:grid-cols-5 grid-cols-1">
      <ul class="text-center text-2xl font-black font-self text-brand-02">
        <li
          v-for="(item, index) in [
            { name: '商品', path: 'products' },
            { name: '訂單', path: 'orders' },
            { name: '活動', path: 'activities' }
          ]"
          :key="item.name + item.path"
        >
          <router-link
            :to="{ name: item.path }"
            class="btn-outline w-full block outline-none"
            :class="{
              'bg-brand-02 text-white border-brand-02':
                this.$route.fullPath.includes(item.path),
              '-translate-y-[1px]': index === 1,
              '-translate-y-[2px]': index === 2,
              '-translate-y-[3px]': index === 3,
              '-translate-y-[4px]': index === 4
            }"
          >
            {{ item.name }}管理
          </router-link>
        </li>
      </ul>
      <div
        class="col-span-4 border-2 border-brand-02 bg-white bg-opacity-20 p-5 min-h-[330px]"
      >
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>
