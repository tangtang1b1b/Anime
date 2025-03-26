<script setup>
import { useAllStore } from '@/store/all';
const { allData } = toRefs(useAllStore())
const { data } = await fetchRestful({ apiPath: '/data/index.json' })
allData.value = data
</script>

<template>
  <div>
    <LayoutHeader :data="allData?.menu" />
    <main class="mx-auto bg-black min-h-screen pt-[70px] font-Montserrat">
      <slot />
    </main>
    <LayoutFooter />
    <div id="modalsField"></div>
    <!-- <Cursor colorful /> -->
  </div>
</template>

<style scoped></style>
