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
          <div class="flex flex-col gap-3 lg:w-96 h-[75vh] overflow-x-hidden px-3">
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
            <img src="../assets/課堂04.png" alt="" class="w-full object-cover" />
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
        <div class=" flex-grow lg:border-l-2 flex flex-col gap-3 lg:px-3">
          <label for="" class="grid"
            >* 標題
            <input
              type="text"
              name=""
              id=""
              class="border border-gray-01 p-2 w-full"
              placeholder="請輸入課程名稱..."
          /></label>
          <div>
            <p>* 時段選擇</p>
            <v-date-picker
              v-model="range"
              mode="dateTime"
              :masks="masks"
              is-range
            >
              <template v-slot="{ inputValue, inputEvents, isDragging }">
                <div
                  class="flex flex-col sm:flex-row justify-start items-center"
                >
                  <div class="relative flex-grow">
                    <svg
                      class="text-gray-600 w-4 h-full mx-2 absolute pointer-events-none"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <input
                      class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
                      :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                      :value="inputValue.start"
                      v-on="inputEvents.start"
                    />
                  </div>
                  <span class="flex-shrink-0 m-2">
                    <svg
                      class="w-4 h-4 stroke-current text-gray-600"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                  <div class="relative flex-grow">
                    <svg
                      class="text-gray-600 w-4 h-full mx-2 absolute pointer-events-none"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <input
                      class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
                      :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                      :value="inputValue.end"
                      v-on="inputEvents.end"
                    />
                  </div>
                </div>
              </template>
            </v-date-picker>
          </div>
          <div class="grid lg:grid-cols-2 lg:gap-7 gap-3">
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
import DialogModal from "../components/DialogModal.vue";

export default {
  data() {
    return {
      range: {
        start: new Date(),
        end: new Date(),
      },
      masks: {
        input: "YYYY-MM-DD h:mm A",
      },
    };
  },
  components: {
    DialogModal,
  },
};
</script>
