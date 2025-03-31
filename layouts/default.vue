<script setup>
import { useAllStore } from '@/store/all'
const { allData, theme } = toRefs(useAllStore())
const { data } = await fetchRestful({ apiPath: '/data/index.json' })
allData.value = data
</script>

<template>
  <div>
    <!-- <LayoutHeader :data="allData?.menu" /> -->
    <n-config-provider :theme="theme">
      <div :class="[theme ? 'bg-[#000]' : 'bg-[#f4f4f4]']" class="mx-auto h-[calc(100vh-45px)] pt-[70px] font-Montserrat">
        <slot />
      </div>
    </n-config-provider>
    <LayoutFooter />
    <div id="modalsField"></div>
    <!-- <Cursor colorful /> -->
  </div>
</template>

<style scoped></style>
