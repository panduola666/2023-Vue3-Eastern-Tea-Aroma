<template>
  <main class="wrap" v-if="currentProduct">
    <p
      class="flex items-center justify-end text-gray-02 hover:text-gray-01"
      @click="() => this.$router.go(-1)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-4 h-4 mr-2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
        />
      </svg>
      返回搜尋
    </p>
    <h1 class="text-3xl font-black font-self text-brand-02 mb-5">
      {{ currentProduct.name }}
    </h1>
    <div
      class="grid lg:grid-cols-3 lg:grid-rows-1 grid-rows-2 grid-cols-1 gap-y-3 lg:gap-x-3"
    >
      <img
        :src="currentProduct.coverUrl"
        :alt="currentProduct.name"
        class="object-cover h-[250px] w-full"
      />
      <div class="col-span-2 flex flex-col gap-y-3 justify-between">
        <section class="flex flex-wrap items-center gap-3">
          <h2 class="text-3xl truncate">
            {{ currentProduct.name }}
          </h2>
          <p class="text-lg flex overflow-hidden pointer-events-none">
            <span
              class="bg-brand-02 border-2 border-brand-02 px-2 text-white flex-shrink-0"
            >
              {{ currentProduct.group }}</span
            ><span class="bg-white border-2 border-brand-02 px-2 truncate">{{
              currentProduct.type
            }}</span>
          </p>
        </section>
        <p
          class="flex flex-wrap gap-2 justify-between text-gray-02 items-center text-lg"
        >
          剩餘: {{ currentProduct.totalNumber - soldNumber }}
          <span class="text-2xl text-gray-01"
            >$ {{ productPrice(currentProduct.price) }}</span
          >
        </p>
        <div
          class="flex gap-3 justify-between lg:items-center lg:flex-row flex-col"
        >
          <div class="flex items-center h-10 lg:h-8">
            <button
              type="button"
              class="btn-outline py-0 px-2 md:px-4 focus:outline-0 flex-shrink-0 h-full"
              @click="
                () => (shoppingNumber > 1 ? shoppingNumber-- : shoppingNumber)
              "
            >
              <img src="../assets/Property 1=-.png" alt="" />
            </button>
            <p
              class="flex items-center justify-around px-2 border-y-2 border-brand-01 bg-opacity-40 bg-white min-w-[100px] w-full h-full"
            >
              {{ shoppingNumber }}
            </p>
            <button
              type="button"
              class="btn-outline py-0 px-2 md:px-4 focus:outline-0 flex-shrink-0 h-full"
              @click="
                () =>
                  shoppingNumber < currentProduct.totalNumber - soldNumber
                    ? shoppingNumber++
                    : ''
              "
            >
              <img src="../assets/Property 1=+.png" alt="" />
            </button>
          </div>
          <button
            type="button"
            class="btn-primary py-2 px-4 text-xl"
            :disabled="!(currentProduct.totalNumber - soldNumber)"
            @click="() => addToCart('products', currentProduct, shoppingNumber)"
          >
            {{
              currentProduct.totalNumber - soldNumber ? '加入購物車' : '已售完'
            }}
          </button>
        </div>
      </div>
    </div>
    <DiscountInfo v-if="currentProduct.isDiscount"></DiscountInfo>
    <article class="text-brand-05 text-lg font-medium grid gap-4 mt-10">
      <p class="text-2xl font-black font-self">介紹</p>
      <p v-html="currentProduct.content"></p>
    </article>
    <p class="text-xl text-gray-02 mt-10">瀏覽紀錄</p>
    <ul class="grid md:grid-cols-4 gap-3 mt-3">
      <template v-for="(id, index) in productsIdHistory()" :key="id + index">
        <template v-for="(product, index) in allProducts" :key="index">
          <li class="overflow-hidden opacity-80" v-if="product.id === +id">
            <router-link :to="`/product/${product.id}`" class="relative group">
              <img
                :src="product.coverUrl"
                :alt="product.name"
                class="w-full h-36 object-cover group-hover:scale-110 duration-1000"
              />
              <p
                class="absolute bg-[rgba(0,52,22,.5)] text-white bottom-0 left-0 right-0 p-2 font-self font-semibold text-lg truncate"
              >
                {{ product.name }}
              </p>
            </router-link>
          </li>
        </template>
      </template>
    </ul>
  </main>
</template>
<script>
import DiscountInfo from '../components/DiscountInfo.vue'
import { mapState, mapActions } from 'pinia'
import {
  productsStore,
  ordersStore,
  toThousand,
  userStore
} from '../stores/index.js'
export default {
  data() {
    return {
      shoppingNumber: 1
    }
  },
  computed: {
    ...mapState(userStore, ['isLogin']),
    ...mapState(productsStore, ['allProducts']),
    ...mapState(ordersStore, ['orders']),
    currentProduct() {
      const index = this.allProducts.findIndex(
        (product) => product.id === +this.$route.params.id
      )
      if (this.allProducts.length && index === -1) {
        this.notFound()
      }
      return this.allProducts[index]
    },
    soldNumber() {
      const totalProductsOrder = []
      this.orders.forEach((item) => {
        totalProductsOrder.push(item.cart)
      })
      let soldNumber = 0
      // console.log(totalProductsOrder);
      totalProductsOrder.forEach((cart) => {
        cart.forEach((order) => {
          console.log(order.productId)
          if (order.productId && order.productId === +this.$route.params.id) {
            soldNumber += order.number
          }
        })
      })
      return soldNumber
    }
  },
  methods: {
    ...mapActions(productsStore, ['getAllProducts']),
    ...mapActions(ordersStore, ['getOrdersData']),
    ...mapActions(userStore, ['addToCart']),
    notFound() {
      this.$swal
        .fire({
          icon: 'warning',
          title: '查無此產品',
          showConfirmButton: false,
          timer: 1500
        })
        .then(() => {
          this.$router.push('/404')
        })
    },
    productPrice(money) {
      return toThousand(money)
    },
    setProductsHistory(id) {
      if (localStorage.getItem('productsHistory')) {
        const historyArr = localStorage.getItem('productsHistory').split(',')
        if (!historyArr.includes(id)) {
          historyArr.unshift(id)
          if (historyArr.length > 4) historyArr.pop()
          localStorage.setItem('productsHistory', historyArr)
        } else {
          const index = historyArr.findIndex((item) => item === id)
          historyArr.splice(index, 1)
          historyArr.unshift(id)
          localStorage.setItem('productsHistory', historyArr)
        }
      } else {
        localStorage.setItem('productsHistory', id)
      }
    },
    historyData() {
      const ids = localStorage.getItem('productsHistory').split(',')
      const filterProducts = []
      this.allProducts.forEach((product) => {
        ids.forEach((id) => {
          if (product.id === +id) filterProducts.push(product)
        })
      })
      this.history = filterProducts
    },
    productsIdHistory() {
      return localStorage.getItem('productsHistory').split(',')
    }
  },
  watch: {
    '$route.params.id'(id) {
      const index = this.allProducts.findIndex((product) => product.id === +id)
      if (index !== -1) {
        this.setProductsHistory(id)
      }
    }
  },
  components: {
    DiscountInfo
  },
  mounted() {
    this.getAllProducts()
    this.getOrdersData()
    this.setProductsHistory(this.$route.params.id)
  }
}
</script>
