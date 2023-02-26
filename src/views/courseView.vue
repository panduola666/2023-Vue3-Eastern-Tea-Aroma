<template>
  <main class="wrap">
    <!-- {{ currentCourse }} -->
    <div class="flex justify-end mb-2">
      <router-link
        to="/courses"
        class="flex items-center text-gray-02 hover:text-gray-01"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4 mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
        返回搜尋</router-link
      >
    </div>
    <h1 class="text-3xl font-black font-self text-brand-02">
      {{ currentCourse.course?.title }}
    </h1>
    <div class="grid lg:grid-cols-3 gap-3 mt-5">
      <img src="../assets/課堂01.png" alt="" class="w-full h-56 object-cover" />
      <section
        class="lg:col-span-2 flex flex-col justify-between gap-3 lg:text-xl"
      >
        <h3 class="flex justify-between items-center">
          時間：{{ $date(currentCourse.start).format("YYYY-MM-DD HH:mm") }}~{{
            $date(currentCourse.end).format("HH:mm")
          }}
          <button
            type="button"
            class="btn-outline flex-shrink-0 md:text-base py-2 px-2 sm:px-5 text-sm"
            @click="() => patchSaved(currentCourse)"
            v-if="isLogin"
          >
            {{ isSaved ? "取消收藏" : "收藏課程" }}
          </button>
        </h3>
        <h2>講師：{{ currentCourse.user?.name }} 講師</h2>
        <p class="flex justify-between">
          價格：{{ currentCourse.course?.price }} 元<span
            class="text-gray-02 text-base"
            >剩餘: {{ currentCourse.total - remainingNumber }}</span
          >
        </p>
        <button
          type="button"
          class="btn-primary"
          :disabled="
            currentCourse.total - remainingNumber <= 0 ||
            currentCourse.start < new Date()
          "
          @click="() => addToCart('courses', currentCourse)"
        >
          {{
            currentCourse.total - remainingNumber <= 0 ||
            currentCourse.start < new Date()
              ? "預約已滿 / 已結束"
              : "加入購物車"
          }}
        </button>
      </section>
    </div>
    <p
      v-if="discountData.end > new Date().getTime() && currentCourse.isDiscount"
      class="bg-brand-03 bg-opacity-20 px-5 py-8 text-xl text-gray-01 mt-5 font-self"
    >
      當前商品享活動優惠：全面
      <span class="text-2xl font-black">{{
        discountData.type === "money"
          ? `折扣 ${discountData.scale} 元`
          : `${discountData.scale * 100} 折`
      }}</span
      >，優惠碼：{{ discountData.code }}
    </p>
    <article
      class="text-brand-05 lg:text-lg font-medium leading-8 tracking-wider mt-10"
    >
      <p class="font-self text-2xl font-black">課程簡介</p>
      <ul class="grid gap-4 my-4">
        <li
          v-for="(content, index) in currentCourse.course?.contents"
          :key="content + index"
        >
          {{ content }}
        </li>
      </ul>
      <div
        class="grid sm:grid-cols-3 gap-3 my-4"
        :class="{
          'sm:grid-cols-2': currentCourse.course.imagesUrl.length <= 2,
        }"
        v-if="currentCourse.course"
      >
        <template
          v-for="(imageUrl, index) in currentCourse.course?.imagesUrl"
          :key="currentCourse.course?.title + index"
        >
          <img
            :src="imageUrl"
            :alt="currentCourse.course.title + index"
            class="w-full h-48 object-cover"
          />
        </template>
      </div>
    </article>
    <p class="font-self text-gray-01 mt-16">其他時段</p>
    <ol class="list-disc list-inside">
      <template v-for="(course, index) in courses" :key="index">
        <template
          v-for="(courseDate, index) in course.courseDates"
          :key="index"
        >
          <li
            class="text-gray-02 py-2 px-1"
            v-if="
              courseDate.courseId === currentCourse.course?.id &&
              courseDate.start > new Date() &&
              courseDate.id !== +this.$route.params.id
            "
          >
            <router-link
              :to="`/course/${courseDate.id}`"
              class="hover:text-gray-01 underline underline-offset-2 hover:bg-brand-03 hover:bg-opacity-20"
            >
              <span
                >{{ $date(courseDate.start).format("YYYY-MM-DD") }} /星期{{
                  ["日", "一", "二", "三", "四", "五", "六"][
                    $date(courseDate.start).day()
                  ]
                }}
                - {{ $date(courseDate.start).format("HH:mm") }}~{{
                  $date(courseDate.end).format("HH:mm")
                }}
                ／ 價格: {{ course.price }} 元</span
              >
            </router-link>
          </li>
        </template>
      </template>
    </ol>
    <CourseList class="border-t-2 border-line mt-10 pt-5"></CourseList>
  </main>
</template>
<script>
import CourseList from "../components/CourseList.vue";
import {
  userStore,
  coursesStore,
  ordersStore,
  discountStore,
} from "../stores/index.js";
import { mapState, mapActions } from "pinia";

export default {
  computed: {
    ...mapState(coursesStore, ["currentCourse", "courses"]),
    ...mapState(ordersStore, ["orders"]),
    ...mapState(discountStore, ["discountData"]),
    ...mapState(userStore, ["isLogin"]),
    remainingNumber() {
      const reserveDates = [];
      this.orders.map((order) =>
        order.courseDates.forEach((item) => {
          reserveDates.push(item.courseDate);
        })
      );
      let reserveNum = 0;
      reserveDates.forEach((id) => {
        if (+id === +this.$route.params.id) {
          reserveNum++;
        }
      });
      return reserveNum;
    },
    isSaved() {
      return (
        this.currentCourse.savedUsersId &&
        this.currentCourse.savedUsersId.includes(
          +sessionStorage.getItem("userId")
        )
      );
    },
  },
  methods: {
    ...mapActions(coursesStore, ["getCurrent", "getCoursesData", "patchSaved"]),
    ...mapActions(ordersStore, ["getOrdersData"]),
    ...mapActions(discountStore, ["getDiscountData"]),
    ...mapActions(userStore, ["checkLogin", "addToCart"]),
  },
  watch: {
    "$route.params.id"(id) {
      this.getCurrent(id);
    },
  },
  mounted() {
    const { id } = this.$route.params;
    this.getCurrent(id);
    this.getOrdersData();
    this.getDiscountData();
    this.getCoursesData();
    this.checkLogin();
  },
  components: {
    CourseList,
  },
};
</script>
