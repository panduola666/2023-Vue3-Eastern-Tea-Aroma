<template>
  <div class="text-end">
    <PostActivitiesModal :is-new="true" @click="() => (currentId = 0)">
      <template #btn-content>
        <button type="button" class="btn-primary lg:px-10 py-2 text-lg">
          新增活動
        </button>
      </template>
    </PostActivitiesModal>
  </div>
  <section class="bg-white p-3 pb-10 mt-3">
    <h2 class="text-xl mb-3">活動列表</h2>
    <ul class="rounded-md grid gap-3">
      <Disclosure
        v-slot="{ open }"
        as="li"
        class="flex gap-3"
        v-for="activity in activities"
        :key="activity.index"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6 fill-red-300 hover:fill-red-600 cursor-pointer flex-shrink-0 my-2"
          @click="() => deleteActivity(activity.id)"
        >
          <path
            fill-rule="evenodd"
            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
            clip-rule="evenodd"
          />
        </svg>
        <div class="flex-grow w-1">
          <DisclosureButton
            class="py-2 flex items-center justify-between px-3 bg-opacity-30 rounded-md hover:bg-opacity-30 w-full"
            :class="{
              'bg-brand-01 hover:bg-brand-02': open,
              'bg-brand-03 hover:bg-brand-01': !open
            }"
          >
            <h3 class="text-lg font-bold truncate">
              {{ activity.title }}
            </h3>
            <img
              src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/icon-.png?raw=true"
              alt="收合"
              v-if="open"
            />
            <img
              src="https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/icon+.png?raw=true"
              alt="展開"
              v-else
            />
          </DisclosureButton>
          <DisclosurePanel>
            <article
              class="m-3 max-h-36 overflow-hidden"
              v-html="activity.content"
            ></article>
            <div class="flex justify-end gap-3">
              <router-link
                :to="`/activity/${activity.id}`"
                type="button"
                class="btn-outline py-1 px-2"
              >
                查看活動
              </router-link>
              <PostActivitiesModal
                :is-new="false"
                :activity-id="currentId"
                @click="() => (currentId = activity.id)"
              >
                <template #btn-content>
                  <button type="button" class="btn-outline py-1 px-2">
                    編輯
                  </button>
                </template>
              </PostActivitiesModal>
            </div>
          </DisclosurePanel>
        </div>
      </Disclosure>
    </ul>
  </section>
</template>
<script>
import PostActivitiesModal from '@/components/PostActivitiesModal.vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { mapState, mapActions } from 'pinia'
import { activitiesStore } from '@/stores/index.js'
const { VITE_BASEURL } = import.meta.env

export default {
  data() {
    return {
      currentId: 0
    }
  },
  computed: {
    ...mapState(activitiesStore, ['activities'])
  },
  methods: {
    ...mapActions(activitiesStore, ['getAllActivitiesData']),
    async deleteActivity(id) {
      const { isConfirmed } = await this.$swal.fire({
        title: '是否刪除該活動',
        showCancelButton: true,
        reverseButtons: true
      })
      if (isConfirmed) {
        await this.$http.delete(`${VITE_BASEURL}/activities/${id}`)
        const { isDismissed } = await this.$swal.fire({
          icon: 'success',
          title: '刪除成功',
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 1500
        })
        if (isDismissed) this.getAllActivitiesData()
      }
    }
  },
  mounted() {
    this.getAllActivitiesData()
  },
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    PostActivitiesModal
  }
}
</script>
