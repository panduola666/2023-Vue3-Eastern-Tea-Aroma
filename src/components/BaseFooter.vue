<template>
  <img
    src="../assets/back to top.png"
    alt="返回頂部"
    class="cursor-pointer fixed lg:right-24 lg:bottom-16 right-3 bottom-3 z-50"
    :class="{ hidden: top < 500 }"
    @click.prevent="toTop"
  />
  <div class="bg-brand-06 mt-8">
    <div
      class="xl:w-[70%] lg:w-[80%] w-[90%] mx-auto lg:flex items-center justify-between lg:py-10 py-8"
    >
      <a href="/">
        <img src="../assets/logo2.png" alt="東方茶香logo" />
      </a>
      <div class="w-full lg:h-[130px] lg:flex justify-end">
        <address
          class="flex flex-col justify-between item gap-3 lg:gap-0 mb-6 mt-7 lg:m-0 text-gray-02 not-italic"
        >
          <span class="text-brand-02 lg:text-xl lg:leading-[30px]"
            >聯絡我們</span
          >
          <span class="text-gray-02">
            營業時間 <span class="text-gray-01 ml-4">下午1:00 - 晚上10:00</span>
          </span>
          <span class="text-gray-02">
            地址
            <span class="text-gray-01 ml-4">100台北市中正區鄭州路8號</span>
          </span>
          <span class="text-gray-02">
            電話
            <a href="tel:+886-2-12345678" class="text-gray-01 ml-4"
              >(02)12345678</a
            >
          </span>
        </address>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.5678396973317!2d121.51202581466274!3d25.048736083965423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a972aaee712d%3A0x74c7dabeb8af65fb!2zMTAz5Y-w5YyX5biC5aSn5ZCM5Y2A6YSt5bee6LevOOiZnw!5e0!3m2!1szh-TW!2stw!4v1674311948134!5m2!1szh-TW!2stw"
          style="border: 0"
          width="556"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          class="2xl:w-1/2 lg:w-2/5 lg:max-w-[556px] w-full lg:ml-20 h-full"
        ></iframe>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      top: 0,
    };
  },
  methods: {
    toTop() {
      const timeTop = setInterval(() => {
        document.body.scrollTop =
          document.documentElement.scrollTop =
          this.top -=
            50;
        if (this.top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    },
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.top = document.documentElement.scrollTop;
    });
  },
  unmounted() {
    window.removeEventListener("scroll", () => {
      this.top = document.documentElement.scrollTop;
    });
  },
};
</script>
