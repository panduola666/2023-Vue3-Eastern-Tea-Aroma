<template>
  <swiper
    :spaceBetween="30"
    :centeredSlides="true"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide
      ><div class="relative h-[520px] w-full">
        <img
          src="../assets/BANNER.png"
          alt=""
          class="object-cover hidden lg:block object-left"
        />
        <img
          src="../assets/BANNER 375.png"
          alt=""
          class="object-bottom block lg:hidden"
        />
        <section
          class="absolute font-self font-black text-gray-04 bg-[#003416] bg-opacity-40 flex flex-col justify-center lg:text-[32px] lg:leading-9 lg:top-[10%] lg:left-[16%] lg:w-[45%] lg:py-[102px] lg:pl-12 text-2xl leading-7 top-6 left-4 w-[90%] py-4 pl-6 text-start"
        >
          <h1>
            一飲一啄在茶中<br />
            苦， 茶也 <br />甘， 亦茶也
          </h1>
        </section>
      </div>
    </swiper-slide>

    <swiper-slide
      ><div class="relative h-[520px] w-full">
        <img
          src="../assets/BANNER-1.png"
          alt=""
          class="object-cover hidden lg:block object-left"
        />
        <img
          src="../assets/BANNER 375-1.png"
          alt=""
          class="object-bottom block lg:hidden"
        />
        <section
          class="absolute font-self font-black text-gray-04 bg-[#003416] bg-opacity-40 flex flex-col justify-center lg:text-[32px] lg:leading-9 lg:top-[10%] lg:left-[16%] lg:w-[45%] lg:py-[102px] lg:px-12 text-2xl leading-7 top-6 left-4 w-[90%] py-4 px-6 text-start"
        >
          <h1>關於我們</h1>
          <p
            class="lg:text-xl text-base font-normal lg:leading-[30px] font-sans lg:mt-6"
          >
            宣揚平常容易忽略的茶道禮儀，同時融會古法茶藝與現代茶藝，讓其可以融入日常生活中，使其更加貼近生活達到隨時隨地皆可品茶的目標。
          </p>
        </section>
      </div>
    </swiper-slide>

    <swiper-slide
      ><div class="relative h-[520px] w-full">
        <img
          src="../assets/BANNER-2.png"
          alt=""
          class="object-cover hidden lg:block object-left"
        />
        <img
          src="../assets/BANNER 375-2.png"
          alt=""
          class="object-bottom block lg:hidden"
        />
        <section
          class="absolute font-self font-black text-gray-04 bg-[#003416] bg-opacity-40 flex flex-col justify-center lg:text-[32px] lg:leading-9 lg:top-[10%] lg:left-[16%] lg:w-[45%] lg:py-[102px] lg:px-12 text-2xl leading-7 top-6 left-4 w-[90%] py-4 px-6 text-start"
        >
          <h1>君子四藝</h1>
          <p
            class="lg:text-xl text-base font-normal lg:leading-[30px] font-sans lg:mt-6"
          >
            煮茶、焚香、掛畫、插花，被宋人合稱為「四藝」，是古代文人雅士追求雅致生活的一部分。此四藝者，透過嗅覺、味覺、觸覺與視覺品味日常生活，將日常生活提升至藝術境界，且充實內在涵養與修為。
          </p>
        </section>
      </div>
    </swiper-slide>

    <!-- 最新活動 要跟著變動 -->
    <swiper-slide
      ><div class="relative h-[520px] w-full">
        <img
          src="../assets/BANNER-3.png"
          alt=""
          class="object-cover hidden lg:block object-left"
        />
        <img
          src="../assets/BANNER 375-3.png"
          alt=""
          class="object-bottom block lg:hidden"
        />
        <section
          class="absolute font-self font-black text-gray-04 bg-[#003416] bg-opacity-40 lg:text-[32px] lg:leading-9 lg:top-[10%] lg:left-[16%] lg:w-[45%] lg:py-[45px] lg:pl-12 text-2xl leading-7 top-6 left-4 w-[90%] py-4 px-6 text-start"
        >
          <span
            class="bg-brand-01 text-white lg:absolute font-medium lg:text-xl text-base leading-5 font-sans lg:py-2 py-1 lg:px-3 px-2 lg:top-[12%] lg:-left-8"
          >
            優惠
          </span>
          <p class="mt-4 lg:mt-0">521國際茶日</p>
          <p
            class="lg:text-xl text-base font-normal lg:leading-[30px] font-sans lg:mt-6"
          >
            在2020年5月21日，聯合國首次確定＂國際茶日＂。
            為表紀念每年521將推出全場商品 9 折活動為期 3 日，折扣碼：Tea521。
          </p>
          <button
            type="button"
            class="btn-outline lg:text-xl text-base lg:leading-6 leading-5 font-medium text-brand-01 font-sans lg:mt-6 mt-3 duration-500 outline-white"
          >
            活動詳情
          </button>
        </section>
      </div>
    </swiper-slide>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Autoplay, Pagination],
    };
  },
};
</script>
<style>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  width: 100%;
  height: 520px;
  object-fit: cover;
}

.swiper-horizontal .swiper-pagination-bullet,
.swiper-pagination-bullet-active {
  height: 4px;
  border-radius: 0;
  margin-right: 12px;
}
.swiper-horizontal > .swiper-pagination-bullets,
.swiper-pagination-bullets.swiper-pagination-horizontal,
.swiper-pagination-custom,
.swiper-pagination-fraction {
  bottom: 3vw;
}

.swiper-pagination-bullet {
  background-color: #fff;
  opacity: 1;
  width: 24px;
}
.swiper-pagination-bullet-active {
  width: 40px;
  opacity: 1;
  background-color: #734705;
}
</style>
