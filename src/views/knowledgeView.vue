<template>
  <main class="wrap grid lg:grid-cols-5 gap-4">
    <teleport to="title">茶學小知識</teleport>
    <ol
      class="flex lg:flex-col bg-brand-06 text-brand-05 font-black font-self text-xl h-max"
    >
      <li
        class="relative"
        v-for="(item, index) in asideList"
        :key="item + index"
      >
        <input
          type="radio"
          name="productType"
          :id="item + index"
          v-model.trim="chooseType"
          :value="item"
          class="absolute opacity-0"
        />
        <label
          :for="item + index"
          :class="{ 'bg-brand-01 bg-opacity-30': currentChoose === item }"
          @click="() => (currentChoose = item)"
          class="block w-full p-4 hover:bg-brand-01 hover:bg-opacity-30 cursor-pointer"
          >{{ item }}</label
        >
      </li>
    </ol>
    <article
      v-if="currentChoose === '茶學演變'"
      class="bg-white bg-opacity-30 lg:col-span-4 p-4 text-gray-01 text-lg tracking-widest grid gap-4"
    >
      <h1 class="text-3xl font-self">茶學演變</h1>
      <p class="indent-8">
        古人何時開始飲茶，眾說紛紜，最廣為人知的起源莫過於傳說中神農氏嚐百草，發現以水煮葉後服用可解毒：「神農嚐百草，日遇七十二毒，得荼而解之」，到《晏子春秋》『晏相齊景公時，食脫粟之飯，炙三戈、五卵、茗菜而已』的食用，再到西漢王褒《僮約》『烹茶盡具』、『五都買茶』的飲用。
      </p>
      <p class="indent-8">
        兩晉時代，茶文化漸漸嶄露頭角，『以茶養廉』『以茶為祭』『以茶代酒』等在貴族有識之士中逐漸成為主流，以茶侍客的習俗也由此開始。隨著茶的飲用價值逐漸提升
      </p>
      <p class="indent-8">
        直至唐朝，茶文化才真正興起。家喻戶曉的「茶聖」陸羽生於盛唐開元年間，他著述的《茶經》是已知世上最早關於茶的專著，『飲茶健康』、『以禮致和』、『以簡為德』的茶道精神確立，種茶採茶、制茶方法、飲茶方式以及飲茶用具也由此開始演變，堪稱集大成之作，對飲茶習慣影響深遠。
      </p>
      <p class="indent-8">
        宋代，是古代茶道最盛之時，正所謂「茶，興於唐，盛於宋」。其時主要的備茶方式為點茶法，即是先將茶餅磨成細末，置於茶盌內，注入沸水，再加以擊拂，形成細滑如乳的泡沫。每個步驟都一絲不苟，有如禪修，靜心凝神，修身養性。點茶法東傳至日本後，孕育出茶道精神，今時今日大行其道的抹茶也是起源於此。
      </p>
      <img
        src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/teaBook.jpg?raw=true"
        alt="茶經"
        class="object-cover w-full"
      />
    </article>
    <div
      v-if="currentChoose === '活動資訊'"
      class="bg-white bg-opacity-30 lg:col-span-4 p-4 text-gray-01 text-lg tracking-widest grid gap-4"
    >
      <h1 class="text-3xl font-self">活動資訊</h1>
      <ul class="grid gap-5">
        <li
          is="vue:CoursesCard"
          v-for="activity in activities"
          :key="activity.id"
        >
          <template #image>
            <img
              :src="activity.coverUrl"
              :alt="activity.title"
              class="h-full w-full object-cover"
            />
          </template>
          <template #card-header>
            {{ activity.title }}
            <span class="text-brand-05 text-base self-center font-sans">
              {{ activity.type }}</span
            >
          </template>
          <template #card-body>
            <article
              v-html="activity.content"
              class="flex-grow overflow-hidden max-h-20 text-sm"
            ></article>
          </template>
          <template #card-footer>
            <router-link
              :to="`/activity/${activity.id}`"
              class="btn-primary py-2 px-4"
              >活動詳情</router-link
            >
          </template>
        </li>
      </ul>
    </div>
  </main>
</template>
<script>
import CoursesCard from '../components/CoursesCard.vue'
import { mapState, mapActions } from 'pinia'
import { activitiesStore } from '../stores/index.js'
export default {
  data() {
    return {
      chooseType: '',
      currentChoose: '茶學演變',
      asideList: ['茶學演變', '活動資訊']
    }
  },
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
    CoursesCard
  }
}
</script>
