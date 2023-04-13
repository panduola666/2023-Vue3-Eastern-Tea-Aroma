<template>
  <div class="flex justify-between items-center mb-10">
    <h2
      class="text-xl font-black font-self text-brand-02 border-2 border-brand-02 py-3 px-6"
      :class="{ 'bg-brand-02 text-white': $route.path === '/shopCart' }"
    >
      1. 購買清單
    </h2>
    <span class="border border-brand-02 flex-grow h-0"></span>
    <h2
      class="text-xl font-black font-self text-brand-02 border-2 border-brand-02 py-3 px-6"
      :class="{ 'bg-brand-02 text-white': $route.path === '/shopCart/info' }"
    >
      2. 購買人資訊
    </h2>
    <span class="border border-brand-02 flex-grow h-0"></span>

    <h2
      class="text-xl font-black font-self text-brand-02 border-2 border-brand-02 py-3 px-6"
      :class="{ 'bg-brand-02 text-white': $route.path === '/shopCart/finish' }"
    >
      3. 完成
    </h2>
  </div>
</template>
