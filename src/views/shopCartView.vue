<template>
  <main>
    <div class="wrap">
      <h2 class="text-3xl font-black font-self text-brand-02">購買商品</h2>
      <TotalPrice class="mb-4"></TotalPrice>
      <ul class="grid gap-5">
        <li class="grid lg:grid-cols-3 bg-white hover:shadow-lg">
          <div class="w-full lg:h-full h-48 relative">
            <img
              src="../assets/最新活動02.png"
              alt=""
              class="w-full h-full object-cover"
            />
            <span
              class="absolute bg-brand-02 bg-opacity-60 text-white py-2 px-4 text-xl top-0 right-0"
              >課程</span
            >
          </div>
          <div class="lg:col-span-2 p-4 flex flex-col justify-between gap-3">
            <section class="grid gap-1">
              <h1
                class="truncate text-brand-02 text-2xl font-self font-black"
              >
                全手工紫砂壺
              </h1>
              <select
                name=""
                id=""
                class="border border-black w-full truncate py-1 px-2 cursor-pointer"
              >
                <option value="八角壺">八角壺</option>
                <option value="商品1">商品1</option>
                <option value="商品2">商品2</option>
              </select>
            </section>
            <div class="flex gap-1 lg:gap-3 flex-wrap items-center">
              <p>數量</p>
              <div class="border border-black flex">
                <button type="button" class="px-2 text-lg font-bold">-</button>
                <input
                  type="number"
                  min="0"
                  name=""
                  id=""
                  value="1"
                  class="border-x border-black w-full text-center"
                />
                <button type="button" class="px-2 text-lg font-bold">+</button>
              </div>
            </div>
            <div class="sm:flex flex-wrap justify-between">
              <div class="text-lg flex flex-wrap items-center gap-2">
                <p
                  class="line-through text-gray-02 text-base whitespace-nowrap"
                >
                  $ 79999999
                </p>
                <p class="whitespace-nowrap">$ 69999999</p>
              </div>
              <button
                type="button"
                class="btn-outline py-1 px-3 float-right mt-2 sm:mt-0"
              >
                刪除
              </button>
            </div>
          </div>
        </li>
        <li class="grid lg:grid-cols-3 bg-white hover:shadow-lg">
          <div class="w-full lg:h-full h-48 relative">
            <img
              src="../assets/最新活動01.png"
              alt=""
              class="w-full h-full object-cover"
            />
            <span
              class="absolute bg-brand-02 bg-opacity-60 text-white py-2 px-4 text-xl top-0 right-0"
              >課程</span
            >
          </div>
          <div class="lg:col-span-2 p-4 flex flex-col justify-between gap-3">
            <section class="grid gap-1">
              <h1
                class="truncate text-brand-02 text-2xl font-self font-black"
              >
                全手工紫砂壺
              </h1>
              <select
                name=""
                id=""
                class="border border-black w-full truncate py-1 px-2 cursor-pointer"
              >
                <option value="八角壺">八角壺</option>
                <option value="商品1">商品1</option>
                <option value="商品2">商品2</option>
              </select>
            </section>
            <div class="flex gap-1 lg:gap-3 flex-wrap items-center">
              <p>數量</p>
              <div class="border border-black flex">
                <button type="button" class="px-2 text-lg font-bold">-</button>
                <input
                  type="number"
                  min="0"
                  name=""
                  id=""
                  value="1"
                  class="border-x border-black w-full text-center"
                />
                <button type="button" class="px-2 text-lg font-bold">+</button>
              </div>
            </div>
            <div class="sm:flex flex-wrap justify-between">
              <div class="text-lg flex flex-wrap items-center gap-2">
                <p
                  class="line-through text-gray-02 text-base whitespace-nowrap"
                >
                  $ 79999999
                </p>
                <p class="whitespace-nowrap">$ 69999999</p>
              </div>
              <button
                type="button"
                class="btn-outline py-1 px-3 float-right mt-2 sm:mt-0"
              >
                刪除
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>
<script>
import TotalPrice from "../components/TotalPrice.vue";
export default {
  components: {
    TotalPrice,
  },
};
</script>
