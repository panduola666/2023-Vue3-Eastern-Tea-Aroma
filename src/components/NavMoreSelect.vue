<template>
  <div
    class="flex flex-col justify-between w-full absolute left-0 px-3 py-6 min-h-[90vh] bg-bgImage z-50 shadow-[0_20px_10px_rgba(0,0,0,0.1)]"
  >
    <ul>
      <li>
        <router-link
          @click.prevent="() => $emit('update:open', false)"
          to="/knowledge"
          class="block p-4 text-brand-02 hover:bg-brand-03 hover:bg-opacity-20"
          >茶學小知識</router-link
        >
      </li>
      <li class="flex flex-col">
        <p
          class="p-4 flex justify-between text-brand-02 hover:bg-brand-03 hover:bg-opacity-20 cursor-pointer"
          :class="{ 'more-active': choose.includes('茶藝課堂') }"
          @click="
            () =>
              choose.includes('茶藝課堂')
                ? removeItem('茶藝課堂')
                : pushItem('茶藝課堂')
          "
        >
          茶藝課堂
          <span class="relative">
            <img
              src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/icon+.png?raw=true"
              alt="展開"
              class="object-none transition-all"
              :class="{
                'scale-1': !choose.includes('茶藝課堂'),
                'scale-0': choose.includes('茶藝課堂')
              }"
            />
            <img
              src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/icon-.png?raw=true"
              alt="收合"
              class="transition-all absolute top-0"
              :class="{
                'scale-1': choose.includes('茶藝課堂'),
                'scale-0': !choose.includes('茶藝課堂')
              }"
            />
          </span>
        </p>
        <ul
          v-if="choose.includes('茶藝課堂')"
          @click="() => $emit('update:open', false)"
        >
          <template v-for="(course, index) in coursesList" :key="course.id">
            <li v-if="index < 5">
              <router-link
                :to="`/course/${course.id}`"
                class="block p-4 pl-8 text-gray-01 hover:bg-brand-03 hover:bg-opacity-20"
                >{{ course.title }}</router-link
              >
            </li>
          </template>
        </ul>
      </li>
      <li class="flex flex-col">
        <p
          class="p-4 flex justify-between text-brand-02 hover:bg-brand-03 hover:bg-opacity-20 cursor-pointer"
          :class="{ 'more-active': choose.includes('茶藝用品') }"
          @click="
            () =>
              choose.includes('茶藝用品')
                ? removeItem('茶藝用品')
                : pushItem('茶藝用品')
          "
        >
          茶藝用品
          <span class="relative">
            <img
              src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/icon+.png?raw=true"
              alt="展開"
              class="object-none transition-all"
              :class="{
                'scale-1': !choose.includes('茶藝用品'),
                'scale-0': choose.includes('茶藝用品')
              }"
            />
            <img
              src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/icon-.png?raw=true"
              alt="收合"
              class="transition-all absolute top-0"
              :class="{
                'scale-1': choose.includes('茶藝用品'),
                'scale-0': !choose.includes('茶藝用品')
              }"
            />
          </span>
        </p>
        <ul
          v-if="choose.includes('茶藝用品')"
          @click="() => $emit('update:open', false)"
        >
          <li v-for="(item, index) in productGroups" :key="`前往搜尋${index}`">
            <router-link
              :to="`/shoppingMall?page=1&search=${index}`"
              class="block p-4 pl-8 text-gray-01 hover:bg-brand-03 hover:bg-opacity-20"
              >{{ index }}</router-link
            >
          </li>
        </ul>
      </li>
      <li class="flex flex-col" v-if="isLogin">
        <p
          class="p-4 flex justify-between text-brand-02 hover:bg-brand-03 hover:bg-opacity-20 cursor-pointer"
          :class="{ 'more-active': choose.includes('會員中心') }"
          @click="() => toggleSelected('會員中心')"
        >
          會員中心
          <span class="relative">
            <img
              src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/icon+.png?raw=true"
              alt="展開"
              class="object-none transition-all"
              :class="{
                'scale-1': !choose.includes('會員中心'),
                'scale-0': choose.includes('會員中心')
              }"
            />
            <img
              src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/icon-.png?raw=true"
              alt="收合"
              class="transition-all absolute top-0"
              :class="{
                'scale-1': choose.includes('會員中心'),
                'scale-0': !choose.includes('會員中心')
              }"
            />
          </span>
        </p>
        <ul
          v-if="choose.includes('會員中心')"
          @click="() => $emit('update:open', false)"
        >
          <li>
            <router-link
              to="/user"
              class="block p-4 pl-8 text-gray-01 hover:bg-brand-03 hover:bg-opacity-20"
              >會員專區
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: '課程預約' }"
              class="block p-4 pl-8 text-gray-01 hover:bg-brand-03 hover:bg-opacity-20"
              >課程預約</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ name: '訂單詳情' }"
              class="block p-4 pl-8 text-gray-01 hover:bg-brand-03 hover:bg-opacity-20"
              >訂單詳情</router-link
            >
          </li>
          <li v-if="user.isAdmin">
            <router-link
              to="/admin"
              class="block p-4 pl-8 text-gray-01 hover:bg-brand-03 hover:bg-opacity-20"
              >後台管理</router-link
            >
          </li>
        </ul>
      </li>
    </ul>
    <div class="mt-8">
      <router-link
        to="/"
        class="block p-4 w-full text-gray-02 text-center hover:bg-brand-03 hover:bg-opacity-20 cursor-pointer"
        @click="() => moreNavSignOut()"
        v-if="isLogin"
      >
        登出
      </router-link>
      <router-link
        to="/login"
        class="btn-primary xl:text-xl leading-6 font-medium text-base block"
        @click="() => $emit('update:open', false)"
        v-else
        >登入/註冊</router-link
      >
    </div>
  </div>
</template>
<script>
export default {
  props: {
    open: {
      type: Boolean
    },
    coursesList: {
      type: Object
    },
    productGroups: {
      type: Object
    },
    user: {
      type: Object
    },
    signOut: {
      type: Function
    },
    isLogin: {
      type: Boolean
    }
  },
  data() {
    return {
      choose: []
    }
  },
  methods: {
    toggleSelected(str) {
      this.choose.includes(str) ? this.removeItem(str) : this.choose.push(str)
    },
    pushItem(str) {
      this.choose.push(str)
    },
    removeItem(str) {
      const index = this.choose.indexOf(str)
      this.choose.splice(index, 1)
    },
    moreNavSignOut() {
      this.$emit('update:open', false)
      this.signOut()
    }
  }
}
</script>
<style scoped>
.more-active {
  background-color: rgba(162, 190, 149, 0.2);
}
.bg-bgImage {
  background-image: url('https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/Background.png?raw=true');
}
</style>
