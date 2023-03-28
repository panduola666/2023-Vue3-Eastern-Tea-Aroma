<template>
  <teleport to="title">{{ activity.title }}</teleport>
  <main class="wrap min-h-[50vh] bg-white px-3 py-5 bg-opacity-50">
    <h1 class="text-3xl font-black font-self text-brand-02 mb-5">
      {{ activity.title }}
    </h1>
    <h2 class="text-end text-gray-02">
      創建時間：{{ $date(activity.created).format('YYYY-MM-DD HH:mm:ss') }}
    </h2>
    <article
      class="text-xl text-gray-01 mt-3 mb-10"
      v-html="activity.content"
    ></article>
    <img
      :src="activity.coverUrl"
      :alt="activity.title"
      class="w-full max-h-96 object-cover"
    />
    <p class="mt-10 pt-3 border-t-2 border-brand-02">更多活動</p>
    <ul class="list-inside list-disc text-gray-02">
      <template v-for="(activity, index) in activities" :key="activity.id">
        <li
          class="text-gray-02 py-2 px-1"
          v-if="index < 5 && activity.id !== +this.$route.params.id"
        >
          <router-link
            :to="`/activity/${activity.id}`"
            class="hover:text-gray-01 underline underline-offset-2 hover:bg-brand-03 hover:bg-opacity-20"
          >
            {{ activity.title }}
          </router-link>
        </li>
      </template>
    </ul>
  </main>
</template>
<script>
import { mapState, mapActions } from 'pinia'
import { activitiesStore } from '../stores/index.js'
const { MODE } = import.meta.env
export default {
  computed: {
    ...mapState(activitiesStore, ['activity', 'activities']),
    modeUrl() {
      return MODE === 'production'
        ? 'https://panduola666.github.io/2023-Vue3-Eastern-Tea-Aroma/#/activity/'
        : 'http://127.0.0.1:5173/#/activity/'
    }
  },
  methods: {
    ...mapActions(activitiesStore, [
      'getCurrentActivity',
      'getAllActivitiesData'
    ])
  },
  watch: {
    '$route.params'({ id }) {
      this.getCurrentActivity(id)
    }
  },
  mounted() {
    this.getCurrentActivity(this.$route.params.id)
    this.getAllActivitiesData()
  }
}
</script>
