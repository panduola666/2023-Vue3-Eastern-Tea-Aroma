import { vueLoadingStore } from './index.js'
import axios from 'axios'
import { defineStore } from 'pinia'
const { VITE_BASEURL } = import.meta.env
export default defineStore('productsStore', {
  state: () => ({
    products: [], // 經過篩選+分頁的產品 用在產品列表
    allProducts: [] // 產品總資料
  }),
  actions: {
    getAllProducts() {
      const loading = vueLoadingStore()
      loading.openLoading()
      axios.get(`${VITE_BASEURL}/products`).then((res) => {
        if (loading.isLoading) loading.closeLoading()
        this.allProducts = res.data
      })
    },
    // 產品分頁+分類功能
    getProductsData(group, page) {
      const loading = vueLoadingStore()
      loading.openLoading()
      axios
        .get(
          `${VITE_BASEURL}/products${group ? `?group=${group}` : ''}${
            page ?? ''
          }`
        )
        .then((res) => {
          if (loading.isLoading) loading.closeLoading()
          this.products = res.data
        })
    },
    pushNewType(inputValue) {
      this.productTypes[inputValue] = 1
    },
    pushNewGroup(inputValue) {
      this.productGroups[inputValue] = 1
    }
  },
  getters: {
    productGroups: ({ allProducts }) => {
      const groups = allProducts.reduce((obj, product) => {
        obj[product.group] ? obj[product.group]++ : (obj[product.group] = 1)
        return obj
      }, {})
      return groups
    },
    productTypes: ({ allProducts }) => {
      const types = allProducts.reduce((obj, product) => {
        obj[product.type] ? obj[product.type]++ : (obj[product.type] = 1)
        return obj
      }, {})
      return types
    }
  }
})
