<template>
  <DialogModal>
    <template #modal-btn>
      <slot name="btn-content">按鈕</slot>
    </template>
    <template #modal-header>
      <h3 class="text-xl font-self">茶葉的風味鑑賞學/新增文章</h3>
    </template>
    <template #modal-body>
      <div class="flex flex-col-reverse lg:flex-row gap-3">
        <div>
          <div
            class="flex flex-col gap-3 lg:w-96 h-[75vh] overflow-x-hidden px-3"
          >
            <p class="font-semibold">
              * 封面
              <span class="float-right text-gray-02 font-normal">
                <button
                  type="button"
                  class="mr-2 hover:underline hover:text-gray-01 underline text-gray-01"
                >
                  本地圖片
                </button>
                <button
                  type="button"
                  class="hover:underline hover:text-gray-01"
                >
                  雲端圖片
                </button>
              </span>
            </p>
            <img
              src="../assets/課堂04.png"
              alt=""
              class="w-full object-cover max-h-[300px]"
            />
            <input
              type="text"
              name=""
              id=""
              class="border border-gray-01 p-2"
              placeholder="請輸入圖片網址..."
              aria-label="雲端圖片輸入框"
            />
            <label class="btn-primary cursor-pointer relative"
              >上傳圖片
              <input type="file" name="" id="" class="absolute opacity-0" />
            </label>
            <p>活動圖片</p>
            <label class="btn-outline text-center cursor-pointer relative"
              >新增圖片
              <input
                type="file"
                name=""
                id=""
                class="absolute opacity-0"
                multiple
              />
            </label>
            <button type="button" class="btn-outline">刪除圖片</button>
          </div>
        </div>
        <div class="flex-grow lg:border-l-2 flex flex-col gap-3 lg:px-3">
          <div class="grid lg:grid-cols-2 gap-3">
            <label for="" class=""
              >* 課程
              <select name="" id="" class="border border-gray-01 p-2 w-full">
                <option value="" disabled>請選擇課程</option>
                <option value="茶葉的風味鑑賞學">茶葉的風味鑑賞學</option>
              </select>
            </label>
            <div>
              <label for="">新增課程</label>
              <div class="flex gap-3">
                <input
                  type="text"
                  name=""
                  id=""
                  class="border border-gray-01 p-2 w-full"
                  placeholder="請輸入課程名稱..."
                />
                <button
                  type="button"
                  class="btn-outline p-1 px-2 flex-shrink-0"
                >
                  確認
                </button>
              </div>
            </div>
          </div>
          <div class="grid lg:grid-cols-2 gap-3">
            <div>
              <p>* 時段選擇</p>
              <v-date-picker
                class="inline-block w-full"
                v-model="date"
                color="teal"
              >
                <template v-slot="{ inputValue, togglePopover }">
                  <div class="flex items-center">
                    <button
                      class="p-2 bg-brand-01 bg-opacity-10 border border-brand-01 hover:bg-opacity-30 rounded-l focus:bg-brand-02 focus:border-brand-02 focus:outline-none group"
                      @click="togglePopover()"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        class="w-4 h-4 fill-brand-01 group-focus:fill-white"
                      >
                        <path
                          d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
                        ></path>
                      </svg>
                    </button>
                    <input
                      :value="inputValue"
                      class="bg-white text-gray-01 w-full py-1 px-2 appearance-none border border-brand-03 rounded-r focus:outline-none focus:border-brand-02"
                      readonly
                    />
                  </div>
                </template>
              </v-date-picker>
            </div>
            <div class="bg-gray-03 bg-opacity-20 flex flex-col p-2 gap-2">
              <div class="flex gap-3 items-center">
                <span class="flex-shrink-0">開始:</span>
                <label for="" class="flex flex-grow"
                  ><select name="" id="" class="flex-grow">
                    <option value="" v-for="i in 10" :key="i">
                      {{ i + 12 }}
                    </option></select
                  >時</label
                >
                <label for="" class="flex flex-grow"
                  ><select name="" id="" class="flex-grow">
                    <option
                      value=""
                      v-for="i in ['00', '15', '30', '45']"
                      :key="i"
                    >
                      {{ i }}
                    </option></select
                  >分</label
                >
              </div>
              <div class="flex gap-3 items-center">
                <span class="flex-shrink-0">結束:</span>
                <label for="" class="flex flex-grow"
                  ><select name="" id="" class="flex-grow">
                    <option value="" v-for="i in 10" :key="i">
                      {{ i + 12 }}
                    </option></select
                  >時</label
                >
                <label for="" class="flex flex-grow"
                  ><select name="" id="" class="flex-grow">
                    <option
                      value=""
                      v-for="i in ['00', '15', '30', '45']"
                      :key="i"
                    >
                      {{ i }}
                    </option></select
                  >分</label
                >
              </div>
            </div>
          </div>
          <div class="grid lg:grid-cols-2 gap-3">
            <label for="" class="grid"
              >* 價格<input
                type="number"
                name=""
                id=""
                class="border border-gray-01 p-2 w-full"
                placeholder="請輸入價格..."
            /></label>
            <label for="" class="grid"
              >* 開課人數<input
                type="number"
                name=""
                id=""
                class="border border-gray-01 p-2 w-full"
                placeholder="請輸入人數..."
            /></label>
          </div>
          <div>
            <p class="mb-3">
              * 課程簡介
              <button
                type="button"
                class="text-brand-01 font-bold text-3xl float-right opacity-60 hover:opacity-100"
              >
                +
              </button>
            </p>
            <ul class="list-decimal list-inside introduce grid gap-5">
              <li>
                <input
                  type="text"
                  name=""
                  id=""
                  class="border-b border-gray-01 w-[95%]"
                  placeholder="例:認識主流茶葉的特性與風味 / 學習基本茶桌禮儀 ..."
                />
              </li>
              <li>
                <input
                  type="text"
                  name=""
                  id=""
                  class="border-b border-gray-01 w-[95%]"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
    <template #modal-footer></template>
  </DialogModal>
</template>
<script>
import DialogModal from '../components/DialogModal.vue'

export default {
  data() {
    return {
      date: new Date()
    }
  },
  components: {
    DialogModal
  }
}
</script>
