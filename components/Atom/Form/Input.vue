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
  type: {
    type: String,
    default: 'text',
  },
})
const emits = defineEmits(['update:word'])
const { placeholder, id, type } = toRefs(props)
const word = ref('')

const updateWord = () => {
  emits('update:word', word.value)
}
</script>

<template>
  <input
    :id="id"
    :type="type"
    v-model="word"
    class="flex w-full rounded-md bg-pr px-2 py-2 text-sm text-white outline outline-[1px] outline-white/50 placeholder:text-gray-400 focus:outline-pr-light focus-visible:outline-pr-light"
    :placeholder="placeholder"
    @input="updateWord"
  />
</template>

<style scoped>

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-text-fill-color: white;
  -webkit-box-shadow: 0 0 0px 1000px #2e343b inset;
}
</style>
