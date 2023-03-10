<template>
  <div class="admin-wrap min-h-[50vh]">
    <teleport to="title">數據分析</teleport>
    <h1 class="text-3xl font-black font-self text-brand-02">數據分析</h1>
    <h2 class="text-xl font-black font-self text-brand-02 mt-4">課程分析</h2>
    <table
      class="w-full my-5 divide-y divide-gray-01 border border-gray-01 table-fixed"
    >
      <thead>
        <tr class="bg-brand-01 bg-opacity-50 text-xl">
          <th class="py-2">課程</th>
          <th>總收益</th>
          <th>總預約人數</th>
        </tr>
      </thead>
      <tbody class="bg-white bg-opacity-30 text-center divide-y divide-gray-01">
        <template v-if="Object.keys(coursesData).length">
          <tr
            class="hover:bg-gray-03 hover:bg-opacity-30"
            v-for="(course, courseTitle) in coursesData"
            :key="courseTitle"
          >
            <td class="py-3">{{ courseTitle }}</td>
            <td>{{ course.price }}</td>
            <td>{{ course.number }}</td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="3" class="py-3">當前無販售中的課程</td>
        </tr>
      </tbody>
    </table>
    <h2 class="text-xl font-black font-self text-brand-02 my-4">商品分析</h2>
    <div class="w-full h-96">
      <Bar :data="finalData" :options="options" />
    </div>
  </div>
</template>
<script>
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { mapState, mapActions } from 'pinia'
import { coursesStore, productsStore, ordersStore } from '../../stores/index.js'
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title)
export default {
  name: 'App',
  data() {
    return {
      coursesData: {},
      productsData: {},
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: '商品銷量',
            position: 'bottom'
          },
          legend: {
            display: true,
            position: 'bottom'
          }
        }
      }
    }
  },
  computed: {
    ...mapState(coursesStore, ['courses']),
    ...mapState(productsStore, ['allProducts']),
    ...mapState(ordersStore, ['orders']),
    finalData() {
      const data = {
        labels: Object.keys(this.productsData),
        datasets: [
          {
            label: '銷量',
            backgroundColor: '#f87979',
            data: Object.values(this.productsData)
          }
        ]
      }
      return data
    }
  },
  methods: {
    ...mapActions(coursesStore, ['getCoursesData']),
    ...mapActions(productsStore, ['getAllProducts']),
    ...mapActions(ordersStore, ['getOrdersData'])
  },
  watch: {
    orders(orders) {
      orders.forEach((order) => {
        const { code, type, scale } = order.discount
        order.cart.forEach((cart) => {
          if (cart.productId) {
            this.allProducts.forEach((product) => {
              this.productsData[product.name]
                ? (this.productsData[product.name] +=
                    product.id === cart.productId ? cart.number : 0)
                : (this.productsData[product.name] =
                    product.id === cart.productId ? cart.number : 0)
            })
          }
          if (cart.courseDateId) {
            this.courses.forEach((course) => {
              if (course.userId !== +sessionStorage.getItem('userId')) return
              course.courseDates.forEach((date) => {
                if (this.coursesData[course.title]) {
                  if (date.id === cart.courseDateId) {
                    this.coursesData[course.title].number += cart.number
                    if (this.coursesData[course.title].number !== 0) {
                      if (code && type === 'money') {
                        this.coursesData[course.title].price +=
                          course.price * cart.number - scale
                      } else if (code && type === 'percentage') {
                        this.coursesData[course.title].price += Math.round(
                          course.price * cart.number * scale
                        )
                      } else {
                        this.coursesData[course.title].price +=
                          course.price * cart.number
                      }
                    }
                  }
                } else {
                  this.coursesData[course.title] = {
                    number: date.id === cart.courseDateId ? cart.number : 0
                  }
                  if (this.coursesData[course.title].number) {
                    if (code && type === 'money') {
                      this.coursesData[course.title].price =
                        course.price * cart.number - scale
                    } else if (code && type === 'percentage') {
                      this.coursesData[course.title].price = Math.round(
                        course.price * cart.number * scale
                      )
                    } else {
                      this.coursesData[course.title].price =
                        course.price * cart.number
                    }
                  } else {
                    this.coursesData[course.title].price = 0
                  }
                }
              })
            })
          }
        })
      })
    }
  },
  mounted() {
    this.getCoursesData()
    this.getAllProducts()
    this.getOrdersData()
  },
  components: {
    Bar
  }
}
</script>
