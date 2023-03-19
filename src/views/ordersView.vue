<template>
  <main class="wrap min-h-[50vh]">
    <teleport to="title">訂單資訊</teleport>
    <h2 class="text-3xl font-black font-self text-brand-02">訂單資訊</h2>
    <p v-if="!myOrders.length" class="text-3xl pt-[20vh] text-center">
      當前沒有訂單
    </p>
    <table
      v-for="order in myOrders.sort((a, b) => b.id - a.id)"
      :key="order.id"
      class="w-full table-fixed h-20 text-center border border-brand-05 overflow-scroll bg-white bg-opacity-20 my-4"
    >
      <thead class="bg-brand-01 bg-opacity-50 font-self">
        <tr>
          <th class="text-xs sm:text-base py-2">
            成立日期: {{ $date(order.created).format('YYYY-MM-DD') }}
          </th>
          <th class="py-2" colspan="2">
            物流查詢編號：<span class="sm:text-xl">{{
              order.trackingNumber
            }}</span>
          </th>
        </tr>
      </thead>
      <tbody class="block w-[300%] max-h-40 overflow-auto cursor-default">
        <tr
          class="table w-full text-lg hover:bg-brand-01 hover:bg-opacity-10"
          v-for="(product, index) in order.cart"
          :key="product.totalPrice + product.isDiscount + index"
        >
          <template v-if="product.productId">
            <td class="tracking-wider py-2 w-1/3">{{ product.type }}</td>
            <td class="py-2 w-1/3">
              {{ product.type }} * {{ product.number }}
            </td>
            <td
              class="py-2 w-1/3"
              v-if="order.discount.code && product.isDiscount"
            >
              <p class="mx-2 text-base text-gray-02 line-through">
                {{ toThousand(product.totalPrice) }} 元
              </p>
              <p>
                {{
                  order.discount.type === 'money'
                    ? toThousand(product.totalPrice - order.discount.scale)
                    : toThousand(
                        Math.round(product.totalPrice * order.discount.scale)
                      )
                }}
                元
              </p>
            </td>
            <td class="w-1/3" v-else>
              {{ toThousand(product.totalPrice) }} 元
            </td>
          </template>
          <template v-if="product.courseDateId">
            <td class="tracking-wider py-2 w-1/3">{{ product.name }}</td>
            <td class="py-2 w-1/3">
              {{ $date(product.start).format('YYYY-MM-DD HH:mm') }} ~
              {{ $date(product.end).format('HH:mm') }}
            </td>
            <td
              class="py-2 w-1/3"
              v-if="order.discount.code && product.isDiscount"
            >
              <p class="mx-2 text-base text-gray-02 line-through">
                {{ toThousand(product.totalPrice) }} 元
              </p>
              <p>
                {{
                  order.discount.type === 'money'
                    ? toThousand(product.totalPrice - order.discount.scale)
                    : toThousand(
                        Math.round(product.totalPrice * order.discount.scale)
                      )
                }}
                元
              </p>
            </td>
            <td class="w-1/3" v-else>
              {{ toThousand(product.totalPrice) }} 元
            </td>
          </template>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td class="pt-3">{{ order.cart.length }}件商品</td>
          <td class="pt-3 font-bold text-brand-02" v-if="order.isCancel">
            已取消
          </td>
          <td class="pt-3 font-bold text-brand-02" v-else>
            {{ order.trackingNumber ? '已出貨' : '未出貨' }}
          </td>
          <td class="flex justify-center pt-3">
            <span
              class="sm:block flex flex-col sm:text-xl"
              v-if="order.discount.code"
            >
              總計 {{ toThousand(discountPrice(order.id)) }} 元
            </span>
            <span class="sm:text-xl" v-else
              >總計 {{ toThousand(totalPrice(order.id)) }} 元</span
            >
          </td>
        </tr>
      </tfoot>
    </table>
  </main>
</template>
<script>
import { mapState, mapActions } from 'pinia'
import { ordersStore, toThousand } from '../stores/index.js'
export default {
  computed: {
    ...mapState(ordersStore, ['orders']),
    myOrders() {
      return this.orders.filter(
        (order) => order.userId === +sessionStorage.getItem('userId')
      )
    }
  },
  methods: {
    ...mapActions(ordersStore, ['getOrdersData']),
    totalPrice(id) {
      const index = this.orders.findIndex((order) => order.id === id)
      return this.orders[index].cart.reduce((price, item) => {
        price += item.totalPrice
        return price
      }, 0)
    },
    discountPrice(id) {
      const index = this.orders.findIndex((order) => order.id === id)
      let price = 0
      this.orders[index].cart.forEach((item) => {
        if (item.isDiscount) {
          if (this.orders[index].discount.type === 'money') {
            price += item.totalPrice - this.orders[index].discount.scale
          } else {
            price += Math.round(
              item.totalPrice * this.orders[index].discount.scale
            )
          }
        } else {
          price += item.totalPrice
        }
      })
      return price
    },
    toThousand
  },
  mounted() {
    this.getOrdersData()
  }
}
</script>
<style scoped>
::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-button {
  display: none;
}

::-webkit-scrollbar-track-piece {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 52, 22, 0.6);
}

::-webkit-scrollbar-track {
  box-shadow: transparent;
}
</style>
