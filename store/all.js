import { defineStore } from 'pinia'

export const useAllStore = defineStore('all', () =>{
  const windowWidth = ref(0)
  const allData = ref({})
  const isScroll = ref(false)
  const theme = ref(null)

  return {
    windowWidth,
    allData,
    isScroll,
    theme
  }
})