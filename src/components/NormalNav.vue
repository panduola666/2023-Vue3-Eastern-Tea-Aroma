<template>
  <nav class="shadow-md">
    <div
      class="mx-auto xl:w-[70%] lg:w-[80%] w-[90%] flex justify-between items-center pb-2"
    >
      <router-link to="/" class="pb-[10px] pt-[18px]">
        <img src="../assets/logo.png" alt="東方茶香logo" />
      </router-link>
      <ul class="hidden items-center text-brand-02 gap-7 xl:gap-14 lg:flex">
        <li class="text-xl leading-[30px] pb-[10px] pt-[18px]">
          <router-link to="/knowledge">茶學資訊</router-link>
        </li>
        <li class="group relative">
          <router-link
            to="/courses"
            class="flex transition-all group-hover:text-brand-01 text-xl leading-[30px] pb-[10px] pt-[18px]"
          >
            茶藝課堂
            <img
              src="../assets/Property 1=arrow-down.png"
              alt=""
              class="group-hover:-rotate-180 transition"
            />
          </router-link>
          <ul
            class="absolute button-0 left-0 hidden group-hover:block bg-white min-w-[216px] z-10 text-gray-01 shadow-lg"
          >
            <li>
              <router-link
                to=""
                class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20"
                >茶的風味鑑賞學</router-link
              >
            </li>
            <li>
              <router-link
                to=""
                class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20"
                >茶席基礎入門</router-link
              >
            </li>
            <li>
              <router-link
                to=""
                class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20"
                >不一樣的台灣茶</router-link
              >
            </li>
            <li>
              <router-link
                to=""
                class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20"
                >鍋煮香料奶茶學</router-link
              >
            </li>
            <li>
              <router-link
                to=""
                class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20"
                >茶藝文化</router-link
              >
            </li>
          </ul>
        </li>
        <li class="group relative">
          <router-link
            to="/shoppingMall"
            class="flex transition-all group-hover:text-brand-01 text-xl leading-[30px] pb-[10px] pt-[18px]"
          >
            茶藝用品
            <img
              src="../assets/Property 1=arrow-down.png"
              alt=""
              class="group-hover:-rotate-180 transition"
            />
          </router-link>
          <ul
            class="absolute button-0 left-0 hidden group-hover:block bg-white min-w-[216px] z-10 text-gray-01 shadow-lg"
          >
            <li>
              <router-link
                to=""
                class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20"
                >茶葉</router-link
              >
            </li>
            <li>
              <router-link
                to=""
                class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20"
                >茶壺</router-link
              >
            </li>
            <li>
              <router-link
                to=""
                class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20"
                >茶罐</router-link
              >
            </li>
            <li>
              <router-link
                to=""
                class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20"
                >茶具組</router-link
              >
            </li>
            <li>
              <router-link
                to=""
                class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20"
                >品茶小物</router-link
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
                src="../assets/Property 1=account.png"
                alt="會員專區"
                class="object-contain h-9 max-w-[30px] mb-[10px] mt-[18px]"
              />
            </router-link>
            <ul
              class="absolute bg-white min-w-[216px] button-0 group-hover:block hidden text-gray-01 z-10 shadow-lg"
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
                  :to="{ name: '課程預約' }"
                  class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20"
                  >課程預約</router-link
                >
              </li>
              <li>
                <router-link
                  :to="{ name: '訂單詳情' }"
                  class="block px-4 py-5 hover:bg-brand-03 hover:bg-opacity-20"
                  >訂單詳情</router-link
                >
              </li>
              <li>
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
                  @click="signOut()"
                >
                  登出
                </router-link>
              </li>
            </ul>
          </div>
        </section>
        <section class="flex mb-[10px] mt-[18px]">
          <router-link to="shopCart" class="relative"
            ><img
              src="../assets/Property 1=cart@2x.png"
              alt="購物車"
              class="w-[30px] mr-6 hover:brightness-125"
            />
            <div
              class="absolute bg-brand-02 text-white text-xs leading-[16px] font-medium px-1 min-w-[16px] max-h-[16px] rounded-lg -top-[5px] left-[14px]"
            >
              99+
            </div>
          </router-link>
          <div class="relative flex items-center lg:hidden cursor-pointer">
            <img
              src="../assets/Property 1=more.png"
              alt="more"
              class="w-[30px] transition-all hover:brightness-125 hover:duration-[0s]"
              :class="{
                'scale-1': !openMore,
                'scale-0': openMore,
              }"
              @click.prevent="openMore = !openMore"
            />
            <img
              src="../assets/Property 1=close@2x.png"
              alt="關閉"
              class="w-[30px] transition-all absolute top-0 left-0 hover:brightness-75 hover:duration-[0s]"
              :class="{
                'scale-1': openMore,
                'scale-0': !openMore,
              }"
              @click.prevent="openMore = !openMore"
            />
          </div>
        </section>
      </div>
    </div>
    <nav-more-select
      v-if="openMore"
      v-model:open="openMore"
      :to-href="userHref"
    ></nav-more-select>
  </nav>
</template>
<script>
import navMoreSelect from "./NavMoreSelect.vue";
import { mapState, mapActions } from "pinia";
import { userStore } from "../stores/index.js";

export default {
  data() {
    return {
      openMore: false,
    };
  },
  computed: {
    ...mapState(userStore, ["isLogin"]),
  },
  methods: {
    ...mapActions(userStore, ["signOut"]),
  },
  components: {
    navMoreSelect,
  },
  mounted() {
  },
};
</script>
