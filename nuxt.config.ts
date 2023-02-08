// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   modules: ["@nuxtjs/tailwindcss", "nuxt-svgo", "@vueuse/nuxt", "nuxt-icon"],
   tailwindcss:{
      config:{
         darkMode: "class"
      }
   }
});
