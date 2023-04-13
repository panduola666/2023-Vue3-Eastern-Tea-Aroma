<template>
  <div @click="openModal">
    <slot name="modal-btn">按鈕</slot>
  </div>
  <TransitionRoot appear :show="isOpen" as="template">
    <myDialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex h-full justify-center p-4 text-center items-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-5/6 overflow-auto transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all min-h-max max-h-full"
            >
              <DialogTitle
                as="div"
                class="flex justify-between items-center border-b-2 pb-2"
              >
                <slot name="modal-header">標題</slot>
                <button
                  type="button"
                  class="mr-2 text-gray-02 hover:text-gray-01 text-2xl leading-[24px]"
                  @click="closeModal"
                >
                  x
                </button>
              </DialogTitle>
              <div class="mt-2">
                <slot name="modal-body">內文</slot>
              </div>

              <div class="mt-4 text-end">
                <slot name="modal-footer">
                  <slot name="modal-footerBTN">
                    <button
                      type="button"
                      @click="closeModal"
                      class="btn-outline py-2 mr-2"
                    >
                      取消
                    </button>
                  </slot>
                  <button
                    type="button"
                    @click="finish"
                    class="btn-primary py-2"
                  >
                    確認
                  </button>
                </slot>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </myDialog>
  </TransitionRoot>
</template>

<script>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'

export default {
  props: {
    finishFn: {
      type: Function
    },
    cancelFn: {
      type: Function
    },
    isFinish: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    finish() {
      this.finishFn && this.finishFn()
      if (this.isFinish) {
        this.isOpen = false
      }
    },
    closeModal() {
      this.isOpen = false
      this.cancelFn && this.cancelFn()
    },
    openModal() {
      this.isOpen = true
    }
  },
  watch: {
    isFinish() {
      if (this.isFinish) {
        this.isOpen = false
      }
    }
  },
  components: {
    TransitionRoot,
    TransitionChild,
    myDialog: Dialog,
    DialogPanel,
    DialogTitle
  }
}
</script>
