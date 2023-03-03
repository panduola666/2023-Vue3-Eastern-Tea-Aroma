<template>
  <main class="wrap grid lg:grid-cols-5 gap-4">
    <teleport to="title"> - 茶藝用品</teleport>
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
          @click="() => (currentChoose = '')"
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
          :value="index"
          class="absolute opacity-0"
        />
        <label
          :for="item + index"
          :class="{ 'bg-brand-01 bg-opacity-30': currentChoose === index }"
          @click="() => (currentChoose = index)"
          class="block w-full h-full p-4 hover:bg-brand-01 hover:bg-opacity-30 cursor-pointer"
          >{{ index }}</label
        >
      </li>
    </ol>
    <div class="lg:col-span-4">
      <section class="flex justify-between">
        <h2 class="text-2xl text-brand-05 font-black font-self">
          茶藝用品 / {{ chooseType }}
        </h2>
        <p class="text-lg text-gray-02">第 {{ this.$route.query.page }} 頁</p>
      </section>
      <ul class="grid md:grid-cols-2 gap-3 my-5">
        <li
          class="h-72 group relative overflow-hidden"
          v-for="product in products"
          :key="product.id"
        >
          <router-link :to="`/product/${product.id}`">
            <img
              :src="product.coverUrl"
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-110 duration-1000"
            />
            <h1
              class="truncate bg-[rgba(0,52,22,.6)] absolute bottom-0 right-0 left-0 py-4 px-5 text-white text-xl font-self font-black"
            >
              {{ product.name }}
            </h1>
          </router-link>
        </li>
      </ul>
      <p
        class="flex gap-4 items-center justify-center"
        v-if="this.$route.query.search"
      >
        <button
          type="button"
          class="btn-outline py-2"
          @click="() => changePages('pre', currentProducts)"
        >
          上一頁
        </button>
        第 {{ this.$route.query.page }} /
        {{ Math.ceil(currentProducts.length / this.limit) }} 頁
        <button
          type="button"
          class="btn-outline py-2"
          @click="() => changePages('next', currentProducts)"
        >
          下一頁
        </button>
      </p>
      <p class="flex gap-4 items-center justify-center" v-else>
        <button
          type="button"
          class="btn-outline py-2"
          @click="() => changePages('pre', allProducts)"
        >
          上一頁
        </button>
        第 {{ this.$route.query.page }} /
        {{ Math.ceil(allProducts.length / this.limit) }} 頁
        <button
          type="button"
          class="btn-outline py-2"
          @click="() => changePages('next', allProducts)"
        >
          下一頁
        </button>
      </p>
    </div>
  </main>
</template>
<script>
import { productsStore } from '../stores/index.js'
import { mapState, mapActions } from 'pinia'
export default {
  data() {
    return {
      chooseType: '',
      currentChoose: '',
      limit: 6 // 控制一頁顯示幾個
    }
  },
  computed: {
    ...mapState(productsStore, ['products', 'allProducts', 'productTypes']),
    currentProducts() {
      return this.allProducts.filter((product) => {
        if (this.currentChoose) {
          return product.group === this.currentChoose
        } else {
          return product
        }
      })
    }
  },
  methods: {
    ...mapActions(productsStore, ['getProductsData', 'getAllProducts']),
    changePages(config, data) {
      if (
        config === 'pre' &&
        +this.$route.query.page <= Math.ceil(data.length / this.limit) &&
        +this.$route.query.page !== 1
      ) {
        this.$router.push(
          `/shoppingMall?page=${+this.$route.query.page - 1}&search=${
            this.$route.query.search
          }`
        )
      } else if (
        config === 'next' &&
        this.$route.query.page < Math.ceil(data.length / this.limit)
      ) {
        this.$router.push(
          `/shoppingMall?page=${+this.$route.query.page + 1}&search=${
            this.$route.query.search
          }`
        )
      }
    }
  },
  watch: {
    '$route.query.page'(page) {
      this.getProductsData(
        this.currentChoose,
        this.$route.query.search
          ? `&_page=${page}&_limit=${this.limit}`
          : `?_page=${page}&_limit=${this.limit}`
      )
    },
    currentChoose() {
      this.$router.push(`/shoppingMall?page=1&search=${this.currentChoose}`)
      this.getProductsData(
        this.currentChoose,
        this.currentChoose
          ? `&_page=1&_limit=${this.limit}`
          : `?_page=1&_limit=${this.limit}`
      )
    }
  },
  mounted() {
    const { page, search } = this.$route.query
    this.getAllProducts()
    this.getProductsData(
      search,
      search
        ? `&_page=${page}&_limit=${this.limit}`
        : `?_page=${page}&_limit=${this.limit}`
    )
    this.currentChoose = search
  }
}
</script>
