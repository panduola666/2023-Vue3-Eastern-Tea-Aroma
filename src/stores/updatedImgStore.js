import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'
export default defineStore('updatedImgStore', {
  state: () => ({
    first_token: '',
    access_token: '',
    imgurId: sessionStorage.getItem('imgurId'),
    imgurSecret: sessionStorage.getItem('imgurSecret'),
    imgUrl: ''
  }),
  actions: {
    clearImgUrl() {
      this.imgUrl = ''
    },
    // 最終 AJAX 點
    postImg(e, token) {
      const formData = new FormData()
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
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: '上傳檔案錯誤',
            text: '僅接受10MB內圖檔'
          })
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
    exchangeCodeForToken(code, e) {
      if (!code) return
      const url = 'https://api.imgur.com/oauth2/token'
      const data = {
        client_id: this.imgurId,
        client_secret: this.imgurSecret,
        grant_type: 'authorization_code',
        code
      }
      axios.post(url, data).then((response) => {
        this.access_token = response.data.access_token
        if (e) {
          this.postImg(e, this.access_token)
        }
      })
    },
    // 這裡是 input file 的進入點
    postFinal(e) {
      this.imgurId = sessionStorage.getItem('imgurId')
      this.imgurSecret = sessionStorage.getItem('imgurSecret')
      if (sessionStorage.getItem('first_token') !== 'null') {
        this.exchangeCodeForToken(sessionStorage.getItem('first_token'), e)
      }
    }
  }
})
