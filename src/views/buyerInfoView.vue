<template>
  <main>
    <div class="wrap">
      <h1 class="text-3xl font-black font-self text-brand-02">
        購買人資訊
      </h1>
      <form action="" class="flex flex-col text-lg">
        <label
          for=""
          class="text-xl text-brand-02 font-self font-semibold mt-4"
          >購買人</label
        >
        <input
          type="text"
          name=""
          id=""
          class="px-2 py-1"
          placeholder="請輸入姓名..."
          required
        />
        <label
          for=""
          class="text-xl text-brand-02 font-self font-semibold mt-4"
          >手機號碼</label
        >
        <input
          type="tel"
          name=""
          id=""
          class="px-2 py-1"
          placeholder="請輸入手機號碼..."
          required
        />
        <p class="text-xl text-brand-02 font-self font-semibold mt-4">
          取貨方式
        </p>
        <label for="自取"
          ><input type="radio" name="receive" id="自取" checked />自取</label
        >
        <label for="店家寄件"
          ><input type="radio" name="receive" id="店家寄件" required /> 店家寄件
          <span class="text-gray-02">(運費 100 元，滿 999 即享免運優惠)</span>
        </label>
        <form-box>
          <label for="">地址</label>
          <input
            type="text"
            class="px-2 py-1"
            placeholder="請輸入寄件地址..."
            required
          />
        </form-box>
        <p class="text-xl text-brand-02 font-self font-semibold mt-4">
          付款方式
        </p>
        <label for="貨到付款"
          ><input
            type="radio"
            name="payment"
            id="貨到付款"
            checked
          />貨到付款</label
        >
        <label for="信用卡"
          ><input type="radio" name="payment" id="信用卡" />信用卡</label
        >
        <form-box>
          <label for="">卡號</label>
          <input
            type="number"
            name=""
            id=""
            class="px-2 py-1"
            placeholder="請輸入卡號..."
            required
          />
          <div class="flex flex-col">
            <label for="">到期日</label>
            <div>
              <input
                type="number"
                name=""
                id=""
                class="w-1/4 px-2 py-1"
                placeholder="日"
                maxlength="2"
                required
              />
              <span class="mx-2">/</span>
              <input
                type="number"
                name=""
                id=""
                class="w-1/4 px-2 py-1"
                placeholder="月"
                maxlength="2"
                required
              />
            </div>
            <label for="">安全碼</label>
            <input
              type="number"
              class="w-1/4 px-2 py-1"
              placeholder="請輸入安全碼..."
              required
            />
          </div>
        </form-box>
        <total-price class="mt-10"></total-price>
      </form>
    </div>
  </main>
</template>
<script>
import TotalPrice from "../components/TotalPrice.vue";
import FormBox from "../components/FormBox.vue";
export default {
  components: {
    TotalPrice,
    FormBox,
  },
};
</script>
