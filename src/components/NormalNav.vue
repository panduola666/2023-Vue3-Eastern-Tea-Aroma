<template>
  <nav class="shadow-md">
    <div
      class="mx-auto xl:w-[70%] lg:w-[80%] w-[90%] flex justify-between items-center pb-2"
    >
      <router-link to="/" class="pb-[10px] pt-[18px]">
        <img
          src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/logo.png?raw=true"
          alt="東方茶香logo"
        />
      </router-link>
      <ul class="hidden items-center text-brand-02 gap-7 xl:gap-14 lg:flex">
        <li
          class="text-xl leading-[30px] pb-[10px] pt-[18px] hover:text-brand-01"
        >
          <router-link to="/knowledge">茶學資訊</router-link>
        </li>
        <li class="group relative">
          <router-link
            to="/courses"
            class="flex transition-all group-hover:text-brand-01 text-xl leading-[30px] pb-[10px] pt-[18px]"
            :class="{ 'font-semibold': this.$route.path === '/courses' }"
          >
            茶藝課堂
            <img
              src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/Property%201=arrow-down.png?raw=true"
              alt="下拉選單"
              class="group-hover:-rotate-180 transition"
            />
          </router-link>
          <ul
            class="absolute button-0 left-0 hidden group-hover:block bg-white min-w-[216px] text-gray-01 shadow-lg z-50"
          >
            <template v-for="(course, index) in coursesList" :key="course.id">
              <li v-if="index < 5">
                <router-link
                  :to="`/course/${course.id}`"
                  class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20"
                  >{{ course.title }}</router-link
                >
              </li>
            </template>
          </ul>
        </li>
        <li class="group relative">
          <router-link
            to="/shoppingMall?page=1&search="
            class="flex transition-all group-hover:text-brand-01 text-xl leading-[30px] pb-[10px] pt-[18px]"
            :class="{
              'font-semibold': this.$route.path === '/shoppingMall'
            }"
          >
            茶藝用品
            <img
              src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/Property%201=arrow-down.png?raw=true"
              alt="展開"
              class="group-hover:-rotate-180 transition"
            />
          </router-link>
          <ul
            class="absolute button-0 left-0 hidden group-hover:block bg-white min-w-[216px] z-50 text-gray-01 shadow-lg"
          >
            <li
              v-for="(item, index) in productGroups"
              :key="`前往搜尋${index}`"
            >
              <router-link
                :to="`/shoppingMall?page=1&search=${index}`"
                class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20"
                >{{ index }}</router-link
              >
            </li>
          </ul>
        </li>
      </ul>
      <div class="flex items-center">
        <section class="mr-8 lg:flex hidden items-center">
          <!-- 未登入 -->
          <router-link
            to="/login"
            class="btn-primary xl:text-xl leading-6 font-semibold text-base w-full"
            v-if="!isLogin"
            >登入/註冊</router-link
          >
          <div class="relative group" v-else>
            <!-- 已登入 -->
            <router-link to="/user">
              <img
                src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/Property%201=account.png?raw=true"
                alt="會員專區"
                class="object-contain h-9 max-w-[30px] mb-[10px] mt-[18px]"
              />
            </router-link>
            <ul
              class="absolute bg-white min-w-[216px] button-0 group-hover:block hidden text-gray-01 z-50 shadow-lg"
            >
              <li>
                <router-link
                  to="/user"
                  class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20"
                  >會員專區</router-link
                >
              </li>
              <li>
                <router-link
                  :to="{ name: 'reserve' }"
                  class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20"
                  >課程預約</router-link
                >
              </li>
              <li>
                <router-link
                  :to="{ name: 'userOrders' }"
                  class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20"
                  >訂單詳情</router-link
                >
              </li>
              <li v-if="user.isAdmin">
                <router-link
                  to="/admin"
                  class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20"
                  >後台管理</router-link
                >
              </li>
              <li>
                <router-link
                  to="/"
                  class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20 text-gray-02 w-full"
                  @click="() => signOut()"
                >
                  登出
                </router-link>
              </li>
            </ul>
          </div>
        </section>
        <section class="flex mb-[10px] mt-[18px]" v-if="isLogin">
          <router-link :to="{ name: 'shopCart' }" class="relative"
            ><img
              src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/Property%201=cart@2x.png?raw=true"
              alt="購物車"
              class="w-[30px] mr-6 hover:brightness-125"
            />
            <div
              class="shoppingCartNumber transform absolute bg-brand-02 text-white text-xs leading-[16px] font-medium px-1 min-w-[16px] max-h-[16px] rounded-lg -top-[5px] left-[14px]"
              v-if="isLogin && shoppingCartLength > 0"
            >
              {{ shoppingCartLength > 99 ? '99+' : shoppingCartLength }}
            </div>
          </router-link>
        </section>
        <div
          class="relative flex items-center lg:hidden cursor-pointer mb-[10px] mt-[18px]"
        >
          <img
            src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/Property%201=more.png?raw=true"
            alt="more"
            class="w-[30px] transition-all hover:brightness-125 hover:duration-[0s]"
            :class="{
              'scale-1': !openMore,
              'scale-0': openMore
            }"
            @click.prevent="() => (openMore = !openMore)"
          />
          <img
            src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/Property%201=close@2x.png?raw=true"
            alt="關閉"
            class="w-[30px] transition-all absolute hover:brightness-75 hover:duration-[0s]"
            :class="{
              'scale-1': openMore,
              'scale-0': !openMore
            }"
            @click.prevent="() => (openMore = !openMore)"
          />
        </div>
      </div>
    </div>
    <navMoreSelect
      v-if="openMore"
      v-model:open="openMore"
      :coursesList="coursesList"
      :productGroups="productGroups"
      :user="user"
      :sign-out="signOut"
      :is-login="isLogin"
    />
  </nav>
</template>
<script>
import navMoreSelect from './NavMoreSelect.vue'
import { mapState, mapActions } from 'pinia'
import { userStore, coursesStore, productsStore } from '../stores/index.js'

export default {
  data() {
    return {
      openMore: false
    }
  },
  computed: {
    ...mapState(userStore, ['isLogin', 'user']),
    ...mapState(coursesStore, ['courses']),
    ...mapState(productsStore, ['productGroups']),
    shoppingCartLength() {
      return (
        this.user.shoppingCart?.cart.products.length +
        this.user.shoppingCart?.cart.courses.length
      )
    },
    coursesList() {
      const list = []
      this.courses.forEach((course) => {
        course.courseDates.forEach((date) => {
          const data = {
            id: date.id,
            title: course.title
          }
          const index = list.findIndex((item) => item.title === course.title)
          if (index !== -1) list.splice(index, 1)
          list.push(data)
        })
      })
      return list.sort((a, b) => b.id - a.id)
    }
  },
  methods: {
    ...mapActions(userStore, ['signOut']),
    ...mapActions(coursesStore, ['getCoursesData']),
    ...mapActions(productsStore, ['getAllProducts'])
  },
  components: {
    navMoreSelect
  },
  mounted() {
    this.getAllProducts()
    this.getCoursesData()
  }
}
</script>
<style>
.shoppingCartNumber {
  animation: bounce 1s infinite;
}
@keyframes bounce {
  0% {
    top: -5px;
  }
  50% {
    top: -8px;
  }
  100% {
    top: -5px;
  }
}
</style>
