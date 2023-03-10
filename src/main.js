import { createApp } from 'vue'
import { createPinia } from 'pinia'

// https://www.npmjs.com/package/vue-sweetalert2
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
const options = {
  confirmButtonColor: '#4c7866',
  cancelButtonColor: '#727272',
  confirmButtonText: '確定',
  cancelButtonText: '取消'
}

// 日曆套件
import VCalendar from 'v-calendar'

// https://www.npmjs.com/package/vue-axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// day.js
import VueDayjs from 'vue3-dayjs-plugin'

// 加入 CKEditor
import CKEditor from '@ckeditor/ckeditor5-vue'

// vee-validate 表單驗證+配置
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import {
  required,
  email,
  min,
  length,
  numeric,
  confirmed
} from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zh_TW from '@vee-validate/i18n/dist/locale/zh_TW.json'
defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('length', length)
defineRule('numeric', numeric) // 必數字
defineRule('confirmed', confirmed) // 字串全等
configure({
  generateMessage: localize({
    zh_TW
  }),
  validateOnInput: true
})
setLocale('zh_TW')

import App from './App.vue'
import router from './router'

// tailWind
import './index.css'

const app = createApp(App)

// 外部套件引入
app.use(VueAxios, axios)
app.use(VueSweetalert2, options)
app.use(VCalendar, {})
app.use(VueDayjs)
app.use(CKEditor)
app.use(createPinia())
app.use(router)
// 全域組件
app.component('VForm', Form)
app.component('VField', Field)
app.component('VErrorMessage', ErrorMessage)

app.mount('#app')
