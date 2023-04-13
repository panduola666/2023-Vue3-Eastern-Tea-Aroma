<template>
  <swiper
    :spaceBetween="30"
    :centeredSlides="true"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false
    }"
    :pagination="{
      clickable: true
    }"
    :navigation="false"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide
      ><div class="relative h-[520px] w-full">
        <img
          src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/BANNER.png?raw=true"
          alt="banner1"
          class="object-cover hidden lg:block object-left"
        />
        <img
          src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/BANNER%20375.png?raw=true"
          alt="banner1"
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
          src="https://images.unsplash.com/photo-1546852199-2d8e8c4aaada?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTE2fHx0ZWF8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
          alt="banner1"
          class="object-cover"
        />
        <section
          class="absolute font-self font-black text-gray-04 bg-[#003416] bg-opacity-40 flex flex-col gap-3 lg:text-[32px] lg:leading-9 lg:top-[10%] lg:left-[16%] lg:w-[45%] lg:py-[62px] lg:px-12 text-2xl leading-7 top-6 left-4 w-[90%] py-4 pl-6 text-start"
        >
          <h1>全網最全的傳統茶藝課程以及近代茶藝</h1>
          <h2>專業講師帶領你從入門到精通</h2>
          <router-link
            to="/courses"
            class="btn-outline border-white lg:text-xl text-base lg:leading-6 leading-5 font-medium text-white text-center font-sans lg:mt-6 mt-3 duration-500 outline-white opacity-50 hover:opacity-100 hover:bg-brand-01 hover:border-brand-01"
          >
            前往購買
          </router-link>
        </section>
      </div>
    </swiper-slide>

    <template
      v-for="(activity, index) in activities.sort(
        (a, b) => b.created - a.created
      )"
      :key="activity.id"
    >
      <swiper-slide v-if="index === 0">
        <div class="relative h-[520px] w-full">
          <img
            src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/BANNER-3.png?raw=true"
            :alt="activity.title"
            class="object-cover w-full h-full"
          />
          <section
            class="absolute font-self font-black text-gray-04 bg-[#003416] bg-opacity-40 lg:text-[32px] lg:leading-9 lg:top-[10%] lg:left-[16%] lg:w-[45%] lg:py-[45px] lg:pl-12 text-2xl leading-7 top-6 left-4 w-[90%] py-4 px-6 text-start"
          >
            <span
              class="bg-brand-01 text-white lg:absolute font-medium lg:text-xl text-base leading-5 font-sans lg:py-2 py-1 lg:px-3 px-2 lg:top-[12%] lg:-left-8"
            >
              {{ activity.type }}
            </span>
            <p class="mt-4 lg:mt-0">{{ activity.title }}</p>
            <article
              class="lg:text-xl text-base font-normal lg:leading-[30px] font-sans lg:my-6 my-3 max-h-24 overflow-hidden"
              v-html="activity.content"
            ></article>
            <router-link
              :to="`/activity/${activity.id}`"
              class="btn-outline border-white lg:text-xl text-base lg:leading-6 leading-5 font-medium text-white font-sans lg:mt-6 mt-3 duration-500 outline-white opacity-50 hover:opacity-100 hover:bg-brand-01 hover:border-brand-01"
            >
              活動詳情
            </router-link>
          </section>
        </div>
      </swiper-slide>
    </template>

    <swiper-slide
      ><div class="relative h-[520px] w-full">
        <img
          src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/BANNER-2.png?raw=true"
          alt="banner3"
          class="object-cover hidden lg:block object-left"
        />
        <img
          src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/BANNER%20375-2.png?raw=true"
          alt="banner3"
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

    <swiper-slide
      ><div class="relative h-[520px] w-full">
        <img
          src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/BANNER-1.png?raw=true"
          alt="banner2"
          class="object-cover hidden lg:block object-left"
        />
        <img
          src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/BANNER%20375-1.png?raw=true"
          alt="banner2"
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
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
// import required modules
import { Autoplay, Pagination } from 'swiper'
import { mapState, mapActions } from 'pinia'
import { activitiesStore } from '../stores/index.js'
export default {
  computed: {
    ...mapState(activitiesStore, ['activities'])
  },
  methods: {
    ...mapActions(activitiesStore, ['getAllActivitiesData'])
  },
  mounted() {
    this.getAllActivitiesData()
  },
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    return {
      modules: [Autoplay, Pagination]
    }
  }
}
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
