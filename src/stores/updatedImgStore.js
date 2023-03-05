import { defineStore } from 'pinia'
import { userStore } from './index.js'
import axios from 'axios'
// import Swal from "sweetalert2";
// import router from "../router/index.js";
const { VITE_BASEURL, VITE_IMGUR_ID, VITE_IMGUR_SECRET } = import.meta.env
export default defineStore('updatedImgStore', {
  state: () => ({
    base64: '',
    first_token: '',
    access_token: ''
  }),
  actions: {
    // 將選擇的圖像文件轉換為 Base64 編碼
    changeBase64(e) {
      const file = e.target.files[0]
      console.log(file)
      if (!['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) {
        alert('請上傳正確的圖片格式')
        return
      }
      if (file.size > 10 * 1024 * 1024) {
        alert('請選擇 10M 以內的圖片')
        return
      }
      if (typeof FileReader === 'function') {
        const render = new FileReader()
        render.readAsDataURL(file)
        render.onload = (event) => {
          this.base64 = event.target.result
          // 在這裡可以將編碼後的圖像數據上傳到服務器 只有在這裡有值!
          console.log('壓縮前:   ' + this.base64)
          this.compressImage(this.base64)
        }
      } else {
        alert('對不起,你的瀏覽器不支援此功能')
      }
    },
    postImg(e, token) {
      const formData = new FormData()
      console.log(e.target.files[0])
      formData.append('image', e.target.files[0]) // 必要
      formData.append('album', '4QYS5H2') // 圖片相冊路近
      const imgur = axios.create()
      imgur
        .post('https://api.imgur.com/3/image', formData, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        .then((res) => {
          console.log(res.data.data.link) // 圖片網址
          axios
            .patch(
              `${VITE_BASEURL}/users/${sessionStorage.getItem('userId')}`,
              {
                avatarUrl: res.data.data.link
              }
            )
            .then((res) => {
              const user = userStore()
              user.getUserData()
              console.log(res.data)
            })
        })
    },
    getFirstToken() {
      this.first_token = sessionStorage.getItem('first_token')
      console.log(this.first_token === 'null')
      console.log(this.first_token)
      if (this.first_token === 'null') {
        const query = window.location.search.substring(1)
        const params = new URLSearchParams(query)
        const code = params.get('code')
        sessionStorage.setItem('first_token', code)
        this.exchangeCodeForToken(code)
        if (location.href.includes('?code=')) this.reHrefName()
      } else {
        if (location.href.includes('?code=')) this.reHrefName()
        this.exchangeCodeForToken(this.first_token)
      }
    },
    reHrefName() {
      const code = location.href.split('?code=')[1].split('#')[0]
      console.log(location.href.split('?code=')[1].split('#')[0])
      window.location.href = location.href.replace(`?code=${code}`, '')
    },
    exchangeCodeForToken(code) {
      if (!code) return
      const url = 'https://api.imgur.com/oauth2/token'
      const data = {
        client_id: VITE_IMGUR_ID,
        client_secret: VITE_IMGUR_SECRET,
        grant_type: 'authorization_code',
        code: code
      }
      axios
        .post(url, data)
        .then((response) => {
          this.access_token = response.data.access_token
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 這裡是 input file 的進入點
    postAvatar(e) {
      if (!this.access_token) {
        const CLIENT_ID = VITE_IMGUR_ID
        const AUTH_URL = `https://api.imgur.com/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}`
        location.href = AUTH_URL
      } else {
        console.log('已經有token')
        this.postImg(e, this.access_token)
        console.log(this.access_token)
      }
    }
  }
})
