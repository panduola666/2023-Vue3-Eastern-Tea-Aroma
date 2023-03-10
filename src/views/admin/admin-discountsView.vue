<template>
  <div class="admin-wrap min-h-[50vh]">
    <h1 class="text-3xl font-black font-self text-brand-02">折扣專區</h1>
    <div class="text-end">
      <PostDiscountModal
        :discount-data="discountData"
        :allProducts="allProducts"
        :courses="courses"
      >
        <template #btn-content>
          <button type="button" class="btn-primary">新增折扣碼</button>
        </template>
      </PostDiscountModal>
    </div>
    <section class="bg-brand-03 bg-opacity-30 text-xl p-3 my-5">
      <h2
        class="text-center text-2xl font-bold mb-3"
        :class="{ 'text-red-500': discountData.end < new Date() }"
      >
        {{
          discountData.end > new Date() ? '當前已有折扣優惠' : '該折扣碼已失效'
        }}
      </h2>
      <section class="grid lg:grid-cols-2">
        <h3 class="lg:self-center lg:text-center mb-3 lg:mb-0">
          優惠碼：{{ discountData.code }}
        </h3>
        <div>
          <p class="mb-3">
            截止日期：{{
              $date(discountData.end).format('YYYY-MM-DD HH:mm:ss')
            }}
          </p>
          <p class="col-start-2">
            折扣額度：{{
              discountData.type === 'money'
                ? `${discountData.scale} 元`
                : `${percentageScale} 折`
            }}
          </p>
        </div>
      </section>
    </section>
    <table class="w-full my-5 divide-y divide-gray-01 border border-gray-01">
      <thead>
        <tr class="bg-brand-01 bg-opacity-50 text-xl">
          <th class="p-2">系列</th>
          <th>名稱</th>
          <th>原價</th>
          <th>優惠價</th>
          <th>是否套用折扣</th>
        </tr>
      </thead>
      <tbody class="bg-white bg-opacity-30 text-center divide-y divide-gray-01">
        <tr v-if="!allProducts.length && !courses.length">
          <td colspan="5" class="p-2">當前沒有任何商品</td>
        </tr>
        <template v-else>
          <!-- 產品 -->
          <template v-for="(product, index) in allProducts" :key="index">
            <tr class="hover:bg-gray-03 hover:bg-opacity-30">
              <td class="p-3">{{ product.type }}</td>
              <td>{{ product.name }}</td>
              <td :class="{ 'bg-brand-03 bg-opacity-30': !product.isDiscount }">
                {{ product.price }}
              </td>
              <td
                :class="{
                  'text-red-500 font-bold':
                    (discountData.type === 'money'
                      ? product.price - discountData.scale
                      : Math.round(product.price * discountData.scale)) <= 0,
                  'bg-brand-03 bg-opacity-30': product.isDiscount
                }"
              >
                {{
                  discountData.type === 'money'
                    ? product.price - discountData.scale
                    : Math.round(product.price * discountData.scale)
                }}
              </td>
              <td>
                <input
                  type="checkbox"
                  :name="product.id"
                  :id="product.id"
                  class="scale-150 cursor-pointer mr-2"
                  v-model="product.isDiscount"
                  @change="
                    () => patchDiscountState('products', product, product.price)
                  "
                />
                <label
                  :for="product.id"
                  class="cursor-pointer"
                  :class="{
                    'text-red-500': !product.isDiscount,
                    'text-brand-01': product.isDiscount
                  }"
                  >{{ product.isDiscount ? '已折扣' : '未折扣' }}</label
                >
              </td>
            </tr>
          </template>
          <!-- 課程 -->
          <template v-for="course in courses" :key="course.id + course.title">
            <template
              v-for="date in course.courseDates"
              :key="date.id + date.courseId"
            >
              <tr class="hover:bg-gray-03 hover:bg-opacity-30">
                <td class="p-3">{{ course.title }}</td>
                <td>
                  {{ $date(date.start).format('YYYY-MM-DD HH:mm') }} ~
                  {{ $date(date.end).format('HH:mm') }}
                  ({{
                    ['日', '一', '二', '三', '四', '五', '六'][
                      $date(date.start).day()
                    ]
                  }})
                </td>
                <td :class="{ 'bg-brand-03 bg-opacity-30': !date.isDiscount }">
                  {{ course.price }}
                </td>
                <td
                  :class="{
                    'text-red-500 font-bold':
                      (discountData.type === 'money'
                        ? course.price - discountData.scale
                        : Math.round(course.price * discountData.scale)) <= 0,
                    'bg-brand-03 bg-opacity-30': date.isDiscount
                  }"
                >
                  {{
                    discountData.type === 'money'
                      ? course.price - discountData.scale
                      : Math.round(course.price * discountData.scale)
                  }}
                </td>
                <td>
                  <input
                    type="checkbox"
                    :name="date.id"
                    :id="date.id"
                    class="scale-150 cursor-pointer mr-2"
                    v-model="date.isDiscount"
                    @change="
                      () =>
                        patchDiscountState('courseDates', date, course.price)
                    "
                  />
                  <label
                    :for="date.id"
                    class="cursor-pointer"
                    :class="{
                      'text-red-500': !date.isDiscount,
                      'text-brand-01': date.isDiscount
                    }"
                    >{{ date.isDiscount ? '已折扣' : '未折扣' }}</label
                  >
                </td>
              </tr>
            </template>
          </template>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script>
import PostDiscountModal from '../../components/PostDiscountModal.vue'
import { mapState, mapActions } from 'pinia'
import {
  productsStore,
  coursesStore,
  discountStore
} from '../../stores/index.js'
const { VITE_BASEURL } = import.meta.env

export default {
  computed: {
    ...mapState(productsStore, ['allProducts']),
    ...mapState(coursesStore, ['courses']),
    ...mapState(discountStore, ['discountData']),
    percentageScale() {
      if ((this.discountData.scale * 100) % 10 === 0) {
        return this.discountData.scale * 10
      } else {
        return this.discountData.scale * 100
      }
    }
  },
  methods: {
    ...mapActions(productsStore, ['getAllProducts']),
    ...mapActions(coursesStore, ['getCoursesData']),
    ...mapActions(discountStore, ['getDiscountData']),
    patchDiscountState(whitchAPI, data, price) {
      const { id } = data
      if (
        (this.discountData.type === 'money'
          ? price - this.discountData.scale
          : Math.round(price * this.discountData.scale)) <= 0
      ) {
        this.$swal.fire({
          icon: 'error',
          title: '該商品不可折扣',
          text: '優惠後的價格不可低於 0',
          showConfirmButton: false,
          timer: 1500,
          allowOutsideClick: false
        })
        data.isDiscount = false
        return
      }
      this.$http
        .patch(`${VITE_BASEURL}/${whitchAPI}/${id}`, {
          isDiscount: data.isDiscount
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
    }
  },
  mounted() {
    this.getAllProducts()
    this.getCoursesData()
    this.getDiscountData()
  },
  components: {
    PostDiscountModal
  }
}
</script>
