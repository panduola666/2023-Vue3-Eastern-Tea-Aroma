<template>
  <main>
    <div class="wrap">
      <h2 class="text-3xl font-black font-self text-brand-02">購買商品</h2>
      <TotalPrice v-if="cartNumber">
        <template #default>
          <router-link :to="{ name: 'buyerInfo' }" class="btn-primary block"
            >確認購買</router-link
          >
        </template>
      </TotalPrice>
      <button type="button" class="btn-outline mb-4" v-if="cartNumber">清空購物車</button>
      <div class="flex items-center gap-3" v-if="!cartNumber">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3648/3648756.png"
          alt="購物車沒有商品"
        />
        <div class="flex-grow text-center">
          <p class="text-4xl mb-3">購物車沒有商品</p>
          <router-link to="/courses" class="btn-primary inline-block text-xl"
            >來去選購</router-link
          >
        </div>
      </div>
      <ul class="grid gap-5 mt-4" v-else>
        <template
          v-for="product in allProducts"
          :key="product.id + product.name"
        >
          <template
            v-for="item in user.shoppingCart?.cart.products"
            :key="'產品' + item.productId"
          >
            <li
              class="grid lg:grid-cols-3 bg-white relative"
              v-if="product.id === item.productId"
            >
              <span
                class="bg-brand-02 text-white px-3 py-1 absolute z-10"
                v-if="item.isDiscount"
                >優惠</span
              >
              <img
                :src="product.coverUrl"
                :alt="product.name"
                class="w-full lg:h-[200px] h-48 object-cover"
              />
              <div
                class="lg:col-span-2 p-4 flex flex-col justify-between gap-3"
              >
                <h1>
                  <router-link
                    :to="`/product/${product.id}`"
                    class="truncate text-brand-02 underline hover:text-brand-01 text-2xl font-self font-black"
                  >
                    {{ product.name }}
                  </router-link>
                </h1>
                <div class="flex gap-5 flex-wrap items-center">
                  <label :for="product.name + 'productNumber'">數量</label>
                  <select
                    :name="product.name + 'productNumber'"
                    :id="product.name + 'productNumber'"
                    class="border border-black lg:w-1/4 w-1/2"
                    :value="item.number"
                    @change="($event) => changeNumber($event, item)"
                  >
                    <option :value="i" v-for="i in 20" :key="i">
                      {{ i }}
                    </option>
                  </select>
                </div>
                <div class="sm:flex flex-wrap items-center justify-between">
                  <div
                    class="flex items-center"
                    v-if="
                      product.isDiscount &&
                      discountData.end > new Date() &&
                      this.user.shoppingCart?.discount === discountData.code
                    "
                  >
                    <del class="text-gray-02 mr-3"
                      >$ {{ toThousand(item.number * item.price) }}</del
                    >
                    <p v-if="discountData.type === 'money'">
                      $
                      {{
                        toThousand(
                          item.number * item.price - discountData.scale
                        )
                      }}
                    </p>
                    <p v-else>
                      $
                      {{
                        toThousand(
                          item.number * item.price * discountData.scale
                        )
                      }}
                    </p>
                  </div>
                  <p
                    v-else
                    class="text-lg flex flex-wrap items-center gap-2 whitespace-nowrap"
                  >
                    $ {{ toThousand(item.number * item.price) }}
                  </p>

                  <button
                    type="button"
                    class="btn-outline py-1 px-3 float-right mt-2 sm:mt-0"
                    @click="
                      () => deleteCart('product', item.productId, product.name)
                    "
                  >
                    刪除
                  </button>
                </div>
              </div>
            </li>
          </template>
        </template>
        <template v-for="course in courses" :key="course.id + course.title">
          <template v-for="date in course.courseDates" :key="date.id + 'date'">
            <template
              v-for="item in user.shoppingCart?.cart.courses"
              :key="'課程' + item.courseDateId"
            >
              <li
                v-if="
                  course.id === item.courseId && date.id === item.courseDateId
                "
                class="grid lg:grid-cols-3 bg-white relative"
              >
                <span
                  class="bg-brand-02 text-white px-3 py-1 absolute z-10"
                  v-if="item.isDiscount"
                  >優惠</span
                >
                <div class="w-full lg:h-[200px] h-48 relative">
                  <img
                    :src="course.coverUrl"
                    :alt="course.title"
                    class="w-full h-full object-cover"
                  />
                  <span
                    class="absolute bg-brand-02 bg-opacity-60 text-white py-2 px-4 text-xl top-0 right-0"
                    >課程
                  </span>
                </div>
                <div
                  class="lg:col-span-2 p-4 flex flex-col justify-between gap-3"
                >
                  <h1>
                    <router-link
                      :to="`/course/${date.id}`"
                      class="truncate text-brand-02 underline hover:text-brand-01 text-2xl font-self font-black"
                    >
                      {{ course.title }}
                    </router-link>
                  </h1>
                  <p class="text-lg">
                    時間：{{ $date(date.start).format('YYYY-MM-DD HH:mm') }} ~
                    {{ $date(date.end).format('HH:mm') }}
                  </p>
                  <div class="flex gap-5 flex-wrap items-center">
                    <label :for="course.title + 'courseNumber'">數量</label>
                    <select
                      :name="course.title + 'courseNumber'"
                      :id="course.title + 'courseNumber'"
                      class="border border-black lg:w-1/4 w-1/2"
                      :value="item.number"
                      @change="($event) => changeNumber($event, item)"
                    >
                      <option :value="i" v-for="i in 20" :key="i">
                        {{ i }}
                      </option>
                    </select>
                  </div>
                  <div class="sm:flex flex-wrap justify-between">
                    <div
                      class="flex items-center"
                      v-if="
                        date.isDiscount &&
                        discountData.end > new Date() &&
                        this.user.shoppingCart?.discount === discountData.code
                      "
                    >
                      <del class="text-gray-02 mr-3"
                        >$ {{ toThousand(item.number * item.price) }}</del
                      >
                      <p v-if="discountData.type === 'money'">
                        $
                        {{
                          toThousand(
                            item.number * item.price - discountData.scale
                          )
                        }}
                      </p>
                      <p v-else>
                        $
                        {{
                          toThousand(
                            item.number * item.price * discountData.scale
                          )
                        }}
                      </p>
                    </div>
                    <p
                      v-else
                      class="text-lg flex flex-wrap items-center gap-2 whitespace-nowrap"
                    >
                      $ {{ toThousand(item.number * item.price) }}
                    </p>
                    <button
                      type="button"
                      class="btn-outline py-1 px-3 float-right mt-2 sm:mt-0"
                      @click="
                        () =>
                          deleteCart('course', item.courseDateId, course.title)
                      "
                    >
                      刪除
                    </button>
                  </div>
                </div>
              </li>
            </template>
          </template>
        </template>
      </ul>
    </div>
  </main>
</template>
<script>
import TotalPrice from '../components/TotalPrice.vue'
import { mapState, mapActions } from 'pinia'
import {
  userStore,
  productsStore,
  coursesStore,
  discountStore,
  toThousand
} from '../stores/index.js'
const { VITE_BASEURL } = import.meta.env

export default {
  computed: {
    ...mapState(userStore, ['user']),
    ...mapState(productsStore, ['allProducts']),
    ...mapState(coursesStore, ['courses']),
    ...mapState(discountStore, ['discountData']),
    totalPrice() {
      const productsTotal = this.user.shoppingCart?.cart.products.reduce(
        (num, product) => (num += product.totalPrice),
        0
      )
      const coursesTotal = this.user.shoppingCart?.cart.courses.reduce(
        (num, course) => (num += course.totalPrice),
        0
      )
      return productsTotal + coursesTotal
    },
    cartNumber() {
      return (
        this.user.shoppingCart?.cart.products.length +
        this.user.shoppingCart?.cart.courses.length
      )
    }
  },
  methods: {
    ...mapActions(userStore, ['getUserData']),
    ...mapActions(productsStore, ['getAllProducts']),
    ...mapActions(coursesStore, ['getCoursesData']),
    toThousand,
    patchCartAJAX(shoppingCart) {
      this.$http
        .patch(`${VITE_BASEURL}/users/${sessionStorage.getItem('userId')}`, {
          shoppingCart
        })
        .then(() => {
          this.$swal.fire({
            icon: 'success',
            title: '修改成功',
            showConfirmButton: false,
            timer: 1500,
            allowOutsideClick: false
          })
        })
    },
    changeNumber(e, item) {
      item.number = +e.target.value
      item.totalPrice = item.number * item.price
      this.patchCartAJAX(this.user.shoppingCart)
    },
    deleteCart(config, id, name) {
      const { cart } = this.user.shoppingCart
      this.$swal
        .fire({
          html: `<p class="text-lg">是否刪除 <span class="text-brand-01 text-xl font-bold">${name}</span> ?</p>`,
          showCancelButton: true,
          reverseButtons: true
        })
        .then((res) => {
          if (res.isConfirmed) {
            if (config === 'product') {
              const index = cart.products.findIndex(
                (item) => item.productId === id
              )
              cart.products.splice(index, 1)
            }
            if (config === 'course') {
              const index = cart.courses.findIndex(
                (item) => item.courseDateId === id
              )
              cart.courses.splice(index, 1)
            }
            this.patchCartAJAX(this.user.shoppingCart)
          }
        })
    }
  },
  mounted() {
    this.getUserData()
    this.getAllProducts()
    this.getCoursesData()
    console.log(this.isLogin)
  },
  components: {
    TotalPrice
  }
}
</script>
