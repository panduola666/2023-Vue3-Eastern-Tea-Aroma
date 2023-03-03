<template>
  <main class="wrap">
    <div class="flex flex-col md:flex-row items-center gap-8">
      <div class="relative flex-shrink-0">
        <img
          v-if="postImg"
          src="../assets/loading.svg"
          alt="loadingSVG"
          class="absolute top-0 right-0 left-0 bottom-0 bg-white rounded-full bg-opacity-30"
        />
        <img
          :src="user.avatarUrl"
          alt="用戶頭像"
          class="flex-shrink-0 rounded-full object-cover border border-brand-02 bg-brand-01 bg-opacity-70 cursor-pointer hover:contrast-[0.8] lg:w-[25vw] lg:h-[25vw] w-[30vw] h-[30vw] min-h-[170px] min-w-[170px]"
          @click="chooseAvatar"
        />
        <p
          class="absolute top-8 text-[2vw] hidden md:block left-1/2 -translate-x-1/2 pointer-events-none"
        >
          點擊選擇頭像
        </p>
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
      <div
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
              autocomplete="off"
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
              autocomplete="off"
              oninput="value=value.replace(/[^\d]/g,'')"
              v-model="userInfo.tel"
              :disabled="!isInfoEditor"
            />
          </p>
        </div>
        <button
          type="button"
          class="btn-outline h-1/2 mt-3"
          @click.prevent="($event) => editor('會員資訊', $event)"
        >
          編輯
        </button>
      </div>
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
              autocomplete="off"
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
import { userStore } from "../stores/index.js";
const { VITE_BASEURL } = import.meta.env;
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
      postImg: false,
    };
  },

  computed: {
    ...mapState(userStore, ["isLogin", "user"]),
    userInfo() {
      return {
        name: this.user.name,
        tel: this.user.tel,
      };
    },
  },
  methods: {
    ...mapActions(userStore, ["overLogin", "getUserData"]),

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
          if (!this.userInfo.name) {
            this.userInfo.name = this.user.name;
            return;
          }
          if (
            this.userInfo.name === this.user.name &&
            this.userInfo.tel === this.user.tel
          ) {
            return;
          }
          const data = {
            name: this.userInfo.name,
            tel: this.userInfo.tel,
          };
          this.user.name = this.userInfo.name;
          this.$http
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
    async chooseAvatar() {
      this.postImg = true;
      const type = ["男孩", "女孩"];
      const { value, isDismissed } = await this.$swal.fire({
        title: "請選擇您的性別",
        input: "radio",
        inputOptions: type,
        showCancelButton: true,
        reverseButtons: true,
      });
      if (isDismissed) {
        this.postImg = false;
      }
      if (value) {
        const avatar = await this.$http.get(`${VITE_BASEURL}/avatar`);
        const index = avatar.data.findIndex(
          (item) => item.type === type[value]
        );
        await this.$http.patch(
          `${VITE_BASEURL}/users/${sessionStorage.getItem("userId")}`,
          {
            avatarUrl: avatar.data[index].imgUrl,
          }
        );
        this.postImg = false;
        this.getUserData();
      }
    },
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
/* input {
  background-color: transparent;
} */
</style>
