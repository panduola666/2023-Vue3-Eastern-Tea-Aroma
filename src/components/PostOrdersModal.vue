<template>
  <div>
    <DialogModal>
      <template #modal-btn>
        <slot name="btn-content">按鈕</slot>
      </template>
      <template #modal-header>
        <p class="text-xl font-black font-self text-brand-02">訂單詳情</p>
      </template>
      <template #modal-body>
        <div class="flex justify-between text-lg">
          <p>訂單編號: {{ orderData.id }}</p>
          <p>成立時間：{{ $date(orderData.created).format('YYYY-MM-DD') }}</p>
        </div>
        <!-- {{ orderData }} -->
        <table
          class="my-4 w-full border border-brand-02 divide-y divide-brand-02 text-center"
        >
          <thead class="bg-brand-01 bg-opacity-50">
            <tr class="divide-x md:divide-x-0 divide-brand-02">
              <th>商品</th>
              <th>品項</th>
              <th>數量</th>
              <th>原價</th>
              <th>優惠價</th>
            </tr>
          </thead>
          <tbody class="border divide-y divide-brand-02">
            <tr
              class="hover:bg-gray-03 hover:bg-opacity-30 divide-x md:divide-x-0 divide-brand-02"
              v-for="(product, index) in orderData.cart"
              :key="product.name + index"
            >
              <td class="py-2">
                {{ product.type ? product.type : product.name }}
              </td>
              <td>
                {{
                  product.type
                    ? product.name
                    : `${$date(product.start).format(
                        'YYYY-MM-DD HH:mm'
                      )}~${$date(product.end).format('HH:mm')}`
                }}
              </td>
              <td>{{ product.number }}</td>
              <td class="">{{ toThousand(product.totalPrice) }}</td>
              <td class="font-semibold text-lg">
                {{ productDiscount(product) }}
              </td>
            </tr>
          </tbody>
        </table>
        <section
          class="grid grid-cols-2 gap-y-1 lg:w-1/4 text-end sm:text-lg ml-auto mt-5"
          v-if="orderData.discount.code"
        >
          <p>原價</p>
          <p class="line-through text-gray-02">
            {{
              toThousand(orderData.cart.reduce(
                (total, product) => (total += product.totalPrice),
                0
              ))
            }}
          </p>
          <p>折扣碼</p>
          <p>{{ orderData.discount.code }}</p>
          <h2>總計</h2>
          <p>{{ totalDiscountPrice(orderData) }}</p>
        </section>
        <section
          v-else
          class="grid grid-cols-2 gap-y-1 lg:w-1/4 text-end sm:text-lg ml-auto mt-5"
        >
          <p>折扣碼</p>
          <p>無</p>
          <h2>總計</h2>
          <p>
            {{
              toThousand(
                orderData.cart.reduce(
                  (total, product) => (total += product.totalPrice),
                  0
                )
              )
            }}
          </p>
        </section>
      </template>
      <template #modal-footerBTN>
        <p></p>
      </template>
    </DialogModal>
  </div>
</template>
<script>
import DialogModal from '../components/DialogModal.vue'
import { toThousand } from '../stores/index.js'
export default {
  props: {
    orderData: {
      type: Object,
      required: true
    }
  },
  methods: {
    toThousand,
    productDiscount(product) {
      const { scale, type, code } = this.orderData.discount
      if (product.isDiscount && code) {
        return type === 'money'
          ? toThousand(product.totalPrice - scale)
          : toThousand(Math.round(product.totalPrice * scale))
      }
      return ''
    },
    totalDiscountPrice(order) {
      const total = order.cart.reduce((price, product) => {
        if (product.isDiscount) {
          const { scale, type } = this.orderData.discount
          type === 'money'
            ? (price += product.totalPrice - scale)
            : (price += Math.round(product.totalPrice * scale))
        } else {
          price += product.totalPrice
        }
        return price
      }, 0)
      return toThousand(total)
    }
  },
  components: {
    DialogModal
  }
}
</script>
