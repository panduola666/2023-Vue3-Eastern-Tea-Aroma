<template>
  <div>
    <DialogModal>
      <template #modal-btn>
        <slot name="btn-content">按鈕</slot>
      </template>
      <template #modal-header>
        <h3 class="text-xl font-self">新增折扣碼</h3>
      </template>
      <template #modal-body>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col">
            <label for="">* 折扣碼</label>
            <input
              type="text"
              name=""
              id=""
              placeholder="請輸入折扣碼..."
              class="border border-gray-01 p-2 shadow-lg"
            />
          </div>
          <div class="flex flex-col">
            <label for="" class="">* 折扣方式</label>
            <select name="" id="" class="border border-gray-01 p-2 shadow-lg">
              <option value="" selected disabled hidden>請選擇折扣方式</option>
              <option value="百分比">百分比</option>
              <option value="實際金額">實際金額</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-6">
            <div class="flex flex-col">
              <label for="" class="">* 截止日期</label>

              <v-date-picker class="inline-block flex-grow" v-model="date" color="teal">
                <template v-slot="{ inputValue, togglePopover }">
                  <div
                    class="flex items-center border border-gray-01 shadow-lg h-full"
                  >
                    <button
                      class="p-2 bg-brand-01 bg-opacity-10 border-r border-gray-01 hover:bg-opacity-30 focus:bg-brand-02 focus:outline-none group h-full"
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
                      class="bg-white text-gray-700 border w-full py-1 px-2 appearance-none focus:outline-none h-full"
                      readonly
                    />
                  </div>
                </template>
              </v-date-picker>
            </div>
            <div class="flex flex-col">
              <label for="">* 折扣額度</label>
              <input
                type="text"
                name=""
                id=""
                placeholder="請輸入金額..."
                class="border border-gray-01 p-2 shadow-lg"
              />
            </div>
            <!-- <div class="flex flex-col">
              <label for="">* 折扣額度</label>
              <select name="" id="" class="border border-gray-01 p-2">
                <option value="" selected disabled hidden>
                  請選擇折扣比例
                </option>
                <option value="95 折">95 折</option>
                <option value="9 折">9 折</option>
                <option value="85 折">85 折</option>
                <option value="8 折">8 折</option>
                <option value="75 折">75 折</option>
              </select>
            </div> -->
          </div>
          <div class="bg-brand-03 bg-opacity-30 py-5 px-3 m-10">
            <table class="w-full text-center">
              <caption class="text-xl">
                優惠資訊
              </caption>
              <tr class="border-b border-b-gray-01">
                <th class="p-2">折扣碼</th>
                <th>折扣方式</th>
                <th>截止日期</th>
                <th>折扣額度</th>
              </tr>
              <tr class="text-2xl">
                <td class="p-2">adasd</td>
                <td>百分比</td>
                <td :class="{ 'text-red-500': date < new Date().getTime() }">
                  {{
                    new Date(date).toLocaleDateString().replace(/\//g, " - ")
                  }}
                </td>
                <td>92 折</td>
              </tr>
            </table>
            <p
              v-if="date < new Date().getTime()"
              class="text-red-500 mt-5 text-xl font-bold text-end"
            >
              * 截止日期不可小於今日
            </p>
          </div>
        </div>
      </template>
    </DialogModal>
  </div>
</template>
<script>
import DialogModal from "./DialogModal.vue";
export default {
  data() {
    return {
      date: new Date(),
    };
  },
  computed: {
    endDate() {
      const dateArr = new Date(this.date).toLocaleDateString().split("/");
      const date = new Date(...dateArr);
      return date;
    },
  },
  components: {
    DialogModal,
  },
};
</script>
