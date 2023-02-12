<script lang="ts" setup>
const props = withDefaults(defineProps<{
   type?: "primary" | "default" | "none"| string;
}>(), {
   type: "default"
})
</script>
<template>
   <button class="p-1 sm:p-2 px-2 sm:px-4 shadow rounded-lg active:scale-95 transition flex items-center justify-between border border-dark-900 dark:border-light-900 border-opacity-5"
      :class="{ 
         'bg-green-700 hover:bg-green-800 text-white': type == 'primary',
         'bg-light-500 hover:bg-light-600 dark:bg-dark-500 dark:hover:bg-dark-700': type == 'default',
      }">
      <slot />
   </button>
</template>