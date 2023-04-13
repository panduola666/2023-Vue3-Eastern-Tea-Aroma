<template>
  <div>
    <div
      class="flex lg:flex-row flex-col gap-5 justify-between lg:items-center"
    >
      <div
        class="w-full flex lg:flex-row flex-col lg:items-center items-start lg:gap-3"
      >
        <label for="productType" class="flex-shrink-0">商品分類</label>
        <select
          name="productType"
          id="productType"
          class="py-2 shadow flex-grow w-full"
          aria-label="請選擇商品分類"
          v-model="filterProductChoose"
        >
          <option value="" selected>全部</option>
          <option
            :value="group"
            v-for="(groupNumber, group) in productGroups"
            :key="group + groupNumber"
          >
            {{ group }}
          </option>
        </select>
      </div>

      <div class="flex-shrink-0 flex justify-end gap-3">
        <button
          type="button"
          class="btn-outline py-2"
          @click="allDiscount"
          :disabled="isAllDiscount"
        >
          全部套用
        </button>
        <PostProductsModal
          :is-new="true"
          :product-groups="productGroups"
          :product-types="productTypes"
        >
          <template #btn-content>
            <button type="button" class="btn-primary lg:px-10">新增商品</button>
          </template>
        </PostProductsModal>
      </div>
    </div>
    <ul class="grid gap-3 mt-3">
      <li
        is="vue:CoursesCard"
        v-for="product in filterProductChoose
          ? allProducts.filter((item) => item.group === filterProductChoose)
          : allProducts"
        :key="product.id"
      >
        <template #image>
          <img
            :src="product.coverUrl"
            :alt="product.name"
            class="w-full h-full object-cover"
          />
        </template>
        <template #card-header>
          <section
            class="w-full flex flex-col lg:flex-row lg:justify-between gap-3"
          >
            <h2 class="lg:w-4/5 overflow-hidden truncate">
              {{ product.name }}
            </h2>
            <DiscountToggle
              :id="product.id"
              :price="
                discountData.type === 'money'
                  ? product.price - discountData.scale
                  : Math.round(product.price * discountData.scale)
              "
              v-model:is-discount="product.isDiscount"
              which="products"
              class="text-sm self-end lg:self-center mb-1 lg:mb-0"
            ></DiscountToggle>
          </section>
        </template>
        <template #card-body>
          <p>分類：{{ product.group }}</p>
          <p>系列：{{ product.type }}</p>
          <p class="flex justify-between items-center text-lg">
            單價：$ {{ toThousand(product.price) }}
            <span class="text-sm text-gray-02"
              >剩餘：{{ product.totalNumber - sellNumber(product) }}</span
            >
          </p>
        </template>
        <template #card-footer>
          <button
            type="button"
            class="btn-outline py-2"
            @click="() => deleteProduct(product.id)"
          >
            刪除
          </button>
          <PostProductsModal
            :product-data="currentProduct"
            :product-groups="productGroups"
            :product-types="productTypes"
          >
            <template #btn-content>
              <button
                type="button"
                class="btn-outline py-2"
                @click="() => (currentProduct = product)"
              >
                編輯
              </button>
            </template>
          </PostProductsModal>
        </template>
      </li>
    </ul>
  </div>
</template>
<script>
import PostProductsModal from '@/components/PostProductsModal.vue'
import CoursesCard from '@/components/CoursesCard.vue'
import DiscountToggle from '@/components/DiscountToggle.vue'
import { mapState, mapActions } from 'pinia'
import {
  productsStore,
  ordersStore,
  discountStore,
  toThousand
} from '@/stores/index.js'
const { VITE_BASEURL } = import.meta.env
export default {
  data() {
    return {
      currentProduct: {},
      filterProductChoose: ''
    }
  },
  computed: {
    ...mapState(productsStore, [
      'allProducts',
      'productGroups',
      'productTypes'
    ]),
    ...mapState(ordersStore, ['orders']),
    ...mapState(discountStore, ['discountData']),
    isAllDiscount() {
      let isDiscountNumber = 0
      this.allProducts.forEach((product) => {
        if (product.isDiscount) isDiscountNumber++
      })
      return isDiscountNumber === this.allProducts.length
    }
  },
  methods: {
    ...mapActions(productsStore, ['getAllProducts']),
    ...mapActions(ordersStore, ['getOrdersData']),
    ...mapActions(discountStore, ['getDiscountData']),
    toThousand,
    sellNumber(productData) {
      let sellNumber = 0
      this.orders.forEach((order) => {
        order.cart.forEach((product) => {
          if (product.productId === productData.id) {
            sellNumber += product.number
          }
        })
      })
      return sellNumber
    },
    allDiscount() {
      this.allProducts.forEach((product) => {
        if (product.isDiscount) return
        if (
          (this.discountData.type === 'money'
            ? product.price - this.discountData.scale
            : Math.round(product.price * this.discountData.scale)) <= 0
        ) {
          this.$swal.fire({
            icon: 'error',
            title: '內含不可折扣商品,無法套用',
            showConfirmButton: false,
            timer: 1500,
            allowOutsideClick: false
          })
          return
        }
        this.$http
          .patch(`${VITE_BASEURL}/products/${product.id}`, {
            isDiscount: true
          })
          .then(() => (product.isDiscount = true))
      })
    },
    async deleteProduct(id) {
      const { isConfirmed } = await this.$swal.fire({
        title: '是否刪除該商品',
        showCancelButton: true,
        reverseButtons: true
      })
      if (isConfirmed) {
        await this.$http.delete(`${VITE_BASEURL}/products/${id}`)
        const { isDismissed } = await this.$swal.fire({
          icon: 'success',
          title: '刪除成功',
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 1500
        })
        if (isDismissed) this.getAllProducts()
      }
    }
  },
  mounted() {
    this.getAllProducts()
    this.getOrdersData()
    this.getDiscountData()
  },
  components: {
    CoursesCard,
    PostProductsModal,
    DiscountToggle
  }
}
</script>
