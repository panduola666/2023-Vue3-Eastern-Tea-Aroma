<template>
  <div>
    <DialogModal :finishFn="showEditor">
      <template #modal-btn>
        <slot name="btn-content">按鈕</slot>
      </template>
      <template #modal-header>
        <h2 class="text-xl font-black font-self text-brand-02">
          新增活動/編輯活動
        </h2>
      </template>
      <template #modal-body>
        <div class="flex flex-col-reverse lg:flex-row gap-3">
          <div
            class="flex flex-col gap-3 lg:w-96 lg:h-full h-[75vh] overflow-x-hidden px-3"
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
              :alt="activitiesData.title"
              class="w-full object-cover"
            />
            <img
              v-else-if="imageStyle === '雲端圖片'"
              :src="activitiesData.coverUrl"
              :alt="activitiesData.title"
              class="w-full object-cover"
            />
            <label for="imgUrl" v-if="imageStyle === '雲端圖片'"
              >網址<input
                type="text"
                name="imgUrl"
                id="imgUrl"
                v-model="activitiesData.coverUrl"
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
            <label for="" class="grid"
              >* 標題
              <input
                type="text"
                name=""
                id=""
                class="border border-gray-01 p-2 w-full"
                placeholder="請輸入商品名稱..."
            /></label>
            <div>
              <p>* 分類</p>
              <div class="flex gap-3">
                <label for=""
                  ><input type="radio" name="分類" id="" />優惠</label
                >
                <label for=""
                  ><input type="radio" name="分類" id="" />活動</label
                >
                <label for=""
                  ><input type="radio" name="分類" id="" />展覽</label
                >
              </div>
            </div>
            <div class="flex-grow">
              <p>* 活動內容</p>
              <ckeditor
                :editor="editor"
                v-model="editorData"
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
import { updatedImgStore } from '../stores/index'
const { VITE_BASEURL } = import.meta.env
// import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline'
export default {
  data: () => ({
    imageStyle: '雲端圖片',
    activitiesData: {
      coverUrl: '',
      title: ''
    },
    editor: ClassicEditor,
    editorData: '<p>Hello world!!</p>',
    editorConfig: {
      toolbar: ['bold', 'italic', 'blockQuote', '|', 'undo', 'redo']
    },
    isImgurLogin: sessionStorage.getItem('first_token') !== 'null'
  }),
  computed: {
    ...mapState(updatedImgStore, ['imgUrl'])
  },
  methods: {
    ...mapActions(updatedImgStore, ['postFinal']),
    showEditor() {
      console.log(this.editorData)
    }
  },
  components: {
    DialogModal
  }
}
</script>
<style>
.ck-content {
  min-height: 10rem;
}
</style>
