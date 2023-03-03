import axios from "axios";
import Swal from "sweetalert2";
import { defineStore } from "pinia";
const { VITE_BASEURL } = import.meta.env;
export default defineStore("ordersStore", {
  state: () => ({
    orders: [],
  }),
  actions: {
    getOrdersData() {
      axios.get(`${VITE_BASEURL}/orders?_expand=user`).then((res) => {
        this.orders = res.data;
      });
    },
  },
});
