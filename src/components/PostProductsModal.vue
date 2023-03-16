<template>
  <div>
    <DialogModal :finish-fn="finishFn" :cancel-fn="cancelFn">
      <template #modal-btn>
        <slot name="btn-content">按鈕</slot>
      </template>
      <template #modal-header>
        <h2 class="text-xl font-black font-self text-brand-02">
          {{ isNew ? '新增商品' : '編輯商品' }}
        </h2>
      </template>
      <template #modal-body>
        <div class="flex flex-col-reverse lg:flex-row gap-3">
          <div
            class="flex flex-col flex-shrink-0 gap-3 lg:w-96 lg:h-full h-[75vh] overflow-x-hidden px-3"
          >
            <p class="font-semibold">
              * 封面
              <span class="float-right text-gray-02 font-normal">
                <button
                  type="button"
                  class="mr-2 hover:underline hover:text-gray-01"
                  :class="{
                    'underline text-gray-01': imageStyle === '本地圖片'
                  }"
                  @click="
                    () => {
                      imageStyle = '本地圖片'
                    }
                  "
                >
                  本地圖片
                </button>
                <button
                  type="button"
                  class="hover:underline hover:text-gray-01"
                  :class="{
                    'underline text-gray-01': imageStyle === '雲端圖片'
                  }"
                  @click="() => (imageStyle = '雲端圖片')"
                >
                  雲端圖片
                </button>
              </span>
            </p>
            <img
              v-if="imageStyle === '本地圖片' && imgUrl"
              :src="imgUrl"
              :alt="currentData.name"
              class="w-full object-cover"
            />
            <img
              v-else-if="imageStyle === '雲端圖片'"
              :src="currentData.coverUrl"
              :alt="currentData.name"
              class="w-full object-cover"
            />
            <label for="imgUrl" v-if="imageStyle === '雲端圖片'"
              >網址<input
                type="text"
                name="imgUrl"
                id="imgUrl"
                v-model="currentData.coverUrl"
                class="border border-gray-01 p-2 w-full"
                placeholder="請輸入圖片網址..."
                aria-label="雲端圖片輸入框"
            /></label>
            <div class="flex flex-col gap-3" v-else>
              <label
                for="updateImg"
                class="btn-primary cursor-pointer relative"
                v-if="isImgurLogin"
                >上傳圖片
                <input
                  type="file"
                  name="updateImg"
                  accept=".png"
                  id="updateImg"
                  class="absolute opacity-0"
                  @change="($event) => postFinal($event)"
                />
              </label>
              <router-link to="/admin" class="btn-primary" v-else
                >取得驗證</router-link
              >
            </div>
          </div>
          <div class="flex-grow lg:border-l-2 flex flex-col gap-3 lg:px-3">
            <label for="name" class="grid"
              >* 標題
              <input
                type="text"
                name="name"
                id="name"
                class="border border-gray-01 p-2 w-full"
                v-model="currentData.name"
                placeholder="請輸入商品名稱..."
            /></label>
            <div>
              <p>
                <label for="type">* 商品系列 </label>
                <button
                  type="button"
                  class="text-brand-01 font-bold text-3xl float-right opacity-60 hover:opacity-100"
                  v-if="!isNewTypeOpen"
                  @click="() => (isNewTypeOpen = true)"
                >
                  +
                </button>
                <button
                  type="button"
                  class="text-brand-01 font-bold text-[35px] leading-8 float-right opacity-60 hover:opacity-100"
                  v-else
                  @click="() => (isNewTypeOpen = false)"
                >
                  -
                </button>
              </p>
              <p
                class="bg-brand-06 bg-opacity-40 my-2 p-3"
                v-if="isNewTypeOpen"
              >
                <label for="newType"
                  >新增系列
                  <input
                    name="newType"
                    id="newType"
                    type="text"
                    class="border border-gray-01 p-2 w-full mt-3"
                    v-model="newTypeInput"
                  />
                </label>
                <span class="text-end block">
                  <button
                    type="button"
                    class="btn-outline py-1 mt-3 mr-3"
                    @click="() => (isNewTypeOpen = false)"
                  >
                    取消
                  </button>
                  <button
                    type="button"
                    class="btn-outline py-1 mt-3"
                    @click="() => addNewType()"
                  >
                    新增
                  </button>
                </span>
              </p>
              <select
                name="type"
                id="type"
                class="border border-gray-01 p-2 w-full"
                v-model="currentData.type"
              >
                <option value="" selected disabled>請選擇商品系列</option>
                <option
                  :value="type"
                  v-for="(typeNumber, type) in productTypes"
                  :key="type + typeNumber"
                >
                  {{ type }}
                </option>
              </select>
            </div>
            <div>
              <p>
                <label for="group">* 商品分類 </label>
                <button
                  type="button"
                  class="text-brand-01 font-bold text-3xl float-right opacity-60 hover:opacity-100"
                  v-if="!isNewGroupOpen"
                  @click="() => (isNewGroupOpen = true)"
                >
                  +
                </button>
                <button
                  type="button"
                  class="text-brand-01 font-bold text-[35px] leading-8 float-right opacity-60 hover:opacity-100"
                  v-else
                  @click="() => (isNewGroupOpen = false)"
                >
                  -
                </button>
              </p>
              <p
                class="bg-brand-06 bg-opacity-40 my-2 p-3"
                v-if="isNewGroupOpen"
              >
                <label for="newGroup"
                  >新增分類
                  <input
                    name="newGroup"
                    id="newGroup"
                    type="text"
                    class="border border-gray-01 p-2 w-full mt-3"
                    v-model="newGroupInput"
                  />
                </label>
                <span class="text-end block">
                  <button
                    type="button"
                    class="btn-outline py-1 mt-3 mr-3"
                    @click="() => (isNewGroupOpen = false)"
                  >
                    取消
                  </button>
                  <button
                    type="button"
                    class="btn-outline py-1 mt-3"
                    @click="addNewGroup"
                  >
                    新增
                  </button>
                </span>
              </p>
              <select
                name="group"
                id="group"
                class="border border-gray-01 p-2 w-full"
                v-model="currentData.group"
              >
                <option value="" selected disabled>請選擇商品分類</option>
                <option
                  :value="type"
                  v-for="(typeNumber, type) in productGroups"
                  :key="type + typeNumber"
                >
                  {{ type }}
                </option>
              </select>
            </div>
            <div class="grid lg:grid-cols-2 lg:gap-7 gap-3">
              <label for="price" class="grid"
                >* 價格<input
                  type="number"
                  name="price"
                  id="price"
                  class="border border-gray-01 p-2 w-full"
                  placeholder="請輸入價格..."
                  min="1"
                  onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                  v-model.number="currentData.price"
              /></label>
              <label for="totalNumber" class="grid"
                >* 數量<input
                  type="number"
                  name="totalNumber"
                  id="totalNumber"
                  class="border border-gray-01 p-2 w-full"
                  placeholder="請輸銷售數量..."
                  v-model.number="currentData.totalNumber"
                  min="1"
                  onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
              /></label>
            </div>
            <div>
              <p class="mb-3">* 商品介紹</p>
              <ckeditor
                :editor="editor"
                v-model="currentData.content"
                :config="editorConfig"
              ></ckeditor>
            </div>
          </div>
        </div>
      </template>
      <template #modal-footer></template>
    </DialogModal>
  </div>
</template>
<script>
import DialogModal from './DialogModal.vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { mapState, mapActions } from 'pinia'
import { updatedImgStore, productsStore } from '../stores/index'
const { VITE_BASEURL } = import.meta.env
export default {
  props: {
    isNew: {
      type: Boolean,
      default: false
    },
    productData: {
      type: Object
    },
    productGroups: {
      type: Object,
      required: true
    },
    productTypes: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    imageStyle: '雲端圖片',
    currentData: {
      coverUrl: '',
      type: '',
      group: '',
      name: '',
      price: 100,
      totalNumber: 10,
      content: '',
      isDiscount: false
    },
    editor: ClassicEditor,
    editorConfig: {
      placeholder: '請輸入商品介紹...',
      toolbar: ['bold', 'italic', 'blockQuote', '|', 'undo', 'redo']
    },
    isImgurLogin: sessionStorage.getItem('first_token') !== 'null',
    isNewTypeOpen: false,
    isNewGroupOpen: false,
    newTypeInput: '',
    newGroupInput: ''
  }),
  computed: {
    ...mapState(updatedImgStore, ['imgUrl'])
  },
  methods: {
    ...mapActions(updatedImgStore, ['postFinal']),
    ...mapActions(productsStore, [
      'getAllProducts',
      'pushNewType',
      'pushNewGroup'
    ]),
    finishFn() {
      const { type, group, name, price, totalNumber, content } =
        this.currentData
      if (this.imageStyle === '本地圖片') {
        this.currentData.coverUrl = this.imgUrl
      }
      // 簡單驗證
      if (this.imageStyle === '本地圖片' && !this.imgUrl) {
        this.$swal.fire({
          icon: 'error',
          title: '還未上傳本地圖片',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }
      if (!type || !group || !name || !content) {
        this.$swal.fire({
          icon: 'error',
          title: '內容未填寫完成',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }
      if (price < 1 || totalNumber < 1) {
        this.$swal.fire({
          icon: 'error',
          title: '價格及數量不可小於 1',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }
      if (this.isNew) {
        // 新增
        this.$http
          .post(`${VITE_BASEURL}/products`, this.currentData)
          .then(() => {
            this.$swal.fire({
              icon: 'success',
              title: '商品新增成功',
              showConfirmButton: false,
              timer: 1500
            })
            this.getAllProducts()
            this.currentData = this.$options.data().currentData
          })
      } else {
        // 編輯
        console.log(this.currentData)
        this.$http
          .patch(
            `${VITE_BASEURL}/products/${this.currentData.id}`,
            this.currentData
          )
          .then(() => {
            this.$swal.fire({
              icon: 'success',
              title: '商品編輯成功',
              showConfirmButton: false,
              timer: 1500
            })
            this.getAllProducts()
          })
      }
    },
    cancelFn() {
      if (this.isNew) {
        this.currentData = this.$options.data().currentData
      } else {
        this.currentData = { ...this.productData }
      }
    },
    addNewType() {
      this.currentData.type = this.newTypeInput
      this.isNewTypeOpen = false
      if (!this.productTypes[this.newTypeInput]) {
        this.pushNewType(this.newTypeInput)
      }
      this.newTypeInput = ''
    },
    addNewGroup() {
      this.currentData.group = this.newGroupInput
      this.isNewGroupOpen = false
      if (!this.productGroups[this.newGroupInput]) {
        this.pushNewGroup(this.newGroupInput)
      }
      this.newGroupInput = ''
    }
  },
  watch: {
    productData() {
      this.currentData = { ...this.productData }
    }
  },
  components: {
    DialogModal
  }
}
</script>
