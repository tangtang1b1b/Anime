<script setup>
const { t } = useI18n()
const dot = ref('')
const dotAnimation = ref(null)

</script>
<template>
  <div class="container relative flex h-screen w-full items-center justify-center text-4xl font-bold">
    <NuxtLinkLocale to="/demo" class="relative flex">
      {{ t('template') }}
    </NuxtLinkLocale>
  </div>
</template>

<style scoped></style>
