import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
import router from "../router";
const { VITE_BASEURL } = import.meta.env;

export default defineStore("userDataStore", {
  state: () => ({
    user: {},
    isLogin: false,
    postLogin: false,
  }),
  actions: {
    getUserData() {
      // 必登入情況
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${sessionStorage.getItem("accessToken")}`;
      axios
        .get(`${VITE_BASEURL}/660/users/${sessionStorage.getItem("userId")}`)
        .then((res) => {
          this.isLogin = true;
          console.log("已登入");
          this.user = res.data;
          console.log(this.user);
        })
        .catch((err) => {
          console.log(`checkLogin 登入超時`);
          sessionStorage.clear();
          console.log(err.response);
          this.isLogin = false;
          // if (err.response.data === "jwt expired") {
          //   this.overLogin();
          // }
        });
    },
    login(userInput, identifyCode, AddIdentifyLetter) {
      const { email, password, identify } = userInput;
      const data = { email, password };
      if (identify.toUpperCase() === identifyCode) {
        // 驗證成功
        axios
          .post(`${VITE_BASEURL}/login`, data)
          .then((res) => {
            const { accessToken, user } = res.data;
            this.user = user;
            sessionStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("userId", user.id);
            sessionStorage.setItem("first_token", "null");

            console.log(res.data);

            return Swal.fire({
              icon: "success",
              title: "登入成功",
            });
          })
          .then(() => {
            this.isLogin = true;
            router.push("/user");
          })
          .catch((err) => {
            console.log(err.response);

            const { data } = err.response;
            console.log(err);
            console.log(data);
            if (data === "Incorrect password") {
              return Swal.fire({
                icon: "error",
                title: "密碼錯誤",
              });
            } else if (data === "Cannot find user") {
              return Swal.fire({
                icon: "error",
                title: "此帳號未註冊",
              });
            }
          })
          .then(() => {
            AddIdentifyLetter();
          });
      } else {
        // 驗證失敗
        Swal.fire({
          icon: "error",
          title: "驗證失敗",
        }).then(() => {
          AddIdentifyLetter();
        });
      }
    },
    checkLogin() {
      if (
        sessionStorage.getItem("accessToken") &&
        sessionStorage.getItem("userId")
      ) {
        this.isLogin = true;
        this.getUserData();
      } else {
        this.isLogin = false;
      }
    },
    overLogin() {
      Swal.fire({
        icon: "error",
        title: "登入超時",
      }).then(() => {
        router.push("/login");
      });
    },
    register(userInput) {
      const { email, password, name: userName } = userInput;
      const data = {
        email,
        password,
        name: userName,
        avatarUrl: "",
        tel: "",
        isAdmin: false,
        amountSpent: 0,
        level: 1,
        shoppingCart: {
          discount: "",
          cart: [],
        },
      };
      axios
        .post(`${VITE_BASEURL}/users`, data)
        .then((res) => {
          console.log(res.data);
          return Swal.fire({
            icon: "success",
            title: "註冊成功",
          });
        })
        .then(() => {
          this.isLogin = true;
          router.push("/user");
        })
        .catch((err) => {
          if (err.response.data === "Email already exists") {
            Swal.fire({
              icon: "error",
              title: "該帳號已註冊",
            });
          }
        });
      console.log("註冊");
    },
    signOut() {
      console.log("登出");
      Swal.fire({
        icon: "success",
        title: "登出成功",
      }).then(() => {
        sessionStorage.clear();
        this.isLogin = false;
      });
      console.log(this.isLogin);
    },
  },
  getters: {},
});
