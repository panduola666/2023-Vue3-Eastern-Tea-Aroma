import axios from "axios";
import { defineStore } from "pinia";
const { VITE_BASEURL } = import.meta.env;
export default defineStore("coursesStore", {
  state: () => ({
    courses: [],
  }),
  actions: {
    async getCoursesData() {
      const res = await axios.get(`${VITE_BASEURL}/courses?_expand=user`);
      this.courses = res.data;
    },
    saved(id){
        console.log('收藏: '+id);
    },
  },
  getters: {},
});
