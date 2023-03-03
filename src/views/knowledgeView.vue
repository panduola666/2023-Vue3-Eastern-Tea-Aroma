<template>
  <main class="wrap grid lg:grid-cols-5 gap-4">
    <ol
      class="flex lg:flex-col bg-brand-06 text-brand-05 font-black font-self text-xl h-max"
    >
      <li
        class="relative"
        v-for="(item, index) in productTypes"
        :key="item + index"
      >
        <input
          type="radio"
          name="productType"
          :id="item + index"
          v-model="chooseType"
          :value="item"
          class="absolute opacity-0"
        />
        <label
          :for="item + index"
          :class="{ 'bg-brand-01 bg-opacity-30': currentChoose === item }"
          @click="currentChoose = item"
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
      <img src="../assets/課堂04.png" alt="" class="object-cover w-full" />
    </article>
    <form
      action=""
      v-else-if="currentChoose === '問題反饋'"
      class="bg-white bg-opacity-30 lg:col-span-4 p-4 text-gray-01 text-lg tracking-widest grid gap-8"
    >
      <h1 class="text-3xl font-self">問題反饋</h1>
      <div class="flex flex-col gap-1">
        <label for="question" class="text-gray-02">問題</label>
        <input type="text" name="question" id="question" class="p-2" required />
      </div>
      <div class="flex flex-col gap-1">
        <label for="email" class="text-gray-02">聯絡信箱</label>
        <input type="email" name="email" id="email" class="p-2" required />
      </div>
      <div class="flex flex-col gap-1">
        <label for="detailed" class="text-gray-02">詳細情況</label>
        <textarea
          name="detailed"
          id="detailed"
          cols="30"
          rows="10"
          class="p-2"
          required
        ></textarea>
      </div>
      <button class="btn-outline text-xl">送出</button>
    </form>
  </main>
</template>
<script>
export default {
  data() {
    return {
      chooseType: '',
      currentChoose: '茶學演變',
      productTypes: ['茶學演變', '活動資訊', '文章分享', '相關證照', '問題反饋']
    }
  }
}
</script>
