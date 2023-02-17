<template>
  <main class="wrap">
    <h1 class="text-3xl font-black font-self text-brand-02">高山烏龍</h1>
    <div
      class="grid lg:grid-cols-3 lg:grid-rows-1 grid-rows-2 grid-cols-1 gap-y-3 lg:gap-x-3"
    >
      <img
        src="../assets/BANNER-2.png"
        alt=""
        class="h-full object-cover min-h-[250px] w-full"
      />
      <div class="col-span-2 flex flex-col gap-y-3 justify-between">
        <div class="grid grid-cols-3 gap-3">
          <label
            for=""
            class="btn-primary p-1 relative text-center cursor-pointer"
          >
            <input
              type="radio"
              name="productChoose"
              id=""
              class="absolute opacity-0"
            />
            阿里山烏龍茶
          </label>
          <label
            for=""
            class="btn-outline p-1 relative text-center cursor-pointer"
          >
            <input
              type="radio"
              name="productChoose"
              id=""
              class="absolute opacity-0"
            />
            阿里山烏龍茶
          </label>
          <label
            for=""
            class="btn-outline p-1 relative text-center cursor-pointer"
          >
            <input
              type="radio"
              name="productChoose"
              id=""
              class="absolute opacity-0"
            />
            阿里山烏龍茶
          </label>
          <label
            for=""
            class="btn-outline p-1 relative text-center cursor-pointer"
          >
            <input
              type="radio"
              name="productChoose"
              id=""
              class="absolute opacity-0"
            />
            阿里山烏龍茶
          </label>
          <label
            for=""
            class="btn-outline p-1 relative text-center cursor-pointer"
          >
            <input
              type="radio"
              name="productChoose"
              id=""
              class="absolute opacity-0"
            />
            阿里山烏龍茶
          </label>
          <label
            for=""
            class="btn-outline p-1 relative text-center cursor-pointer"
          >
            <input
              type="radio"
              name="productChoose"
              id=""
              class="absolute opacity-0"
            />
            阿里山烏龍茶
          </label>
          <label
            for=""
            class="btn-outline p-1 relative text-center cursor-pointer"
          >
            <input
              type="radio"
              name="productChoose"
              id=""
              class="absolute opacity-0"
            />
            阿里山烏龍茶
          </label>
        </div>
        <p
          class="flex flex-wrap gap-2 justify-between text-gray-02 items-center"
        >
          剩餘: 51 <span class="text-2xl text-gray-01">$ 500</span>
        </p>
        <div
          class="flex gap-3 justify-between lg:items-center lg:flex-row flex-col"
        >
          <div class="flex items-center h-10 lg:h-8">
            <button
              type="button"
              class="btn-outline py-0 px-2 md:px-4 focus:outline-0 flex-shrink-0 h-full"
            >
              <img src="../assets/Property 1=-.png" alt="" />
            </button>
            <input
              type="number"
              name=""
              id=""
              value="1"
              min="1"
              class="border-y-2 border-brand-01 text-center bg-opacity-40 bg-white w-full h-full"
            />
            <button
              type="button"
              class="btn-outline py-0 px-2 md:px-4 focus:outline-0 flex-shrink-0 h-full"
            >
              <img src="../assets/Property 1=+.png" alt="" />
            </button>
          </div>
          <button type="button" class="btn-primary py-2 px-4">
            加入購物車
          </button>
        </div>
      </div>
    </div>
    <p
      class="bg-brand-03 bg-opacity-20 px-5 py-8 text-xl text-gray-01 mt-5 font-self"
    >
      當前商品享活動優惠：全面
      <span class="text-2xl font-black">95 折</span>，優惠碼：<span
        >Tea231</span
      >
    </p>
    <article class="text-brand-05 text-lg font-medium grid gap-4 mt-10">
      <p class="text-2xl font-black font-self">介紹</p>
      <p>
        高山烏龍茶，泛指種植、製造於海拔1000公尺以上茶區之茶葉，因高山茶葉生長較慢、茶葉中的苦澀成份降低，口感也會比較圓潤，近年來取代平地烏龍茶，高山烏龍茶漸漸成為台灣茶的主流。
      </p>
      <p>
        高山烏龍茶會受到歡迎，主要是因其口感清新、甘甜。因種於高山，茶葉生長慢，導致茶葉中的苦澀成份少、甜度高。此外不同產區的高山茶葉，會有其獨特的「山頭韻」，也就是不同山頭生產的茶葉會有不同的味道，這也是高山烏龍茶受歡迎的主因。
      </p>
    </article>
    <p class="text-xl text-gray-02 mt-10">瀏覽紀錄</p>
    <ul class="grid md:grid-cols-4 gap-3 mt-3">
      <li class="overflow-hidden opacity-80">
        <router-link to="" class="relative group">
          <img
            src="../assets/課堂02.png"
            alt=""
            class="w-full h-36 object-cover group-hover:scale-110 duration-1000"
          />
          <p
            class="absolute bg-[rgba(0,52,22,.5)] text-white bottom-0 left-0 right-0 p-2 font-self font-semibold text-lg truncate"
          >
            小金桔普洱茶
          </p>
        </router-link>
      </li>
      <li class="overflow-hidden opacity-80">
        <router-link to="" class="relative group">
          <img
            src="../assets/課堂02.png"
            alt=""
            class="w-full h-36 object-cover group-hover:scale-110 duration-1000"
          />
          <p
            class="absolute bg-[rgba(0,52,22,.5)] text-white bottom-0 left-0 right-0 p-2 font-self font-semibold text-lg truncate"
          >
            小金桔普洱茶
          </p>
        </router-link>
      </li>
      <li class="overflow-hidden opacity-80">
        <router-link to="" class="relative group">
          <img
            src="../assets/課堂02.png"
            alt=""
            class="w-full h-36 object-cover group-hover:scale-110 duration-1000"
          />
          <p
            class="absolute bg-[rgba(0,52,22,.5)] text-white bottom-0 left-0 right-0 p-2 font-self font-semibold text-lg truncate"
          >
            小金桔普洱茶
          </p>
        </router-link>
      </li>
      <li class="overflow-hidden opacity-80">
        <router-link to="" class="relative group">
          <img
            src="../assets/課堂02.png"
            alt=""
            class="w-full h-36 object-cover group-hover:scale-110 duration-1000"
          />
          <p
            class="absolute bg-[rgba(0,52,22,.5)] text-white bottom-0 left-0 right-0 p-2 font-self font-semibold text-lg truncate"
          >
            小金桔普洱茶
          </p>
        </router-link>
      </li>
    </ul>
  </main>
</template>
