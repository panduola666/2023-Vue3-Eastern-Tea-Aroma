<template>
  <main class="admin-wrap">
    <teleport to="title">課程列表</teleport>
    <h1 class="text-3xl font-black font-self text-brand-02">課程列表</h1>
    <div class="flex flex-col lg:flex-row lg:justify-end lg:gap-5 gap-2 my-5">
      <button
        type="button"
        class="btn-outline"
        @click="() => imgurLogin()"
        v-if="!isImgurLogin"
      >
        imgur 登入
      </button>
      <button
        type="button"
        class="btn-primary"
        @click="getFirstToken"
        v-else-if="!isImgurToken && isImgurLogin"
      >
        取得驗證
      </button>
      <p class="flex items-center text-sm text-gray-02" v-else>
        已取得 imgur 驗證,允許本地上傳圖片
      </p>
      <button
        type="button"
        class="btn-outline"
        @click="allDiscount"
        :disabled="isAllDiscount"
      >
        全部套用
      </button>
      <PostCourseModal :is-new="true">
        <template #btn-content>
          <button
            typeof="button"
            class="btn-primary w-full"
            @click="() => getCurrent(0, true)"
          >
            開新課程
          </button>
        </template>
      </PostCourseModal>
    </div>
    <ul class="grid gap-5" v-if="myCourses.length">
      <template
        v-for="course in myCourses.sort((a, b) => b.id - a.id)"
        :key="course.id + course.title"
      >
        <template
          v-for="date in course.courseDates.sort((a, b) => b.id - a.id)"
          :key="`課程編號${date.courseId}的第${date.id}堂`"
        >
          <li class="relative" v-if="date.end > new Date()">
            <div
              class="absolute top-0 bottom-0 left-0 right-0 bg-gray-03 bg-opacity-50 text-red-600 text-6xl flex items-center justify-around"
              v-if="date.total <= 0"
            >
              未開放
            </div>
            <div is="vue:CoursesCard">
              <template #image>
                <img
                  :src="course.coverUrl"
                  :alt="course.title"
                  class="w-full h-64 object-cover"
                />
              </template>
              <template #card-header>
                <h1>{{ course.title }}</h1>
                <PostCourseModal :is-new="false" class="z-10">
                  <template #btn-content>
                    <button
                      typeof="button"
                      class="btn-outline py-2 text-base mb-1"
                      @click="() => getCurrent(date.id)"
                    >
                      編輯
                    </button>
                  </template>
                </PostCourseModal>
              </template>
              <template #card-body>
                <p>
                  時段：{{ $date(date.start).format('YYYY-MM-DD') }} /
                  {{ $date(date.start).format('HH:mm') }}~{{
                    $date(date.end).format('HH:mm')
                  }}
                </p>
                <p>開放人數：{{ date.total }}人</p>
                <p>評分：{{ score(course.scores) }}</p>
                <p class="text-xl text-end">$ {{ toThousand(course.price) }}</p>
              </template>
              <template #card-footer>
                <div
                  class="flex flex-grow gap-3 flex-col md:flex-row justify-between"
                >
                  <DiscountToggle
                    v-model:is-discount="date.isDiscount"
                    :id="date.id"
                    which="courseDates"
                    :price="
                      discountData.type === 'money'
                        ? course.price - discountData.scale
                        : Math.round(course.price * discountData.scale)
                    "
                    class="justify-end my-3 md:my-0 md:justify-start"
                  ></DiscountToggle>
                  <div class="flex flex-col-reverse md:flex-row gap-3">
                    <button
                      typeof="button"
                      class="btn-outline"
                      @click="() => deleteCurrent(date.id)"
                    >
                      刪除
                    </button>
                    <router-link
                      :to="`/course/${date.id}`"
                      class="btn-outline text-center"
                      >課程詳情</router-link
                    >
                    <OrderCourseModal :orders="orders" :id="date.id">
                      <template #btn-content>
                        <button
                          typeof="button"
                          class="btn-primary md:w-max w-full"
                          @click="() => getCurrent(date.id)"
                        >
                          預約詳情
                        </button>
                      </template>
                    </OrderCourseModal>
                  </div>
                </div>
              </template>
            </div>
          </li>
        </template>
      </template>
      <template v-for="course in myCourses" :key="course.id + course.title">
        <template
          v-for="date in course.courseDates"
          :key="`課程編號${date.courseId}的第${date.id}堂`"
        >
          <li class="relative" v-if="date.end <= new Date()">
            <div
              class="absolute top-0 bottom-0 left-0 right-0 bg-gray-03 bg-opacity-50 text-red-600 text-6xl flex items-center justify-around"
            >
              已結束
            </div>
            <div is="vue:CoursesCard" v-if="date.userId === user.id">
              <template #image>
                <img
                  :src="course.coverUrl"
                  :alt="course.title"
                  class="w-full h-64 object-cover"
                />
              </template>
              <template #card-header>
                <h1>{{ course.title }}</h1>
                <PostCourseModal :is-new="false">
                  <template #btn-content>
                    <button
                      typeof="button"
                      class="btn-outline py-2 text-base mb-1"
                      @click="() => getCurrent(date.id)"
                    >
                      編輯
                    </button>
                  </template>
                </PostCourseModal>
              </template>
              <template #card-body>
                <p>
                  時段：{{ $date(date.start).format('YYYY-MM-DD') }} /
                  {{ $date(date.start).format('HH:mm') }}~{{
                    $date(date.end).format('HH:mm')
                  }}
                </p>
                <p>開放人數：{{ date.total }}人</p>
                <p>評分：{{ score(course.scores) }}</p>
                <p class="text-xl text-end">$ {{ toThousand(course.price) }}</p>
              </template>
              <template #card-footer>
                <div
                  class="flex flex-grow gap-3 flex-col md:flex-row justify-between"
                >
                  <DiscountToggle
                    v-model:is-discount="date.isDiscount"
                    :id="date.id"
                    which="courseDates"
                    :price="course.price"
                    class="justify-end my-3 md:my-0 md:justify-start"
                  ></DiscountToggle>
                  <div class="flex flex-col-reverse md:flex-row gap-3">
                    <button
                      typeof="button"
                      class="btn-outline"
                      @click="() => deleteCurrent(date.id)"
                    >
                      刪除
                    </button>
                    <router-link
                      :to="`/course/${date.id}`"
                      class="btn-outline text-center"
                      >課程詳情</router-link
                    >
                    <OrderCourseModal :orders="orders" :id="date.id">
                      <template #btn-content>
                        <button
                          typeof="button"
                          class="btn-primary md:w-max w-full"
                          @click="() => getCurrent(date.id)"
                        >
                          預約詳情
                        </button>
                      </template>
                    </OrderCourseModal>
                  </div>
                </div>
              </template>
            </div>
          </li>
        </template>
      </template>
    </ul>
    <p v-else class="flex items-center justify-around text-3xl h-[35vh]">無販售課程</p>
  </main>
</template>
<script>
import CoursesCard from '../../components/CoursesCard.vue'
import PostCourseModal from '../../components/PostCourseModal.vue'
import OrderCourseModal from '../../components/OrderCourseModal.vue'
import DiscountToggle from '../../components/DiscountToggle.vue'
import { mapState, mapActions } from 'pinia'
import {
  coursesStore,
  userStore,
  ordersStore,
  toThousand,
  updatedImgStore,
  discountStore
} from '../../stores/index.js'
const { VITE_BASEURL } = import.meta.env

export default {
  data() {
    return {
      isImgurLogin:
        sessionStorage.getItem('imgurId') &&
        sessionStorage.getItem('imgurSecret'),
      isImgurToken: sessionStorage.getItem('first_token') !== 'null'
    }
  },
  computed: {
    ...mapState(coursesStore, ['courses']),
    ...mapState(userStore, ['user', 'isLogin']),
    ...mapState(ordersStore, ['orders']),
    ...mapState(discountStore, ['discountData']),
    isAllDiscount() {
      let isDiscountNumber = 0
      let dateNumber = 0
      this.courses.forEach((course) => {
        course.courseDates.forEach((date) => {
          dateNumber++
          if (date.isDiscount) {
            isDiscountNumber++
          }
        })
      })
      return isDiscountNumber === dateNumber
    },
    myCourses() {
      const arr = []
      this.courses.forEach((course) => {
        if (course.userId === +sessionStorage.getItem('userId')) {
          arr.push(course)
        }
      })
      return arr
    }
  },
  methods: {
    toThousand,
    ...mapActions(updatedImgStore, ['getFirstToken']),
    ...mapActions(coursesStore, ['getCoursesData', 'getCurrent']),
    ...mapActions(userStore, ['getUserData', 'checkLogin']),
    ...mapActions(ordersStore, ['getOrdersData']),
    ...mapActions(discountStore, ['getDiscountData']),
    score(scoreData) {
      const total = scoreData.reduce((num, item) => (num += item.score), 0)
      const avg = Math.round((total / scoreData.length) * 10) / 10
      return isNaN(avg) ? 0 : avg.toFixed(1)
    },
    allDiscount() {
      this.courses.forEach((course) => {
        course.courseDates.forEach((date) => {
          if (date.isDiscount) return
          if (
            (this.discountData.type === 'money'
              ? course.price - this.discountData.scale
              : Math.round(course.price * this.discountData.scale)) <= 0
          ) {
            this.$swal.fire({
              icon: 'error',
              title: '內含不可折扣商品,無法全部套用',
              showConfirmButton: false,
              timer: 1500,
              allowOutsideClick: false
            })
            return
          }
          this.$http
            .patch(`${VITE_BASEURL}/courseDates/${date.id}`, {
              isDiscount: true
            })
            .then(() => {
              date.isDiscount = true
            })
        })
      })
    },
    async deleteCurrent(id) {
      const { isConfirmed } = await this.$swal.fire({
        title: '是否刪除該課程',
        showCancelButton: true,
        reverseButtons: true
      })
      if (isConfirmed) {
        await this.$http.delete(`${VITE_BASEURL}/courseDates/${id}`)
        const { isDismissed } = await this.$swal.fire({
          icon: 'success',
          title: '刪除課程成功',
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 1500
        })
        if (isDismissed) this.getCoursesData()
      }
    },
    async imgurLogin() {
      const { value } = await this.$swal.fire({
        title: '登入 imgur 帳號取得驗證',
        html:
          `<label for="imgurId">imgurId</label>
                  <input
                    name="imgurId"
                    id="imgurId"
                    type="text"
                    class="border border-gray-01 p-2 w-full"
                    placeholder="請輸入 imgur 註冊的 Client ID"
                  />` +
          ` <form><label for="imgurSecret">imgurSecret</label>
                  <input
                    name="imgurSecret"
                    id="imgurSecret"
                    type="password"
                    class="border border-gray-01 p-2 w-full"
                    autocomplete="on"
                    v-model.trim="imgur.secret"
                    placeholder="請輸入 imgur 註冊的 Client Secret"
                  /></form>` +
          `<span class="text-sm text-red-500">
                  redirect 需設置成 http://127.0.0.1:5173/#/admin
                </span>`,
        focusConfirm: false,
        confirmButtonText: '登入',
        preConfirm: () => {
          return [
            document.getElementById('imgurId').value,
            document.getElementById('imgurSecret').value
          ]
        }
      })
      if (value && value[0] && value[1]) {
        sessionStorage.setItem('imgurId', value[0])
        sessionStorage.setItem('imgurSecret', value[1])
        const CLIENT_ID = value[0]
        const AUTH_URL = `https://api.imgur.com/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}`
        location.href = AUTH_URL
      }
    }
  },
  mounted() {
    this.checkLogin()
    this.getCoursesData()
    this.getOrdersData()
    this.getDiscountData()
  },
  components: {
    CoursesCard,
    PostCourseModal,
    OrderCourseModal,
    DiscountToggle
  }
}
</script>
