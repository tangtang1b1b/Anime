<script setup>
import { darkTheme } from 'naive-ui'
const { locale } = useI18n()
import { useAllStore } from '@/store/all'
const { isScroll, theme } = toRefs(useAllStore())
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})
const { data } = toRefs(props)

const isDarkMode = ref(true)

onMounted(() => {
  watch(
    isDarkMode,
    (value) => {
      if (value) {
        theme.value = darkTheme
      } else {
        theme.value = null
      }
    },
    { immediate: true },
  )
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      isScroll.value = true
    } else {
      isScroll.value = false
    }
  })
})
</script>

<template>
  <header class="fixed left-0 top-0 z-100 h-[70px] w-full border-b border-white bg-black">
    <div class="z-50 mx-auto flex size-full items-center justify-between bg-txt-light px-5 duration-300">
      <div class="flex h-full w-40 items-center justify-center">
        <NuxtLinkLocale to="/" class="size-full content-center">
          <img class="w-full" :src="fetchImg('/images/logo.png')" alt="logo" />
        </NuxtLinkLocale>
      </div>
      <!-- <div class="flex items-center gap-2 font-Montserrat">
        <n-switch v-model:value="isDarkMode">
          <template #checked> OFF </template>
          <template #unchecked> ON </template>
        </n-switch>
        <p :theme="theme" class="text-white">闇黑模式</p>
      </div> -->
      <!-- <div class="flex divide-x text-white font-Montserrat">
        <SwitchLocalePathLink locale="zh" :class="locale === 'zh' ? 'text-txt-super-light' : ''" class="px-2 hover:text-txt-super-light duration-300">zh</SwitchLocalePathLink>
        <SwitchLocalePathLink locale="en" :class="locale === 'en' ? 'text-txt-super-light' : ''" class="px-2 hover:text-txt-super-light duration-300">en</SwitchLocalePathLink>
      </div> -->
    </div>
  </header>
</template>

<style scoped></style>
