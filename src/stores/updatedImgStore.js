import { defineStore } from 'pinia'
import { coursesStore, productsStore } from './index.js'
import axios from 'axios'
const { VITE_BASEURL } = import.meta.env
export default defineStore('updatedImgStore', {
  state: () => ({
    base64: '',
    first_token: '',
    access_token: '',
    imgurId: sessionStorage.getItem('imgurId'),
    imgurSecret: sessionStorage.getItem('imgurSecret'),
    imgUrl: ''
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
    // 最終 AJAX 點
    postImg(e, token, whichAPI, dataId) {
      const formData = new FormData()
      // console.log(e.target.files[0])
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
          // 只有這裡可以讀網址
          this.imgUrl = res.data.data.link // 圖片網址
        })
    },
    getFirstToken() {
      this.first_token = sessionStorage.getItem('first_token')
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
      window.location.href = location.href.replace(`?code=${code}`, '')
    },
    // 中轉
    exchangeCodeForToken(code, e, whichAPI, dataId) {
      if (!code) return
      const url = 'https://api.imgur.com/oauth2/token'
      const data = {
        client_id: this.imgurId,
        client_secret: this.imgurSecret,
        grant_type: 'authorization_code',
        code
      }
      axios
        .post(url, data)
        .then((response) => {
          this.access_token = response.data.access_token
          if (e) {
            this.postImg(e, this.access_token, whichAPI, dataId)
            console.log('access_token 完成')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 這裡是 input file 的進入點
    postFinal(e, whichAPI, dataId) {
      this.imgurId = sessionStorage.getItem('imgurId')
      this.imgurSecret = sessionStorage.getItem('imgurSecret')
      if (sessionStorage.getItem('first_token') !== 'null') {
        this.exchangeCodeForToken(
          sessionStorage.getItem('first_token'),
          e,
          whichAPI,
          dataId
        )
      }
    }
  }
})
