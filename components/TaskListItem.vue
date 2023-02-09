<script lang="ts" setup>
const props = defineProps<{
   taskList: TaskList
}>()
const title = ref(props.taskList.title)
</script>

<template>
   <m-card>
      <div class="h-full w-full flex items-center gap-2 justify-between">
         <m-drag-handle />
         <m-text-input v-model:value="title" />
      </div>
      <template v-for="task in taskList.tasks">
         <task-item class="bg-light-500 dark:bg-dark-500" :task="task" />
      </template>
   </m-card>
</template>