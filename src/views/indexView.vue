<!-- eslint-disable prettier/prettier -->
<template>
  <div class="lg:mb-[120px]">
    <!-- BANNER -->
    <bannerSwiper></bannerSwiper>
    <div
      class="xl:w-[70%] lg:w-[80%] w-[90%] mx-auto bg-brand-06 mt-20 transition-all relative h-[478px] hidden lg:flex"
      @mouseleave="checked = false"
    >
      <section
        class="text-brand-05 text-[28px] leading-8 font-black font-GenRyuMin m-auto w-1/2 px-12 scale-1 duration-1000"
        :class="{ 'scale-0': checked }"
      >
        <p class="mb-6">是否在腳步漸快的社會下生活下迷失了自我？</p>
        <p class="mb-6">是否身邊缺少志同道合的夥伴？</p>
        <p class="mb-10">是否有時想要安靜的獨處時光？</p>
        <button
          type="button"
          class="flex btn-outline text-brand-01 font-sans text-xl leading-6 font-medium group"
          @click="checked = !checked"
        >
          尋求解疑
          <img
            src="../assets/Property 1=arrow-left.svg"
            class="group-hover:hidden"
            alt="下一步"
          />
          <img
            src="../assets/Property 1=arrow-left.png"
            alt="下一步"
            class="hidden group-hover:block"
          />
        </button>
      </section>
      <section
        class="text-brand-05 text-[28px] leading-8 font-black font-GenRyuMin m-auto w-1/2 px-12 duration-1000"
      >
        <!-- :class="{ 'scale-1': checked, 'scale-0': !checked }" -->
        <p class="mb-6">古言道：茶者，一人得神、二人得趣、三人得味</p>
        <p class="mb-6">
          茶可寄情，亦可敘情；以茶會友，以茶抒懷，一飲一啄間的甘苦，亦是對人生的回顧
        </p>
      </section>
      <img
        src="../assets/解疑.png"
        alt="解疑圖片"
        class="w-1/2 object-cover duration-1000 absolute h-full right-0"
        :class="{ '-translate-x-full': checked }"
      />
    </div>
    <div class="bg-brand-06 lg:hidden">
      <section
        class="text-brand-05 text-2xl leading-7 font-black font-GenRyuMin py-8 px-4"
        v-if="!checked"
      >
        <p class="mb-4">是否在腳步漸快的社會下生活下迷失了自我？</p>
        <p class="mb-4">是否身邊缺少志同道合的夥伴？</p>
        <p class="mb-6">是否有時想要安靜的獨處時光？</p>
        <button
          type="button"
          class="flex btn-outline text-brand-01 font-sans text-xl leading-6 font-medium group"
          @click="checked = !checked"
        >
          尋求解疑
          <img
            src="../assets/Property 1=arrow-left.svg"
            class="group-hover:hidden"
            alt="下一步"
          />
          <img
            src="../assets/Property 1=arrow-left.png"
            alt="下一步"
            class="hidden group-hover:block"
          />
        </button>
      </section>
      <section
        class="text-brand-05 text-2xl leading-7 font-black font-GenRyuMin py-8 px-4 cursor-pointer"
        v-else
        @click="checked = !checked"
      >
        <p class="mb-4">古言道：茶者，一人得神、二人得趣、三人得味</p>
        <p>
          茶可寄情，亦可敘情；以茶會友，以茶抒懷，一飲一啄間的甘苦，亦是對人生的回顧
        </p>
      </section>
      <img
        src="../assets/解疑@2x.png"
        alt="解疑圖片"
        class="w-full h-[282px] object-cover"
      />
    </div>
    <course-list class="wrap mb-0 mt-14"></course-list>
    <activity-list></activity-list>
  </div>
</template>
<script>
import bannerSwiper from "../components/BannerSwiper.vue";
import courseList from "../components/CourseList.vue";
import activityList from "../components/ActivityList.vue";
export default {
  data() {
    return {
      checked: false,
    };
  },
  components: {
    bannerSwiper,
    courseList,
    activityList,
  },
};
</script>
