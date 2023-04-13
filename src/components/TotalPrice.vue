<template>
  <div
    class="bg-brand-06 flex flex-col lg:flex-row lg:items-center justify-between px-4 py-10 gap-3"
  >
    <div>
      <p>共 2 件商品</p>
      <div class="flex flex-wrap gap-x-2">
        <p class="text-gray-01 flex flex-wrap gap-x-2">
          折扣碼
          <span
            class="underline underline-offset-2 cursor-pointer hover:text-brand-02 hover:font-bold"
            @click="inputPrompt"
            v-if="user.shoppingCart?.discount"
            >{{ user.shoppingCart?.discount }}</span
          >
          <span
            v-else
            class="underline underline-offset-2 cursor-pointer hover:text-brand-02 hover:font-bold"
            @click="inputPrompt"
            >{{ !discount ? '輸入折扣碼' : discount }}</span
          >
        </p>
        <p
          v-if="discount && discount !== discountData.code"
          class="text-red-500 font-bold flex items-center left-0 top-full whitespace-nowrap"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          折扣碼不存在
        </p>
        <p
          v-if="
            discount === discountData.code && discountData.end <= new Date()
          "
          class="text-red-500 font-bold flex items-center left-0 top-full whitespace-nowrap"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          折扣碼已過期
        </p>
      </div>
    </div>
    <div>
      <p class="flex flex-wrap gap-x-2 items-center">
        總計
        <span
          v-if="
            discount !== discountData.code || discountData.end <= new Date()
          "
        >
          $ {{ toThousand(totalPrice) }}
        </span>
        <span v-else-if="!hasDiscount"> $ {{ toThousand(totalPrice) }} </span>
        <span v-else>
          <del class="text-base text-gray-01"
            >$ {{ toThousand(totalPrice) }}</del
          ><span class="text-xl">$ {{ toThousand(discountPrice) }}</span></span
        >
      </p>
      <p
        class="text-gray-01"
        v-if="discount === discountData.code && discountData.end > new Date()"
      >
        已節省 {{ toThousand(totalPrice - discountPrice) }} 元
      </p>
    </div>
    <div>
      <slot>按鈕 </slot>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia'
import { discountStore, userStore, toThousand } from '../stores/index.js'
export default {
  data() {
    return {
      discount: ''
    }
  },
  computed: {
    ...mapState(userStore, ['user']),
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
    discountPrice() {
      const discountProducts = this.user.shoppingCart?.cart.products.reduce(
        (price, product) => {
          if (product.isDiscount) {
            if (this.discountData.type === 'money') {
              price += product.totalPrice - this.discountData.scale
            } else {
              price += Math.round(product.totalPrice * this.discountData.scale)
            }
          } else {
            price += product.totalPrice
          }
          return price
        },
        0
      )
      const discountCourses = this.user.shoppingCart.cart.courses.reduce(
        (price, course) => {
          if (course.isDiscount) {
            if (this.discountData.type === 'money') {
              price += course.totalPrice - this.discountData.scale
            } else {
              price += Math.round(course.totalPrice * this.discountData.scale)
            }
          } else {
            price += course.totalPrice
          }
          return price
        },
        0
      )
      return discountProducts + discountCourses
    },
    hasDiscount() {
      let flag = false
      this.user.shoppingCart?.cart.products?.forEach((item) => {
        console.log(item)
        flag = item.isDiscount ? true : ''
      })
      this.user.shoppingCart?.cart.courses?.forEach((item) =>
        item.isDiscount ? (flag = true) : ''
      )
      return flag
    }
  },
  methods: {
    ...mapActions(discountStore, ['getDiscountData']),
    inputPrompt() {
      this.$swal({
        titleText: '請輸入折扣碼代號',
        input: 'text',
        inputValue: '',
        showCancelButton: true,
        inputValidator: (value) => {
          this.discount = value
          this.user.shoppingCart.discount = value
        }
      })
    },
    toThousand
  },
  mounted() {
    this.getDiscountData()
    this.discount = this.user.shoppingCart?.discount
  }
}
</script>
