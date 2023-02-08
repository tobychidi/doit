<script lang="ts" setup>
import { timeline, stagger } from "motion";
onMounted(() => {
   const boxes = document.querySelectorAll("[data-role=box]");
   if (boxes) {
      timeline([
         [boxes, { rotate: 45 }, { delay: stagger(0.2) }],
         [boxes, { rotate: 0 }, { delay: stagger(0.2) }]
      ], {
         repeat: Infinity,
      })
   }
});
</script>

<template>
   <div class="flex">
      <div class="h-5 w-5 bg-blue-400 rounded" data-role="box"></div>
      <div class="h-5 w-5 bg-green-400 rounded" data-role="box"></div>
   </div>
</template>