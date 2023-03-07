<template>
  <div class="xl:w-[70%] lg:w-[80%] w-[90%] mx-auto">
    <section class="flex justify-between mt-14 mb-2">
      <h2
        class="text-brand-02 text-[32px] leading-[38px] font-black font-self self-center"
      >
        活動資訊
      </h2>
      <div class="flex">
        <div
          class="relative group cursor-pointer"
          @click="() => activitiesData.unshift(...activitiesData.splice(-3, 3))"
        >
          <img
            src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/type=L,%20status=Default.png?raw=true"
            alt="上一頁"
          />
          <img
            src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/type=L,%20status=Hover.png?raw=true"
            alt="上一頁"
            class="absolute top-0 group-hover:opacity-100 opacity-0 px-3 py-2 transition-all duration-500"
          />
        </div>
        <div
          class="relative group cursor-pointer"
          @click="() => activitiesData.push(...activitiesData.splice(0, 3))"
        >
          <img
            src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/type=R,%20status=Default.png?raw=true"
            alt="下一頁"
          />
          <img
            src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/type=R,%20status=Hover.png?raw=true"
            alt="下一頁"
            class="absolute top-0 group-hover:opacity-100 opacity-0 px-3 py-2 transition-all duration-500"
          />
        </div>
      </div>
    </section>
    <ul class="grid lg:grid-cols-3 lg:gap-6 gap-4">
      <template v-for="(activity, index) in activitiesData" :key="activity.id">
        <li
          class="bg-white hover:shadow-[4px_16px_30px_rgba(0,0,0,.1)] cursor-pointer"
          v-if="index < 3"
        >
          <router-link :to="`/activity/${activity.id}`">
            <img
              :src="activity.coverUrl"
              :alt="activity.title"
              class="w-full lg:h-[312px] h-64 object-cover"
            />
            <article class="relative lg:px-8 px-4 lg:py-10 py-6">
              <span
                class="absolute text-white lg:py-2 py-1 lg:px-3 px-2 lg:text-xl text-base lg:leading-6 leading-5 font-medium bg-brand-01 top-0 lg:left-[8%] md:left-[2%] left-[3%] -translate-y-1/2"
                >{{ activity.type }}</span
              >
              <section
                class="flex items-center justify-between lg:pb-4 pb-3 border-b-2 border-line"
              >
                <h1
                  class="lg:text-[28px] text-2xl lg:leading-8 leading-7 font-black font-self text-brand-05 truncate"
                >
                  {{ activity.title }}
                </h1>
                <span
                  class="lg:text-xl text-base lg:leading-[30px] text-brand-04 whitespace-nowrap"
                  >{{ $date(activity.created).format('YYYY-MM-DD') }}</span
                >
              </section>
              <article
                class="lg:h-[120px] h-[72px] overflow-hidden lg:text-xl text-base lg:leading-[30px] text-gray-02 lg:mt-4 mt-3 lg:mb-6 mb-4"
                v-html="activity.content"
              ></article>
              <p
                class="text-brand-02 lg:text-xl text-base lg:leading-6 leading-5 font-medium"
              >
                活動詳情 >
              </p>
            </article>
          </router-link>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia'
import { activitiesStore } from '../stores/index.js'
export default {
  data() {
    return {
      activitiesData: []
    }
  },
  computed: {
    ...mapState(activitiesStore, ['activities'])
  },
  methods: {
    ...mapActions(activitiesStore, ['getAllActivitiesData'])
  },
  watch: {
    activities(data) {
      this.activitiesData = [...data]
    }
  },
  mounted() {
    this.getAllActivitiesData()
  }
}
</script>
