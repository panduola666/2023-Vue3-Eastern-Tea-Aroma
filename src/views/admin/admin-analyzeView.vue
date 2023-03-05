<template>
  <div class="admin-wrap min-h-[50vh]">
    <h1 class="text-3xl font-black font-self text-brand-02">數據分析</h1>
    <p>課程分析</p>
    <div class="grid grid-cols-2">
      <div>
        <Doughnut :data="doughnut.data" :options="doughnut.options" />
      </div>
      <table>
        <caption>
          預約人數
        </caption>
      </table>
    </div>
    <div class="w-full h-96">
      <chartLine :data="line.data" :options="line.options" />
    </div>
    <p>商品分析</p>
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
import { Doughnut, Bar, Line } from 'vue-chartjs'
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
  components: {
    Doughnut,
    Bar,
    chartLine: Line
  },
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
              position: 'right'
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
      },
      line: {
        data: {
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July'
          ],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: 'red',
              data: [40, 39, 10, 40, 39, 80, 40]
            },
            {
              label: 'Data One',
              backgroundColor: '#000',
              borderColor: '#000',
              data: [42, 1, 13, 20, 49, 10, 50]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: '講師收益',
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
  }
}
</script>
