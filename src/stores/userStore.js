import { vueLoadingStore } from './index.js'
import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'
import router from '../router'
const { VITE_BASEURL } = import.meta.env
const swalColor = {
  confirmButtonColor: '#4c7866',
  cancelButtonColor: '#727272'
}
export default defineStore('userDataStore', {
  state: () => ({
    allUser: [],
    user: {},
    isLogin: false
  }),
  actions: {
    getAllUser() {
      const loading = vueLoadingStore()
      loading.openLoading()
      axios.get(`${VITE_BASEURL}/users`).then((res) => {
        if (loading.isLoading) loading.closeLoading()
        this.allUser = res.data
      })
    },
    getUserData() {
      // 必登入情況
      const loading = vueLoadingStore()
      loading.openLoading()
      axios.defaults.headers.common.Authorization = `Bearer ${sessionStorage.getItem(
        'accessToken'
      )}`
      axios
        .get(
          `${VITE_BASEURL}/660/users/${sessionStorage.getItem(
            'userId'
          )}?_expand=avatar&_embed=orders`
        )
        .then((res) => {
          if (loading.isLoading) loading.closeLoading()
          this.isLogin = true
          this.user = res.data
          if (router.currentRoute.value.fullPath === '/login' && this.user.id) {
            router.push('/user')
          }
          if (
            router.currentRoute.value.fullPath.startsWith('/admin') &&
            !this.user.isAdmin
          ) {
            router.push('/')
          }
        })
        .catch((err) => {
          sessionStorage.clear()
          console.log(err.response)
          this.isLogin = false
          if (
            !this.isLogin &&
            router.currentRoute.value.fullPath.includes('admin')
          ) {
            this.overLogin()
          }
        })
    },
    login(userInput, identifyCode, AddIdentifyLetter) {
      const { email, password, identify } = userInput
      const data = { email, password }
      if (identify.toUpperCase() === identifyCode) {
        // 驗證成功
        axios
          .post(`${VITE_BASEURL}/login`, data)
          .then((res) => {
            const { accessToken, user } = res.data
            this.user = user
            sessionStorage.setItem('accessToken', accessToken)
            sessionStorage.setItem('userId', user.id)
            sessionStorage.setItem('first_token', 'null')
            return Swal.fire({
              icon: 'success',
              title: '登入成功',
              ...swalColor
            })
          })
          .then(() => {
            this.isLogin = true
            if (this.user.isAdmin) {
              router.push('/admin')
            } else {
              router.push('/user')
            }
          })
          .catch((err) => {
            const { data } = err.response
            console.log(err)
            if (data === 'Incorrect password') {
              return Swal.fire({
                icon: 'error',
                title: '密碼錯誤',
                ...swalColor
              })
            } else if (data === 'Cannot find user') {
              return Swal.fire({
                icon: 'error',
                title: '此帳號未註冊',
                ...swalColor
              })
            }
          })
          .then(() => {
            AddIdentifyLetter()
          })
      } else {
        // 驗證失敗
        Swal.fire({
          icon: 'error',
          title: '驗證失敗',
          ...swalColor
        }).then(() => {
          AddIdentifyLetter()
        })
      }
    },
    checkLogin() {
      if (
        sessionStorage.getItem('accessToken') &&
        sessionStorage.getItem('userId')
      ) {
        this.isLogin = true
        this.getUserData()
      } else {
        this.isLogin = false
      }
    },
    overLogin() {
      Swal.fire({
        icon: 'error',
        title: '登入超時',
        ...swalColor
      }).then(() => {
        router.push('/login')
      })
    },
    register(userInput) {
      const { email, password, name: userName } = userInput
      const data = {
        email,
        password,
        name: userName,
        avatarId: 3,
        tel: '',
        isAdmin: false,
        shoppingCart: {
          discount: '',
          cart: {
            products: [],
            courses: []
          }
        }
      }
      if (password.length < 6) {
        Swal.fire({
          icon: 'error',
          title: '密碼不可低於 6 位數',
          ...swalColor
        })
        return
      }
      axios
        .post(`${VITE_BASEURL}/users`, data)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: '註冊成功',
            ...swalColor
          })
        })
        .catch((err) => {
          const { data } = err.response
          if (data === 'Email already exists') {
            Swal.fire({
              icon: 'error',
              title: '該帳號已註冊',
              ...swalColor
            })
          }
        })
    },
    signOut() {
      Swal.fire({
        icon: 'success',
        title: '登出成功',
        ...swalColor
      }).then(() => {
        sessionStorage.clear()
        this.isLogin = false
      })
    },
    addToCart(config, currentDate, number = 1) {
      if (!this.isLogin) {
        Swal.fire({
          icon: 'warning',
          title: '請登入會員',
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          ...swalColor
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/login')
          }
        })
        return
      }
      const { cart } = this.user.shoppingCart
      if (config === 'courses') {
        const { id: courseDateId, courseId, course, isDiscount } = currentDate
        const { price } = course
        const index = cart.courses.findIndex(
          (item) =>
            item.courseDateId === courseDateId && item.courseId === courseId
        )
        if (index !== -1) {
          const data = cart.courses[index]
          data.number += number
          data.totalPrice = data.number * data.price
        } else {
          const data = {
            courseDateId,
            courseId,
            price,
            number,
            totalPrice: number * price,
            isDiscount
          }
          cart.courses.push(data)
        }
      } else if (config === 'products') {
        const { id: productId, price, isDiscount } = currentDate
        const index = cart.products.findIndex(
          (item) => item.productId === productId
        )
        if (index !== -1) {
          const data = cart.products[index]
          data.number += number
          data.totalPrice = data.number * data.price
        } else {
          const data = {
            productId,
            price,
            number,
            totalPrice: number * price,
            isDiscount
          }
          cart.products.push(data)
        }
      }
      const shoppingCart = this.user.shoppingCart
      axios
        .patch(`${VITE_BASEURL}/users/${sessionStorage.getItem('userId')}`, {
          shoppingCart
        })
        .then((res) => {
          Swal.fire({
            icon: 'success',
            title: '添加成功',
            showConfirmButton: false,
            timer: 1500,
            allowOutsideClick: false
          })
        })
    }
  },
  getters: {}
})
