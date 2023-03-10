<template>
  <main class="wrap lg:grid lg:grid-cols-2 relative lg:gap-6">
    <teleport to="title">登入註冊</teleport>
    <div
      class="lg:w-1/2 absolute lg:h-full text-center duration-1000 h-1/2 w-full"
      :class="{
        'lg:translate-x-full lg:translate-y-0 translate-y-full': imgChange
      }"
    >
      <img
        src="https://images.unsplash.com/photo-1548323164-ea1cb76539e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTI3fHx0ZWF8ZW58MHx8MHx8&auto=format&fit=crop&w=300&q=60"
        alt=""
        class="w-full h-full object-cover"
      />
      <p
        class="absolute top-20 left-10 right-10 bg-white bg-opacity-30 text-3xl py-2 px-4 text-gray-01"
      >
        啄飲間，百態人生
      </p>
      <button
        type="button"
        class="absolute bottom-10 -translate-x-1/2 btn-primary text-xl text-gray-01 duration-500 bg-white bg-opacity-30 hover:bg-brand-01 hover:bg-opacity-70"
        @click="inputReset('changeImg')"
      >
        {{ imgChange ? '登入' : '註冊' }}
      </button>
    </div>

    <form
      class="flex flex-col font-self text-2xl text-gray-01 gap-5 w-full mb-10 lg:mb-0"
      @submit.prevent="inputReset('register')"
    >
      <h1 class="text-3xl text-brand-02 text-center">註冊</h1>
      <div class="flex flex-col">
        <label for="registerEmail">帳號</label>
        <input
          type="email"
          name="registerEmail"
          id="registerEmail"
          class="py-1 px-2"
          placeholder="請輸入信箱"
          v-model.trim="userInput.email"
          required
        />
      </div>
      <div class="flex flex-col">
        <label for="registerPassword">密碼</label>
        <input
          type="password"
          name="registerPassword"
          id="registerPassword"
          class="py-1 px-2"
          placeholder="請輸入密碼"
          autocomplete="off"
          minlength="6"
          v-model.trim="userInput.password"
          required
        />
      </div>
      <div class="flex flex-col">
        <label for="registerName">用戶名</label>
        <input
          type="text"
          name="registerName"
          id="registerName"
          class="py-1 px-2"
          placeholder="請輸入用戶名"
          maxlength="6"
          v-model.trim="userInput.name"
          required
        />
      </div>
      <div class="text-center pt-[50px]">
        <button type="submit" class="btn-primary">註冊</button>
      </div>
    </form>
    <form
      class="flex flex-col font-self text-2xl text-gray-01 gap-5 w-full"
      @submit.prevent="inputReset('login')"
    >
      <h1 class="text-3xl text-brand-02 text-center">登入</h1>
      <div class="flex flex-col">
        <label for="loginEmail">帳號</label>
        <input
          type="email"
          name="loginEmail"
          id="loginEmail"
          class="py-1 px-2"
          placeholder="請輸入信箱"
          v-model.trim="userInput.email"
          required
        />
      </div>
      <div>
        <label for="loginPassword">密碼</label>
        <div class="flex items-center gap-3">
          <input
            :type="passwordType"
            name="loginPassword"
            id="loginPassword"
            class="py-1 px-2 w-full"
            placeholder="請輸入密碼"
            autocomplete="off"
            minlength="6"
            v-model.trim="userInput.password"
            required
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 flex-shrink-0 cursor-pointer"
            @click="passwordType = 'text'"
            v-if="passwordType === 'password'"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 flex-shrink-0 cursor-pointer"
            @click="passwordType = 'password'"
            v-else-if="passwordType === 'text'"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        </div>
      </div>
      <div>
        <label for="identify">驗證</label>
        <div class="flex justify-between flex-col">
          <input
            type="text"
            name="identify"
            id="identify"
            class="py-1 px-2 mb-3"
            placeholder="不分大小寫"
            v-model.trim="userInput.identify"
            required
          />
          <span class="flex justify-end items-center">
            <identify
              :identify-code="identifyCode"
              @click="refreshCode"
              class="cursor-pointer mr-4"
            ></identify>
            <p
              class="cursor-pointer text-base underline text-brand-02 hover:text-brand-01"
              @click="refreshCode"
            >
              看不清
            </p>
          </span>
        </div>
      </div>
      <div class="text-center">
        <button type="submit" class="btn-primary">登入</button>
      </div>
    </form>
  </main>
</template>
<script>
import identify from '../components/IdentifyLogin.vue'
import { mapState, mapActions } from 'pinia'
import { userStore } from '../stores/index.js'
export default {
  data() {
    return {
      userInput: {
        name: '',
        email: '',
        password: '',
        identify: ''
      },
      passwordType: 'password',
      imgChange: false,
      identifyCode: '', // 當前隨機驗證碼
      identifyCodes: []
    }
  },
  computed: {
    ...mapState(userStore, ['user'])
  },
  methods: {
    ...mapActions(userStore, ['getUserData', 'login', 'register', 'signOut']),
    inputReset(option) {
      if (option === 'login') {
        this.login(this.userInput, this.identifyCode, this.AddIdentifyLetter)
      } else if (option === 'register') {
        this.register(this.userInput)
      } else if (option === 'changeImg') {
        this.imgChange = !this.imgChange
      }
      this.userInput = this.$options.data().userInput
      this.identifyInput = ''
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode +=
          this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
    },
    AddIdentifyLetter() {
      for (let i = 65; i <= 90; i++) {
        this.identifyCodes.push(String.fromCharCode(i))
      }
      this.refreshCode()
    }
  },
  components: {
    identify
  },
  mounted() {
    this.AddIdentifyLetter()
  }
}
</script>
