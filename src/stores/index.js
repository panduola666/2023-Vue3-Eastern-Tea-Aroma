import userStore from "./userStore";
import coursesStore from "./coursesStore";
import updatedImgStore from "./updatedImgStore";
import discountStore from "./discountStore";
import ordersStore from "./ordersStore";
import productsStore from "./productsStore";
const toThousand = (money) =>
  money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

export {
  userStore,
  coursesStore,
  updatedImgStore,
  discountStore,
  ordersStore,
  productsStore,
  toThousand,
};
