<template>
  <div>
    <DialogModal
      :finish-fn="finishFn"
      :cancel-fn="cancelFn"
      :is-finish="isFinish"
    >
      <template #modal-btn>
        <div @click="() => (isFinish = false)">
          <slot name="btn-content">按鈕</slot>
        </div>
      </template>
      <template #modal-header>
        <h2 class="text-xl font-black font-self text-brand-02">
          {{ isNew ? '新增活動' : activity.title }}
        </h2>
      </template>
      <template #modal-body>
        <div class="flex flex-col-reverse lg:flex-row gap-3">
          <div
            class="flex flex-col gap-3 lg:w-96 lg:h-full h-[75vh] overflow-x-hidden px-3 flex-shrink-0"
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
            <label for="title" class="grid"
              >* 標題
              <input
                type="text"
                name="title"
                id="title"
                class="border border-gray-01 p-2 w-full"
                placeholder="請輸入商品名稱..."
                v-model="activitiesData.title"
            /></label>
            <div>
              <p>* 分類</p>
              <div class="flex md:gap-5 gap-3 text-lg">
                <label
                  :for="item + index"
                  v-for="(item, index) in ['活動', '優惠', '展覽']"
                  :key="item + index"
                  ><input
                    type="radio"
                    name="type"
                    class="scale-110"
                    :id="item + index"
                    :value="item"
                    v-model="activitiesData.type"
                  />{{ item }}</label
                >
              </div>
            </div>
            <div class="flex-grow">
              <p>* 活動內容</p>
              <ckeditor
                :editor="editor"
                v-model="activitiesData.content"
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
import { updatedImgStore, activitiesStore } from '../stores/index'
const { VITE_BASEURL } = import.meta.env
export default {
  props: {
    isNew: {
      typeof: Boolean,
      required: true
    },
    activityId: {
      typeof: Number
    }
  },
  data: () => ({
    imageStyle: '雲端圖片',
    activitiesData: {
      coverUrl: '',
      title: '',
      type: '活動',
      content: ''
    },
    editor: ClassicEditor,
    editorConfig: {
      placeholder: '請輸入活動內容...',
      toolbar: ['bold', 'italic', 'blockQuote', '|', 'undo', 'redo']
    },
    isImgurLogin: sessionStorage.getItem('first_token') !== 'null',
    isFinish: false
  }),
  computed: {
    ...mapState(updatedImgStore, ['imgUrl']),
    ...mapState(activitiesStore, ['activity'])
  },
  methods: {
    ...mapActions(updatedImgStore, ['postFinal']),
    ...mapActions(activitiesStore, [
      'getAllActivitiesData',
      'getCurrentActivity'
    ]),
    finishFn() {
      const { content, title } = this.activitiesData
      if (this.imageStyle === '本地圖片') {
        this.activitiesData.coverUrl = this.imgUrl
      }
      if (this.imageStyle === '本地圖片' && !this.imgUrl) {
        this.$swal.fire({
          icon: 'error',
          title: '還未上傳本地圖片',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }
      // 基本驗證
      if (!title) {
        this.$swal.fire({
          icon: 'error',
          title: '活動標題 未填寫',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }
      if (!this.activitiesData.coverUrl) {
        this.$swal.fire({
          icon: 'error',
          title: '請選擇活動封面',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }
      if (!content) {
        this.$swal.fire({
          icon: 'error',
          title: '活動內容 未填寫',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }

      if (this.isNew) {
        // 新增
        this.activitiesData.created = new Date().getTime()
        this.$http
          .post(`${VITE_BASEURL}/activities`, this.activitiesData)
          .then(() => {
            this.$swal.fire({
              icon: 'success',
              title: '活動新增成功',
              showConfirmButton: false,
              timer: 1500
            })
            this.getAllActivitiesData()
            this.activitiesData = this.$options.data().activitiesData
          })
      } else {
        // 編輯
        this.$http
          .patch(
            `${VITE_BASEURL}/activities/${this.activitiesData.id}`,
            this.activitiesData
          )
          .then(() => {
            this.$swal.fire({
              icon: 'success',
              title: '編輯成功',
              showConfirmButton: false,
              timer: 1500
            })
            this.getAllActivitiesData()
          })
      }
      this.isFinish = true
    },
    cancelFn() {
      this.activitiesData = this.$options.data().activitiesData
    }
  },
  watch: {
    activity: {
      handler() {
        if (this.isNew) return
        this.activitiesData = { ...this.activity }
      },
      deep: true
    },
    activityId(id) {
      this.getCurrentActivity(id)
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
