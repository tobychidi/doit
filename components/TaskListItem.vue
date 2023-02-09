<script lang="ts" setup>
const props = defineProps<{
   taskList: TaskList
}>()
const title = ref(props.taskList.title)
</script>

<template>
   <m-card >
      <m-text-input v-model:value="title" />
      <template v-for="task in taskList.tasks">
         <task-item class="bg-light-500 dark:bg-dark-500" :task="task" />
      </template>
   </m-card>
</template>