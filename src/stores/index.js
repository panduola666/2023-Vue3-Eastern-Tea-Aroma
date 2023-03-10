import userStore from './userStore.js'
import coursesStore from './coursesStore.js'
import updatedImgStore from './updatedImgStore.js'
import discountStore from './discountStore.js'
import ordersStore from './ordersStore.js'
import productsStore from './productsStore.js'
import activitiesStore from './activitiesStore.js'
import vueLoadingStore from './vueLoadingStore.js'
const toThousand = (money) => {
  return money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
}

export {
  userStore,
  coursesStore,
  updatedImgStore,
  discountStore,
  ordersStore,
  productsStore,
  toThousand,
  activitiesStore,
  vueLoadingStore
}
