import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
import router from "../router";
const { VITE_BASEURL, VITE_POSTIMG_URL, VITE_POSTIMG_PATH } = import.meta.env;

export default defineStore("userDataStore", {
  state: () => ({
    user: {},
    isLogin: false,
    postLogin: false,
  }),
  actions: {
    getUserData() {
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
          console.log(err.response);
          if (err.response.data === "jwt expired") {
            Swal.fire({
              icon: "error",
              title: "登入超時",
            }).then(() => {
              sessionStorage.clear();
              this.isLogin = false;
              router.push("/login");
            });
          }
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
      if (!sessionStorage.getItem("accessToken")) {
        this.isLogin = false;
        return;
      }
      this.getUserData();
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
    postAvatar(e) {
      const file = e.target.files[0];
      if (!file) return;
      this.postLogin = true;
      const formData = new FormData();
      formData.append("userAvatar", file);
      axios
        .post(`${VITE_POSTIMG_URL}/admin/signin`, {
          username: "panduola666@gmail.com",
          password: "BTyouxi666",
        })
        .then((res) => {
          const postImg = axios.create();
          postImg.defaults.headers.common.Authorization = res.data.token;
          return postImg.post(
            `${VITE_POSTIMG_URL}/api/${VITE_POSTIMG_PATH}/admin/upload`,
            formData
          );
        })
        .then((res) => {
          this.user.avatarUrl = res.data.imageUrl;
          return axios.patch(
            `${VITE_BASEURL}/users/${sessionStorage.getItem("userId")}`,
            { avatarUrl: res.data.imageUrl }
          );
        })
        .then(() => {
          this.postLogin = false;
          this.getUserData();
        })
        .catch((err) => {
          console.log("postAvatar 出事拉");
          console.log(err);
          if (err.message === "Network Error") {
            Swal.fire({
              icon: "error",
              title: "當前網路異常，請重新嘗試",
            });
            this.postLogin = false;
          }
        });
    },
  },
  getters: {},
});
