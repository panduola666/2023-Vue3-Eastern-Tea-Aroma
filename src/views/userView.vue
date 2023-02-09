<template>
  <main class="wrap">
    <div class="flex flex-col md:flex-row items-center gap-8">
      <div class="relative flex-shrink-0">
        <div class="absolute bottom-[1vw] right-[1vw] rounded-full group">
          <input
            type="file"
            name=""
            id=""
            aria-label="上傳頭像"
            placeholder="請選擇頭像..."
            class="bg-red-400 absolute w-full h-full rounded-full top-0 opacity-0 z-10"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="fill-white h-[50px] md:h-[60px] lg:h-20 opacity-75 group-hover:opacity-100 rounded-full stroke-gray-01 duration-300 group-hover:outline outline-1 outline-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>

          <!-- <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              height="5vw"
              min-height="32px"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="stroke-2 bg-brand-01 p-5 rounded-full"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                class="stroke-2"
              />
            </svg> -->
        </div>
        <img
          src="../assets/BANNER 375@3x-3.png"
          alt=""
          class="flex-shrink-0 rounded-full object-cover lg:w-[25vw] lg:h-[25vw] w-[30vw] h-[30vw] min-h-[170px] min-w-[170px]"
        />
      </div>
      <ul
        class="md:w-2/3 w-full relative gap-3 flex flex-col text-center px-4 tracking-[.5rem]"
        id="userChoose"
      >
        <li>
          <router-link
            :to="{ name: 'reserve' }"
            class="block p-4 hover:bg-brand-03 hover:bg-opacity-20 cursor-pointer text-brand-02 text-xl lg:text-3xl"
          >
            課程預約
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'orders' }"
            class="block p-4 hover:bg-brand-03 hover:bg-opacity-20 cursor-pointer text-brand-02 text-xl lg:text-3xl"
          >
            訂單詳情
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'collects' }"
            class="block p-4 hover:bg-brand-03 hover:bg-opacity-20 cursor-pointer text-brand-02 text-xl lg:text-3xl"
          >
            收藏項目
          </router-link>
        </li>
        <li>
          <img
            src="../assets/teaIcon.svg"
            alt=""
            class="bottom-0 right-0 float-right"
          />
        </li>
      </ul>
    </div>
    <!-- 會員資訊 -->
    <div class="text-xl my-10">
      <h1
        class="lg:text-3xl text-2xl text-brand-02 font-GenRyuMin lg:mb-6 mb-3"
      >
        會員資訊
      </h1>
      <form
        class="flex justify-between flex-col lg:flex-row lg:items-end tracking-widest"
      >
        <div class="flex flex-col gap-3 lg:gap-6 text-gray-02">
          <p class="flex lg:flex-row flex-col lg:gap-4 gap-2 lg:items-center">
            <label for="">帳號</label>
            <input type="email" name="" id="" class="text-gray-01 px-2 py-1" />
            <span
              id="userLevel"
              class="text-base text-end relative group cursor-default text-brand-01 font-medium font-GenRyuMin"
            >
              茶友
              <span
                class="absolute bg-brand-01 text-white bg-opacity-75 min-w-max px-4 py-2 top-full lg:left-0 right-0 group-hover:block hidden"
                >累積消費滿 20,000 升級為茶士 (VIP)</span
              >
            </span>
          </p>
          <p class="flex lg:flex-row flex-col lg:gap-4 gap-2 lg:items-center">
            <label for="">用戶名</label>
            <input type="text" name="" id="" class="text-gray-01 px-2 py-1" />
          </p>
          <p class="flex lg:flex-row flex-col lg:gap-4 gap-2 lg:items-center">
            <label for="">手機號碼</label>
            <input type="tel" name="" id="" class="text-gray-01 px-2 py-1" />
          </p>
        </div>
        <button type="submit" class="btn-outline h-1/2 mt-3">編輯</button>
      </form>
    </div>

    <!-- 修改密碼 -->
    <div class="text-xl my-10">
      <h1
        class="lg:text-3xl text-2xl text-brand-02 font-GenRyuMin lg:mb-6 mb-3"
      >
        修改密碼
      </h1>
      <form
        class="flex justify-between flex-col lg:flex-row lg:items-end tracking-widest"
      >
        <div class="flex flex-col gap-3 lg:gap-6 text-gray-02">
          <p class="flex lg:flex-row flex-col lg:gap-4 gap-2 lg:items-center">
            <label for="">舊密碼</label>
            <input
              type="password"
              name=""
              id=""
              class="text-gray-01 px-2 py-1"
            />
          </p>
          <p class="flex lg:flex-row flex-col lg:gap-4 gap-2 lg:items-center">
            <label for="">新密碼</label>
            <input
              type="password"
              name=""
              id=""
              class="text-gray-01 px-2 py-1"
            />
          </p>
          <p class="flex lg:flex-row flex-col lg:gap-4 gap-2 lg:items-center">
            <label for="">確認密碼</label>
            <input
              type="password"
              name=""
              id=""
              class="text-gray-01 px-2 py-1"
            />
          </p>
        </div>
        <button type="button" class="btn-outline h-1/2 mt-3">編輯</button>
      </form>
    </div>
    <a
      href="/"
      class="block mt-20 p-4 w-full text-xl text-gray-02 text-center hover:bg-brand-03 hover:bg-opacity-20 cursor-pointer"
    >
      登出
    </a>
  </main>
</template>
<script>
export default {
  mounted() {
    console.log(this.$route.params.id);
  },
};
</script>
<style scoped>
#userChoose::after {
  content: "";
  background-color: #38415a;
  opacity: 0.4;
  width: 100%;
  height: 2px;
  display: block;
  position: absolute;
  bottom: 0;
  left: -10px;
}
#userChoose::before {
  content: "";
  background-color: #38415a;
  opacity: 0.4;
  width: 2px;
  height: 105%;
  display: block;
  position: absolute;
  bottom: -10px;
  left: 0;
}
</style>
