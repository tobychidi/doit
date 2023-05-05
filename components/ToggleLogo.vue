<script lang="ts" setup>
import logo from "~/assets/doit_logo.svg";
import logoDark from "~/assets/doit_logo_dark.svg";

</script>
<template>
   <div>
      <div v-show="$colorMode.preference == 'dark'" @click="$colorMode.preference = 'light'">
         <img :src="logo" class="h-8 sm:h-10" alt="Doit">
      </div>
      <div v-show="$colorMode.preference == 'light'" @click="$colorMode.preference = 'dark'">
         <img :src="logoDark" class="h-8 sm:h-10" alt="Doit">
      </div>
   </div>
</template>