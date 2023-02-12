<script lang="ts" setup>
import logo from "~/assets/doit_logo.svg";
import logoDark from "~/assets/doit_logo_dark.svg";

const isDark = useDark({
   initialValue: "dark",
});
const toggleDark = useToggle(isDark);
</script>
<template>
   <button @click="toggleDark()">
      <span v-show="isDark">
         <img :src="logo" class="h-8 sm:h-10" alt="Doit">
      </span>
      <span v-show="!isDark">
         <img :src="logoDark" class="h-8 sm:h-10" alt="Doit">
      </span>
   </button>
</template>