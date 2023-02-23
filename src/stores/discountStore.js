import axios from "axios";
import { defineStore } from "pinia";
const { VITE_BASEURL } = import.meta.env;

export default defineStore("discountStore", {
  state: () => ({
    discountData: {},
  }),
  actions: {
    getDiscountData() {
      axios.get(`${VITE_BASEURL}/discount`)
      .then(res => this.discountData = res.data);
    },
  },
});
