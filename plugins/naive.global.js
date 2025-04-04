import * as naive from 'naive-ui';

export default defineNuxtPlugin((nuxtApp) => {
  const vueApp = nuxtApp.vueApp;
  Object.keys(naive).forEach((key) => {
    if (/^[A-Z]/.test(key)) {
      vueApp.component(key, naive[key]);
    }
  });
});