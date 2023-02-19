<template>
  <main class="wrap">
    <div class="flex flex-col md:flex-row items-center gap-8">
      <div class="relative flex-shrink-0">
        <div class="absolute bottom-[1vw] right-[1vw] rounded-full group z-10">
          <span class="w-full h-full overflow-hidden absolute">
            <input
              type="file"
              name="userAvatar"
              id="file"
              aria-label="上傳頭像"
              placeholder="請選擇頭像..."
              accept=".jpg,.png"
              class="absolute cursor-pointer w-full h-[200px] scale-200 rounded-full -top-1/2 left-0 opacity-70 z-10"
              @change="postAvatar($event)"
              :disabled="postLogin"
          /></span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="fill-white rounded-full h-[50px] md:h-[60px] lg:h-20 opacity-75 group-hover:opacity-100 stroke-gray-01 transition-opacity duration-300 group-hover:outline outline-2 outline-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
        </div>

        <img
          v-if="postLogin"
          src="../assets/loading.svg"
          alt="loadingSVG"
          class="absolute top-0 right-0 left-0 bottom-0 bg-white rounded-full bg-opacity-30"
        />
        <img
          :src="
            user.avatarUrl
              ? user.avatarUrl
              : 'https://github.com/panduola666/2023-Vue3-Side-Project/blob/main/src/assets/BANNER-3.png?raw=true'
          "
          alt=""
          class="flex-shrink-0 rounded-full object-cover border border-brand-03 bg-brand-03 bg-opacity-20 lg:w-[25vw] lg:h-[25vw] w-[30vw] h-[30vw] min-h-[170px] min-w-[170px]"
        />
      </div>
      <ul
        class="md:w-2/3 w-full relative gap-3 flex flex-col text-center px-4 tracking-[.5rem]"
        id="userChoose"
      >
        <li
          v-for="(item, index) in ['課程預約', '訂單詳情', '收藏項目']"
          :key="item + index"
        >
          <router-link
            :to="{ name: item }"
            class="block p-4 hover:bg-brand-03 hover:bg-opacity-20 cursor-pointer text-brand-02 text-xl lg:text-3xl"
          >
            {{ item }}
          </router-link>
        </li>
        <li>
          <img
            src="../assets/teaIcon.svg"
            alt=""
            class="bottom-0 right-0 float-right"
          />
        </li>
      </ul>
    </div>
    <!-- 會員資訊 -->
    <div class="text-xl my-10">
      <h1 class="lg:text-3xl text-2xl text-brand-02 font-self lg:mb-6 mb-3">
        會員資訊
      </h1>
      <form
        class="flex justify-between flex-col lg:flex-row lg:items-end tracking-widest"
      >
        <div class="flex flex-col gap-3 lg:gap-6 text-gray-02">
          <p class="flex lg:flex-row flex-col lg:gap-4 gap-2 lg:items-center">
            帳號
            <span class="text-gray-01">{{ user.email }}</span>
            <span
              id="userLevel"
              class="text-base text-end relative group cursor-default text-brand-01 font-medium font-self"
            >
              茶友
              <span
                class="absolute bg-brand-01 text-white bg-opacity-75 min-w-max px-4 py-2 top-full lg:left-0 right-0 group-hover:block hidden"
                >累積消費滿 20,000 將升級為茶士 (VIP)</span
              >
            </span>
          </p>
          <p class="flex lg:flex-row flex-col lg:gap-4 gap-2 lg:items-center">
            <label for="userName">用戶名</label>
            <input
              type="text"
              name="userName"
              id="userName"
              class="text-gray-01 px-2 py-1"
              v-model="userInfo.name"
              :disabled="!isInfoEditor"
            />
          </p>
          <p class="flex lg:flex-row flex-col lg:gap-4 gap-2 lg:items-center">
            <label for="tel">手機號碼</label>
            <input
              type="tel"
              name="tel"
              id="tel"
              class="text-gray-01 px-2 py-1"
              oninput="value=value.replace(/[^\d]/g,'')"
              v-model="userInfo.tel"
              :disabled="!isInfoEditor"
            />
          </p>
        </div>
        <button
          type="button"
          class="btn-outline h-1/2 mt-3"
          @click.prevent="editor('會員資訊', $event)"
        >
          編輯
        </button>
      </form>
    </div>
    <!-- 修改密碼 -->
    <div class="text-xl my-10">
      <h1 class="lg:text-3xl text-2xl text-brand-02 font-self lg:mb-6 mb-3">
        修改密碼
      </h1>
      <form
        class="flex justify-between flex-col lg:flex-row lg:items-end tracking-widest"
      >
        <div class="flex flex-col gap-3 lg:gap-6 text-gray-02">
          <p class="flex lg:flex-row flex-col lg:gap-4 gap-2 lg:items-center">
            <label for="old">舊密碼</label>
            <input
              type="password"
              name="old"
              id="old"
              minlength="6"
              autocomplete="on"
              class="text-gray-01 px-2 py-1"
              v-model="password.oldPassword"
              :disabled="!isPasswordEditor"
            />
          </p>
          <p class="flex lg:flex-row flex-col lg:gap-4 gap-2 lg:items-center">
            <label for="newPassword">新密碼</label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              minlength="6"
              autocomplete="off"
              class="text-gray-01 px-2 py-1"
              v-model="password.newPassword"
              :disabled="!isPasswordEditor"
            />
          </p>
          <p class="flex lg:flex-row flex-col lg:gap-4 gap-2 lg:items-center">
            <label for="check">確認密碼</label>
            <input
              type="password"
              name="check"
              id="check"
              minlength="6"
              autocomplete="off"
              class="text-gray-01 px-2 py-1"
              v-model="password.check"
              :disabled="!isPasswordEditor"
            />
          </p>
        </div>
        <button
          type="button"
          class="btn-outline h-1/2 mt-3"
          @click.prevent="editor('修改密碼', $event)"
        >
          編輯
        </button>
      </form>
    </div>
    <a
      href="/"
      class="block mt-32 p-4 w-full text-xl text-gray-02 text-center hover:bg-brand-03 hover:bg-opacity-20 cursor-pointer"
    >
      登出
    </a>
  </main>
</template>
<script>
import axios from "axios";
import { mapState, mapActions } from "pinia";
import { userStore, updatedImgStore } from "../stores/index.js";
const { VITE_BASEURL, VITE_IMGUR_ID, VITE_IMGUR_SECRET } = import.meta.env;
export default {
  data() {
    return {
      isInfoEditor: false,
      isPasswordEditor: false,
      password: {
        oldPassword: "",
        newPassword: "",
        check: "",
      },
    };
  },

  computed: {
    ...mapState(userStore, ["isLogin", "user", "postLogin"]),
    ...mapState(updatedImgStore, ["access_token","first_token"]),

    userInfo() {
      return {
        name: this.user.name,
        tel: this.user.tel,
      };
    },
  },
  methods: {
    ...mapActions(userStore, ["checkLogin", "overLogin", "postAvatar"]),
    ...mapActions(updatedImgStore, ["postAvatar", "getFirstToken"]),

    changeBtnText(e) {
      if (e.target.textContent.trim() === "編輯") {
        e.target.textContent = "確認";
        e.target.classList.remove("btn-outline");
        e.target.classList.add("btn-primary");
        return "編輯";
      } else if (e.target.textContent.trim() === "確認") {
        e.target.textContent = "編輯";
        e.target.classList.remove("btn-primary");
        e.target.classList.add("btn-outline");
        return "確認";
      }
    },
    editor(area, e) {
      const flag = this.changeBtnText(e);
      if (area === "會員資訊") {
        this.isInfoEditor = flag === "編輯";
        if (!this.isInfoEditor) {
          const data = {
            name: this.userInfo.name,
            tel: this.userInfo.tel,
          };
          if (
            this.userInfo.name === this.user.name &&
            this.userInfo.tel === this.user.tel
          )
            return;
          axios
            .patch(
              `${VITE_BASEURL}/660/users/${sessionStorage.getItem("userId")}`,
              data
            )
            .then(() => {
              this.$swal.fire({
                icon: "success",
                title: "更改成功",
                showConfirmButton: false,
                timer: 1500,
              });
            });
        }
      } else if (area === "修改密碼") {
        this.isPasswordEditor = flag === "編輯";
        if (
          !this.isPasswordEditor &&
          this.password.check &&
          this.password.newPassword &&
          this.password.oldPassword
        ) {
          this.patchPassword();
        }
        this.password = this.$options.data().password;
      }
    },
    async patchPassword() {
      const password = this.password.newPassword;
      if (
        this.password.newPassword.length < 6 ||
        this.password.check.length < 6
      ) {
        this.$swal.fire({
          icon: "error",
          title: "密碼至少 6 位數",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      if (this.password.newPassword !== this.password.check) {
        this.$swal.fire({
          icon: "error",
          title: "兩次密碼不一致",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      try {
        const loginState = await axios.post(`${VITE_BASEURL}/login`, {
          email: this.user.email,
          password: this.password.oldPassword,
        });

        if (loginState.status >= 200 && loginState.status < 300) {
          await axios.patch(
            `${VITE_BASEURL}/660/users/${sessionStorage.getItem("userId")}`,
            { password }
          );
          this.$swal
            .fire({
              icon: "success",
              title: "修改完成，請重新登入",
            })
            .then(() => {
              this.$router.push("/login");
              sessionStorage.clear();
            });
        }
      } catch (err) {
        console.log(err);
        if (err.response.data === "Incorrect password") {
          this.$swal.fire({
            icon: "error",
            title: "密碼輸入錯誤",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    },
  },
  mounted() {
    this.getFirstToken();
    this.checkLogin();
    if (!this.isLogin) {
      this.overLogin();
    }
  },
};
</script>
<style scoped>
#userChoose::after {
  content: "";
  background-color: #38415a;
  opacity: 0.4;
  width: 100%;
  height: 2px;
  display: block;
  position: absolute;
  bottom: 0;
  left: -10px;
}
#userChoose::before {
  content: "";
  background-color: #38415a;
  opacity: 0.4;
  width: 2px;
  height: 105%;
  display: block;
  position: absolute;
  bottom: -10px;
  left: 0;
}
</style>
