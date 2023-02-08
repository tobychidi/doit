<script lang="ts" setup>
const props = defineProps<{
   task: Task
}>()

const taskValue = ref(props.task.task)
const doneValue = ref(props.task.done)
</script>
<template>
   <m-card>
      <div class="h-full w-full flex items-center gap-2 justify-between">
         <m-text-input v-model:value="taskValue" />
         <m-check-input v-model:value="doneValue" />
      </div>
   </m-card>
</template>