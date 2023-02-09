<script lang="ts" setup>
const props = defineProps<{
   note: Note
}>()

const noteValue = ref(props.note.note)
</script>
<template>
   <m-card>
      <m-text-area class="text-sm" v-model:value="noteValue" />
   </m-card>
</template>