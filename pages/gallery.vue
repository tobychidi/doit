<script lang="ts" setup>
   
</script>
<template>
   <div>
      <h2 class="text-xl">Gallery</h2>
      <div class="flex">
         <nuxt-img src="/pics/pexels02.jpg" alt="Discover Nuxt 3" class="h-60 w-60 rounded-full object-cover" />
         <nuxt-img src="/pics/pexels01.jpg" alt="Discover Nuxt 3" class="h-80 w-80 rounded-full object-cover" />
         <nuxt-img src="/pics/pexels03.jpg" alt="Discover Nuxt 3" class="h-60 w-60 rounded-full object-cover" />
         <nuxt-img src="/pics/pexels04.jpg" :modifiers="{ grayscale: true, tint: '#00DC82' }" alt="Discover Nuxt 3" class="h-60 w-60 rounded-full object-cover" />
      </div>
   </div>
</template>

<style lang="scss" scoped>

</style>