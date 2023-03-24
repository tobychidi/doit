<script lang="ts" setup>
import "@fontsource/numans";
</script>

<template>
   <div
      class="w-full h-[100svh] box-border p-7 lg:p-20 text-dark-500 dark:bg-dark-600 dark:text-white flex flex-col gap-8 items-center justify-center transition overflow-hidden">

      <Head>
         <Title>Doit by Navato Labs</Title>
      </Head>
      <header>
         <toggle-logo />
      </header>
      <!-- <page-loader /> -->
      <nuxt-page />
   </div>
</template>

<style>
body {
   font-family: "Numans", sans-serif;
   font-size: 15px;
}

.ghost {
   opacity: 0.4;
}
</style>
