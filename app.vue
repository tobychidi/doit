<script lang="ts" setup>
import "@fontsource/numans";
import DoitLogo from "~/assets/doit_logo.svg";
import DoitLogoDark from "~/assets/doit_logo_dark.svg";

const isDark = useDark({
   initialValue: "dark",
});
const toggleDark = useToggle(isDark);
</script>

<template>
   <div
      class="w-full h-screen dark:bg-[#00001d] dark:text-white flex flex-col gap-5 items-center justify-center transition"
      :class="{ dark: isDark }">

      <Head>
         <Title>Doit by Navato Labs</Title>
      </Head>
      <a @click="toggleDark()">
         <template v-if="isDark">
            <doit-logo class="h-10" />
         </template>
         <template v-else>
            <doit-logo-dark class="h-10" />
         </template>
      </a>
      <page-loader />
   </div>
</template>

<style>
body {
   font-family: "Numans", sans-serif;
}
</style>
