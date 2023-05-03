<script lang="ts" setup>
import logo from "~/assets/doit_logo.svg";
import logoDark from "~/assets/doit_logo_dark.svg";

</script>
<template>
   <div>
      <button v-show="$colorMode.preference == 'dark'" @click="$colorMode.preference = 'light'">
         <span>
            <img :src="logo" class="h-8 sm:h-10" alt="Doit">
         </span>
      </button>
      <button v-show="$colorMode.preference == 'light'" @click="$colorMode.preference = 'dark'">
         <span>
            <img :src="logoDark" class="h-8 sm:h-10" alt="Doit">
         </span>
      </button>
   </div>
</template>