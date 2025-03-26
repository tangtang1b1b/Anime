<script setup>
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  isCursor: {
    type: Boolean,
    default: false
  }
})
const { label, name } = toRefs(props)
</script>

<template>
  <div class="flex text-sm flex-col gap-1 text-white">
    <label class="font-bold" :class="{'cursor-pointer' : isCursor}" :for="label">{{ name }}</label>
    <slot />
  </div>
</template>

<style scoped></style>