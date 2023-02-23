import axios from "axios";
import Swal from "sweetalert2";
import { defineStore } from "pinia";
const { VITE_BASEURL } = import.meta.env;
import { userStore } from "./index.js";
export default defineStore("coursesStore", {
  state: () => ({
    courses: [],
    currentCourse: {},
  }),
  actions: {
    async getCoursesData() {
      const res = await axios.get(
        `${VITE_BASEURL}/courses?_expand=user&_embed=courseDates`
      );
      this.courses = res.data;
    },
    patchSaved(courseDate) {
      const user = userStore();
      if (!user.isLogin) return;
      const { savedUsersId } = courseDate;
      const isSaved = savedUsersId.includes(+sessionStorage.getItem("userId"));
      if (isSaved) {
        // 移除
        const index = savedUsersId.findIndex(
          (item) => item === +sessionStorage.getItem("userId")
        );
        savedUsersId.splice(index, 1);
      } else {
        // 添加
        savedUsersId.push(+sessionStorage.getItem("userId"));
      }
      Swal.fire({
        icon: "success",
        title: isSaved ? "已移出收藏夾" : "已收藏",
        allowOutsideClick: false,
        showConfirmButton: false,
        timer: 1500,
      });
      axios
        .put(`${VITE_BASEURL}/courseDates/${courseDate.id}`, courseDate)
        .then((res) => {
          this.getCoursesData();
          console.log(res.data);
        });
    },
  },
  getters: {},
});
