// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   experimental: {
      watcher: "parcel",
   },
   modules: [
      ,
      "@unocss/nuxt",
      "@vueuse/nuxt",
      "nuxt-icon",
      "nuxt-swiper",
      "@nuxt/devtools",
      "@nuxt/image-edge",
      "@nuxtjs/color-mode",
   ],
   colorMode: {
      classSuffix: "",
   },
});
