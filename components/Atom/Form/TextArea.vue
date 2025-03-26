<script setup>
const props = defineProps({
  placeholder: {
    type: String,
    default: '請輸入',
  },
  id: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['update:word'])
const { placeholder, id } = toRefs(props)
const word = ref('')

const updateWord = () => {
  emits('update:word', word.value)
}
</script>

<template>
  <textarea
    :id="id"
    type="text"
    v-model="word"
    class="flex w-full justify-end rounded-md border-0 bg-pr px-2 py-2 text-sm text-white outline outline-[1px] outline-white/50 placeholder:text-gray-400 focus:outline-pr-light focus-visible:outline-pr-light"
    :placeholder="placeholder"
    @input="updateWord"
  ></textarea>
</template>

<style scoped></style>
