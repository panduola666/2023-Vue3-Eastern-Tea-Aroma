import axios from 'axios'
// import Swal from 'sweetalert2'
import { defineStore } from 'pinia'
const { VITE_BASEURL } = import.meta.env
export default defineStore('productsStore', {
  state: () => ({
    products: [], // 經過篩選+分頁的產品 用在產品列表
    allProducts: [] // 產品總資料
  }),
  actions: {
    getAllProducts() {
      axios.get(`${VITE_BASEURL}/products`).then((res) => {
        this.allProducts = res.data
      })
    },
    // 產品分頁+分類功能
    getProductsData(group, page) {
      axios
        .get(
          `${VITE_BASEURL}/products${group ? `?group=${group}` : ''}${
            page ?? ''
          }`
        )
        .then((res) => {
          this.products = res.data
        })
    }
  },
  getters: {
    productTypes: ({ allProducts }) => {
      const type = allProducts.reduce((obj, product) => {
        obj[product.group] ? obj[product.group]++ : (obj[product.group] = 1)
        return obj
      }, {})
      return type
    }
  }
})
