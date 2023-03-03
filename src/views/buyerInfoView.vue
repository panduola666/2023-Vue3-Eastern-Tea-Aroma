<template>
  <main>
    <div class="wrap">
      <h1 class="text-3xl font-black font-self text-brand-02">購買人資訊</h1>
      <VForm
        action=""
        class="flex flex-col text-lg form"
        v-slot="{ errors }"
        @submit="checkout"
        @invalid-submit="onInvalidSubmit"
      >
        <label
          for="name"
          class="text-xl text-brand-02 font-self font-semibold mt-4"
          >購買人</label
        >
        <VField
          type="text"
          name="姓名"
          id="name"
          class="px-2 py-1"
          placeholder="請輸入姓名..."
          rules="required"
          v-model="buyerInfo.name"
        />
        <VErrorMessage name="姓名" class="text-red-600"></VErrorMessage>
        <label
          for="tel"
          class="text-xl text-brand-02 font-self font-semibold mt-4"
          >手機號碼</label
        >
        <VField
          type="tel"
          name="手機號碼"
          id="tel"
          class="px-2 py-1"
          placeholder="請輸入手機號碼..."
          rules="required|numeric"
          v-model="buyerInfo.tel"
        />
        <VErrorMessage name="手機號碼" class="text-red-600"></VErrorMessage>
        <p class="text-xl text-brand-02 font-self font-semibold mt-4">
          取貨方式
        </p>
        <label
          for="selfPickUp"
          class="cursor-pointer hover:bg-brand-03 hover:bg-opacity-30"
          ><VField
            type="radio"
            name="取貨方式"
            id="selfPickUp"
            value="自取"
            v-model="buyerInfo.method"
            rules="required"
          />自取</label
        >
        <label
          for="storeShipping"
          class="cursor-pointer hover:bg-brand-03 hover:bg-opacity-30"
          ><VField
            type="radio"
            name="取貨方式"
            id="storeShipping"
            value="店家寄件"
          />
          店家寄件
          <span class="text-gray-02">(運費 100 元，滿 999 即享免運優惠)</span>
        </label>
        <VErrorMessage name="取貨方式" class="text-red-600"></VErrorMessage>
        <form-box v-if="buyerInfo.method === '店家寄件'">
          <label for="address">地址</label>
          <VField
            name="地址"
            id="address"
            type="text"
            class="px-2 py-1"
            placeholder="請輸入寄件地址..."
            rules="required"
            v-model="buyerInfo.address"
          />
          <VErrorMessage name="地址" class="text-red-600"></VErrorMessage>
        </form-box>
        <p class="text-xl text-brand-02 font-self font-semibold mt-4">
          付款方式
        </p>
        <label
          for="cashOnDelivery"
          class="cursor-pointer hover:bg-brand-03 hover:bg-opacity-30"
          ><VField
            type="radio"
            name="付款方式"
            id="cashOnDelivery"
            v-model="buyerInfo.payMethods.choose"
            value="貨到付款"
            rules="required"
          />貨到付款</label
        >
        <label
          for="creditCard"
          class="cursor-pointer hover:bg-brand-03 hover:bg-opacity-30"
          ><VField
            type="radio"
            name="付款方式"
            id="creditCard"
            value="信用卡"
          />信用卡</label
        >
        <VErrorMessage name="付款方式" class="text-red-600"></VErrorMessage>
        <form-box v-if="buyerInfo.payMethods.choose === '信用卡'">
          <label for="cardNumber">卡號</label>
          <VField
            type="number"
            name="卡號"
            id="cardNumber"
            class="px-2 py-1"
            placeholder="請輸入卡號..."
            rules="required|numeric"
            v-model="buyerInfo.payMethods.cardNumber"
            onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
          />
          <VErrorMessage name="卡號" class="text-red-600"></VErrorMessage>
          <div class="flex flex-col md:flex-row">
            <div class="flex flex-col md:block">
              <p class="mt-3 md:mt-0">效期</p>
              <label for="day"
                >日期<VField
                  type="number"
                  name="日期"
                  id="day"
                  class="md:w-1/3 w-full px-2 py-1 ml-1"
                  placeholder="DD"
                  rules="required|numeric|length:2"
                  v-model="buyerInfo.payMethods.cardTime[0]"
                  onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
              /></label>
              <span class="mx-2 hidden md:inline-block">/</span>
              <label for="month"
                >月份<VField
                  type="number"
                  name="月份"
                  id="month"
                  class="md:w-1/3 w-full px-2 py-1 ml-1"
                  placeholder="MM"
                  rules="required|numeric|length:2"
                  v-model="buyerInfo.payMethods.cardTime[1]"
                  onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
              /></label>
              <p>
                <VErrorMessage name="日期" class="text-red-600"></VErrorMessage>
                <VErrorMessage
                  name="月份"
                  class="text-red-600"
                  v-if="!errors['日期']"
                ></VErrorMessage>
              </p>
            </div>
            <div class="mt-3 md:mt-0">
              <label for="cardCode">安全碼</label>
              <VField
                name="安全碼"
                id="cardCode"
                type="number"
                class="w-full px-2 py-1"
                placeholder="請輸入安全碼..."
                v-model="buyerInfo.payMethods.cardCode"
                onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
                rules="required|numeric|length:3"
              />
              <VErrorMessage name="安全碼" class="text-red-600"></VErrorMessage>
            </div>
          </div>
        </form-box>
        <total-price class="mt-10">
          <template #default>
            <button type="submit" class="btn-primary w-full">結帳</button>
          </template>
        </total-price>
      </VForm>
    </div>
  </main>
</template>
<script>
import { mapActions, mapState } from 'pinia'
import TotalPrice from '../components/TotalPrice.vue'
import FormBox from '../components/FormBox.vue'
import {
  userStore,
  discountStore,
  coursesStore,
  productsStore
} from '../stores/index'

const { VITE_BASEURL } = import.meta.env
export default {
  data() {
    return {
      buyerInfo: {
        name: '',
        tel: '',
        method: '自取',
        address: '',
        payMethods: {
          choose: '貨到付款',
          cardNumber: '',
          cardTime: ['', ''],
          cardCode: ''
        }
      }
    }
  },
  computed: {
    ...mapState(userStore, ['user']),
    ...mapState(discountStore, ['discountData']),
    ...mapState(coursesStore, ['courses']),
    ...mapState(productsStore, ['allProducts'])
  },
  methods: {
    ...mapActions(coursesStore, ['getCoursesData']),
    ...mapActions(productsStore, ['getAllProducts']),
    // 點擊按鈕後把 discount 值傳到 pinia
    checkout() {
      // 結帳
      const { cart } = this.user.shoppingCart
      const { discount } = this.user.shoppingCart
      const { code, type, scale,end } = this.discountData
      const orderCart = []
      const orderDiscount = { code: '', type: '', scale: '' }
      this.allProducts.forEach((product) => {
        cart.products.forEach((item) => {
          if (item.productId === product.id) {
            const data = {
              type: product.type,
              name: product.name,
              price: item.price,
              number: item.number,
              totalPrice: item.totalPrice,
              isDiscount: item.isDiscount,
              productId: item.productId
            }
            orderCart.push(data)
          }
        })
      })
      this.courses.forEach((course) => {
        course.courseDates.forEach((date) => {
          cart.courses.forEach((item) => {
            if (item.courseDateId === date.id && item.courseId === course.id) {
              const data = {
                name: course.title,
                start: date.start,
                end: date.end,
                price: item.price,
                number: item.number,
                totalPrice: item.totalPrice,
                isDiscount: item.isDiscount,
                courseDateId: item.courseDateId
              }
              orderCart.push(data)
            }
          })
        })
      })
      if (!orderCart.length) {
        this.$swal
          .fire({
            icon: 'error',
            title: '購物車沒有商品',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: '來去選購'
          })
          .then((res) => {
            if (res.isConfirmed) {
              this.$router.push('/courses')
            }
            if (res.isDismissed) {
              this.$router.push('/')
            }
          })
        return
      }
      if (discount === code && end > new Date()) {
        orderDiscount.code = code
        orderDiscount.type = type
        orderDiscount.scale = scale
      }
      const data = {
        userId: +sessionStorage.getItem('userId'),
        buyerInfo: this.buyerInfo,
        discount: orderDiscount,
        cart: orderCart,
        trackingNumber: '',
        created: new Date().getTime()
      }
      cart.products.length = 0
      cart.courses.length = 0
      const { shoppingCart } = this.user
      shoppingCart.discount = ''
      this.$http
        .post(`${VITE_BASEURL}/orders`, data)
        .then((res) => {
          this.buyerInfo = this.$options.data().buyerInfo
          return this.$http.patch(
            `${VITE_BASEURL}/users/${sessionStorage.getItem('userId')}`,
            { shoppingCart }
          )
        })
        .then(() => {
          return this.$swal.fire({
            icon: 'success',
            title: '訂單已成立',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .then((res) => {
          if (res.isDismissed) this.$router.push('/')
        })
    },
    onInvalidSubmit({ errors }) {
      const firstError = Object.keys(errors)[0]
      document.querySelector('.form')[firstError].focus()
    }
  },
  components: {
    TotalPrice,
    FormBox
  },
  mounted() {
    this.getCoursesData()
    this.getAllProducts()
  }
}
</script>
<style></style>
