<template>
  <main class="wrap grid lg:grid-cols-5 gap-4">
    {{ current }}
    <ol
      class="flex flex-wrap lg:flex-col bg-brand-06 text-brand-05 font-black font-self text-xl h-max"
    >
      <li class="relative">
        <input
          type="radio"
          name="productType"
          id="all"
          v-model="chooseType"
          value=""
          class="absolute opacity-0"
        />
        <label
          for="all"
          :class="{ 'bg-brand-01 bg-opacity-30': currentChoose === '' }"
          @click="currentChoose = ''"
          class="block w-full h-full p-4 hover:bg-brand-01 hover:bg-opacity-30 cursor-pointer"
          >全部</label
        >
      </li>
      <li
        class="relative"
        v-for="(item, index) in productTypes"
        :key="item + index"
      >
        <input
          type="radio"
          name="productType"
          :id="item + index"
          v-model="chooseType"
          :value="item"
          class="absolute opacity-0"
        />
        <label
          :for="item + index"
          :class="{ 'bg-brand-01 bg-opacity-30': currentChoose === item }"
          @click="currentChoose = item"
          class="block w-full h-full p-4 hover:bg-brand-01 hover:bg-opacity-30 cursor-pointer"
          >{{ item }}</label
        >
      </li>
    </ol>
    <div class="lg:col-span-4">
      <section class="flex justify-between">
        <h2 class="text-2xl text-brand-05 font-black font-self">
          茶藝用品 / {{ chooseType }}
        </h2>
        <p class="text-lg text-gray-02">第 1 頁</p>
      </section>
      <ul class="grid md:grid-cols-2 gap-3 my-5">
        <li class="h-72 group relative overflow-hidden">
          <router-link to="">
            <img
              src="../assets/課堂04.png"
              alt=""
              class="w-full h-full object-cover group-hover:scale-110 duration-1000"
            />
            <h1
              class="truncate bg-[rgba(0,52,22,.6)] absolute bottom-0 right-0 left-0 py-4 px-5 text-white text-xl font-self font-black"
            >
              小金桔普洱茶
            </h1>
          </router-link>
        </li>
        <li class="h-72 group relative overflow-hidden">
          <router-link to="">
            <img
              src="../assets/課堂04.png"
              alt=""
              class="w-full h-full object-cover group-hover:scale-110 duration-1000"
            />
            <h1
              class="truncate bg-[rgba(0,52,22,.6)] absolute bottom-0 right-0 left-0 py-4 px-5 text-white text-xl font-self font-black"
            >
              小金桔普洱茶
            </h1>
          </router-link>
        </li>
        <li class="h-72 group relative overflow-hidden">
          <router-link to="">
            <img
              src="../assets/課堂04.png"
              alt=""
              class="w-full h-full object-cover group-hover:scale-110 duration-1000"
            />
            <h1
              class="truncate bg-[rgba(0,52,22,.6)] absolute bottom-0 right-0 left-0 py-4 px-5 text-white text-xl font-self font-black"
            >
              小金桔普洱茶
            </h1>
          </router-link>
        </li>
        <li class="h-72 group relative overflow-hidden">
          <router-link to="">
            <img
              src="../assets/課堂04.png"
              alt=""
              class="w-full h-full object-cover group-hover:scale-110 duration-1000"
            />
            <h1
              class="truncate bg-[rgba(0,52,22,.6)] absolute bottom-0 right-0 left-0 py-4 px-5 text-white text-xl font-self font-black"
            >
              小金桔普洱茶
            </h1>
          </router-link>
        </li>
      </ul>
      <p class="flex gap-4 items-center justify-center">
        <button type="button" class="btn-outline py-2">上一頁</button>
        第 1 / 1 頁
        <button type="button" class="btn-outline py-2">下一頁</button>
      </p>
    </div>
  </main>
</template>
<script>
export default {
  props: ["current"],
  data() {
    return {
      chooseType: "",
      currentChoose: "",
      productTypes: ["茶葉", "茶壺", "茶罐", "茶具組", "品茶小物"],
    };
  },
};
</script>
