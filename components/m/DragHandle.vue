<script lang="ts" setup>
import { DragHandle } from "vue-slicksort"
</script>
<template>
   <DragHandle tag="button"
      class="handle p-0 text-xl sm:text-2xl text-light-600 bg-transparent hover:text-light-700 active:scale-95 transition">
      <IconCSS name="ic:round-drag-indicator" />
   </DragHandle>
</template>