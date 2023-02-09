<template>
  <main class="wrap lg:grid lg:grid-cols-2 relative lg:gap-6">
    <div
      class="lg:w-1/2 absolute lg:h-full text-center duration-1000 h-1/2 w-full"
      :class="{
        'lg:translate-x-full lg:translate-y-0 translate-y-full': imgChange,
      }"
    >
      <img
        src="../assets/login.jpg"
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
        @click="imgChange = !imgChange"
      >
        {{ imgChange ? "登入" : "註冊" }}
      </button>
    </div>

    <form
      class="flex flex-col font-GenRyuMin text-2xl text-gray-01 gap-3 w-full mb-10 lg:mb-0"
    >
      <h1 class="text-3xl text-brand-02 text-center">註冊</h1>
      <label for="">註冊</label>
      <input
        type="email"
        name=""
        id=""
        class="py-1 px-2"
        placeholder="請輸入信箱..."
        required
      />
      <label for="">密碼</label>
      <input
        type="password"
        name=""
        id=""
        class="py-1 px-2"
        placeholder="請輸入密碼..."
        minlength="6"
        required
      />
      <label for="">用戶名</label>
      <div class="flex justify-between flex-col">
        <input
          type="text"
          name=""
          id=""
          class="py-1 px-2"
          placeholder="請輸入用戶名..."
          required
        />
      </div>
      <div class="text-center pt-[50px]">
        <button type="submit" class="btn-primary">註冊</button>
      </div>
    </form>
    <form
      class="flex flex-col font-GenRyuMin text-2xl text-gray-01 gap-3 w-full"
    >
      <h1 class="text-3xl text-brand-02 text-center">登入</h1>
      <label for="">帳號</label>
      <input
        type="email"
        name=""
        id=""
        class="py-1 px-2"
        placeholder="請輸入信箱..."
        required
      />
      <label for="">密碼</label>
      <input
        type="password"
        name=""
        id=""
        class="py-1 px-2"
        placeholder="請輸入密碼..."
        minlength="6"
        required
      />
      <label for="">驗證</label>
      <div class="flex justify-between flex-col">
        <input
          type="text"
          name=""
          id=""
          class="py-1 px-2 mb-3"
          placeholder="不分大小寫"
          maxlength="4"
          required
        />
        <div class="flex justify-end items-center">
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
        </div>
      </div>
      <div class="text-center">
        <button type="submit" class="btn-primary">登入</button>
      </div>
    </form>
  </main>
</template>
<script>
import identify from "../components/IdentifyLogin.vue";
export default {
  data() {
    return {
      imgChange: false,
      identifyCode: "", // 當前驗證碼
      identifyCodes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
      console.log("當前驗證碼==", this.identifyCode);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode +=
          this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
      }
    },
  },
  components: {
    identify,
  },
  mounted() {
    for (let i = 65; i <= 90; i++) {
      this.identifyCodes.push(String.fromCharCode(i));
    }
    this.refreshCode();
  },
};
</script>
