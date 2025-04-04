<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
})
const { modelValue, isOpen } = toRefs(props)

const emits = defineEmits(['update:modelValue', 'update:confirm'])

const closeModal = () => {
  emits('update:modelValue', false)
}

const confirm = () => {
  closeModal()
  emits('update:confirm')
}
</script>

<template>
  <div class="fixed inset-0" v-if="modelValue">
    <Teleport to="#modalsField">
      <AtomBackdrop :is-open="isOpen" @click="closeModal" />
      <Transition name="fade" appear>
        <div
          class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-3 justify-between rounded-lg bg-white p-5 shadow-popup"
        >
          <div>
            <div class="text-center text-xl font-medium leading-[26px] text-alert">
              確定要刪除此筆資料嗎？
            </div>
          </div>
          <div class="flex w-full gap-3">
            <div
              class="w-1/2 cursor-pointer content-center rounded-lg p-2 bg-white hover:bg-[#31B05C] hover:text-white text-center text-[15px] font-semibold border-[#31B05C] border leading-[18.15px] text-[#31B05C] duration-300 hover:brightness-110"
              @click="confirm"
            >
              確認
            </div>
            <div
              class="w-1/2 cursor-pointer content-center rounded-lg p-2 bg-[#31B05C] text-center text-[15px] font-semibold leading-[18.15px] text-white duration-300 hover:brightness-110"
              @click="closeModal"
            >
              取消
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transform: translate(-50%, -50%);
  transition: 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  transform: translate(-50%, -30%);
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  transform: translate(-50%, -50%);
  opacity: 1;
}
</style>
