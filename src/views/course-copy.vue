<template>
  <main class="wrap">
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
      {{ currentCourse.title }}
    </h1>
    <div class="grid lg:grid-cols-3 gap-3 mt-5">
      <img
        :src="currentCourse.coverUrl"
        :alt="currentCourse.title"
        class="w-full h-56 object-cover"
      />
      <section
        class="lg:col-span-2 flex flex-col justify-between gap-3 lg:text-xl"
      >
        <h3 class="flex justify-between items-center">
          時間：{{
            currentCourse.dates &&
            $date(new Date(currentCourse.dates[dateIndex].start)).format(
              "YYYY-MM-DD"
            )
          }}&nbsp;
          {{
            currentCourse.dates &&
            $date(new Date(currentCourse.dates[dateIndex].start)).format(
              "HH:mm"
            )
          }}~{{
            currentCourse.dates &&
            $date(new Date(currentCourse.dates[dateIndex].end)).format("HH:mm")
          }}

          <button
            type="button"
            class="btn-outline flex-shrink-0 md:text-base py-2 px-2 sm:px-5 text-sm"
            v-if="isLogin"
            @click="patchSaved(courseId, dateIndex)"
          >
            {{ isSaved ? "已收藏" : "收藏課程" }}
          </button>
        </h3>
        <h2>講師：{{ currentCourse.user && currentCourse.user.name }} 講師</h2>
        <p class="flex justify-between">
          價格：{{ currentCourse.price }} 元<span class="text-gray-02 text-base"
            >剩餘: {{ remainingNumber }}</span
          >
        </p>
        <button
          type="button"
          class="btn-primary"
          :disabled="isEnd || !remainingNumber"
          @click="addToCart(currentCourse)"
          ref="addCartBtn"
        >
          {{ isEnd || !remainingNumber ? "預約已滿 / 已結束" : "加入購物車" }}
        </button>
      </section>
    </div>
    <p
      class="bg-brand-03 bg-opacity-20 px-5 py-8 text-xl text-gray-01 mt-5 font-self"
      v-if="discountData.coursesId?.includes(+courseId)"
    >
      當前商品享活動優惠：全面
      <span class="text-2xl font-black" v-if="discountData.type === 'money'"
        >折價 {{ discountData.scale }} 元</span
      >
      <span class="text-2xl font-black" v-else
        >{{ discountData.scale * 100 }} 折</span
      >
      ，優惠碼：{{ discountData.code }}
    </p>
    <article
      class="text-brand-05 lg:text-lg font-medium leading-8 tracking-wider mt-10"
    >
      <h4 class="font-self text-2xl font-black">課程簡介</h4>
      <ul class="grid gap-4 my-4">
        <li
          v-for="(content, index) in currentCourse.contents"
          :key="content + index"
        >
          {{ content }}
        </li>
      </ul>
      <section
        v-if="currentCourse.imagesUrl && currentCourse.imagesUrl.length >= 2"
      >
        <h5 class="font-self text-2xl font-black my-4">活動圖片</h5>
        <div
          class="grid sm:grid-cols-3 gap-3"
          :class="{
            'sm:grid-cols-2': currentCourse.imagesUrl.length === 2,
          }"
        >
          <template
            v-for="(image, index) in currentCourse.imagesUrl"
            :key="currentCourse.title + index"
          >
            <img
              :src="image"
              :alt="currentCourse.title + index"
              class="w-full h-48 object-cover"
              v-if="index < 3"
            />
          </template>
        </div>
      </section>
    </article>
    <p class="font-self text-gray-01 mt-16">其他時段</p>
    <ol class="list-disc list-inside">
      <template
        v-for="(date, index) in currentCourse.dates"
        :key="date + index"
      >
        <li
          class="text-gray-02 py-2 px-1"
          v-show="index !== +dateIndex"
          @click="dateChange"
        >
          <router-link
            :to="`/course/${courseId}-${index}`"
            class="hover:text-gray-01 underline underline-offset-2 hover:bg-brand-03 hover:bg-opacity-20"
          >
            {{ $date(new Date(date.start)).format("YYYY-MM-DD") }} /星期{{
              ["日", "一", "二", "三", "四", "五", "六"][
                $date(new Date(date.start)).day()
              ]
            }}
            - 13:00~15:30 ／ 價格: {{ currentCourse.price }} 元 ／ 剩餘:
            {{ date.total - date.reservedUsersId.length }}
          </router-link>
        </li>
      </template>
    </ol>
    <CourseList class="border-t-2 border-line mt-10 pt-5"></CourseList>
  </main>
</template>
<script>
import CourseList from "../components/CourseList.vue";
import { coursesStore, userStore, discountStore } from "../stores/index.js";
import { mapState, mapActions } from "pinia";
import { isArray } from "lodash";
const { VITE_BASEURL } = import.meta.env;

export default {
  data() {
    return {
      courseId: this.$route.params.id.split("-")[0],
      dateIndex: this.$route.params.id.split("-")[1],
    };
  },
  computed: {
    ...mapState(userStore, ["isLogin", "user"]),
    ...mapState(coursesStore, ["currentCourse"]),
    ...mapState(discountStore, ["discountData"]),
    isSaved() {
      return (
        this.currentCourse.dates &&
        this.currentCourse.dates[
          this.$route.params.id.split("-")[1]
        ].savedUsersId.includes(+sessionStorage.getItem("userId"))
      );
    },
    remainingNumber() {
      return (
        this.currentCourse.dates &&
        this.currentCourse.dates[this.dateIndex].total -
          this.currentCourse.dates[this.dateIndex].reservedUsersId.length
      );
    },
    isEnd() {
      return (() => {
        if (isArray(this.currentCourse.dates)) {
          return this.currentCourse.dates[this.dateIndex].start < new Date();
        }
      })();
    },
  },
  methods: {
    ...mapActions(userStore, ["checkLogin"]),
    ...mapActions(discountStore, ["getDiscountData"]),
    ...mapActions(coursesStore, [
      "getThisCourse",
      "patchSaved",
      "getCoursesData",
    ]),
    dateChange() {
      this.$router.go(0);
    },
    addToCart(currentCourse) {
      if (!this.isLogin) {
        this.$swal
          .fire({
            icon: "warning",
            title: "請登入會員",
          })
          .then(() => {
            sessionStorage.clear();
            this.isLogin = false;
            this.$router.push("/login");
          });
        return;
      }
      this.$refs.addCartBtn.disabled = true;
      const { id, price } = currentCourse;
      const data = {
        courseId: id,
        dateIndex: +this.dateIndex,
        price,
      };
      const { shoppingCart } = this.user;
      const courseIndex = shoppingCart.cart.courses.findIndex(
        (item) => item.courseId === id && item.dateIndex === data.dateIndex
      );
      console.log(shoppingCart.cart.courses[courseIndex]);
      if (courseIndex !== -1) {
        shoppingCart.cart.courses[courseIndex].number++;
        shoppingCart.cart.courses[courseIndex].totalPrice =
          shoppingCart.cart.courses[courseIndex].number *
          shoppingCart.cart.courses[courseIndex].price;
      } else {
        data.number = 1;
        data.totalPrice = data.number * data.price;
        shoppingCart.cart.courses.push(data);
      }
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        },
      });

      this.$http
        .patch(
          `${VITE_BASEURL}/660/users/${sessionStorage.getItem("userId")}`,
          { shoppingCart }
        )
        .then((res) => {
          console.log(res.data);
          return Toast.fire({
            icon: "success",
            title: "已加入購物車",
          });
        })
        .then(() => {
          this.$refs.addCartBtn.disabled = false;
        });
    },
  },
  mounted() {
    const { id } = this.$route.params;
    this.checkLogin();
    this.getCoursesData();
    this.getThisCourse(id.split("-")[0]);
    this.getDiscountData();
  },
  components: {
    CourseList,
  },
};
</script>
<style>
.swal2-modal {
  grid-column: 3;
}
</style>
