<template>
  <div class="admin-wrap min-h-[50vh]">
    <teleport to="title">數據分析</teleport>
    <h1 class="text-3xl font-black font-self text-brand-02">數據分析</h1>
    <h2 class="text-xl font-black font-self text-brand-02 mt-4">課程分析</h2>
    <div>
      <Doughnut :data="doughnut.data" :options="doughnut.options" />
    </div>
    <table
      class="w-full my-5 divide-y divide-gray-01 border border-gray-01 table-fixed"
    >
      <thead>
        <tr class="bg-brand-01 bg-opacity-50 text-xl">
          <th class="py-2">課程</th>
          <th>總預約人數</th>
        </tr>
      </thead>
      <tbody class="bg-white bg-opacity-30 text-center divide-y divide-gray-01">
        <tr class="hover:bg-gray-03 hover:bg-opacity-30">
          <td class="py-3">課程名1</td>
          <td>3</td>
        </tr>
      </tbody>
    </table>
    <h2 class="text-xl font-black font-self text-brand-02 my-4">商品分析</h2>
    <div class="w-full h-96">
      <Bar :data="bar.data" :options="bar.options" />
    </div>
  </div>
</template>
<script>
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js'
import { Doughnut, Bar } from 'vue-chartjs'
import { mapState, mapActions } from 'pinia'
import { coursesStore, productsStore, ordersStore } from '../../stores/index.js'
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
)
export default {
  name: 'App',
  data() {
    return {
      doughnut: {
        data: {
          labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
          datasets: [
            {
              backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
              data: [40, 20, 80, 10]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: '課程收益',
              position: 'bottom'
            },
            legend: {
              display: true,
              position: 'bottom'
            }
          }
        }
      },
      bar: {
        data: {
          labels: ['January', 'February'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [40, 20]
            }
          ]
        },
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
    }
  },
  components: {
    Doughnut,
    Bar
  }
}
</script>
