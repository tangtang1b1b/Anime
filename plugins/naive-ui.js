import { defineNuxtPlugin } from '#app';
import { useSSRContext } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) {
    const ssrContext = useSSRContext();
    const { collect } = require('@css-render/vue3-ssr').setup(nuxtApp.vueApp);
    ssrContext?.head.hooks.hook('tags:resolve', (ctx) => {
      const lastMetaIndex = ctx.tags.map((x) => x.tag).lastIndexOf('meta');
      const styleTags = collect()
        .split('</style>')
        .filter(Boolean)
        .map((x) => {
          const id = x.match(/cssr-id="(.+?)"/)?.[1];
          const style = (x.match(/>(.*)/s)?.[1] || '').trim();
          return {
            tag: 'style',
            props: { 'cssr-id': id },
            innerHTML: style,
          };
        });
      ctx.tags.splice(lastMetaIndex + 1, 0, ...styleTags);
    });
  }
});