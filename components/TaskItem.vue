<script lang="ts" setup>
const props = defineProps<{
   task?: Task;
   placeholder?: string;
   clearOnEnter?: boolean;
   hideMenu?: boolean
}>();

const emit = defineEmits<{
   (e: "enter", payload: Task): void;
   (e: "ctrlEnter", payload: Task): void;
}>();

const taskValue = ref(props.task?.task ?? "");
const doneValue = ref(props.task?.done ?? false);

const currentTask = computed(() => ({
   task: taskValue.value,
   done: doneValue.value
}))

function resetTask() {
   taskValue.value = ""
   doneValue.value = false
}
function handleEnter() {
   emit("enter", currentTask.value);

   if (props.clearOnEnter) {
      resetTask()
   }
}
function handleCntrlEnter() {
   emit("ctrlEnter", currentTask.value);
}
</script>
<template>
   <m-card>
      <div class="h-full w-full flex items-center gap-2 justify-between">
         <m-popover v-if="!hideMenu">
            <m-drag-handle />
            <template #content>
               <menu-item>
                  Convert to note
                  <template #icon>
                     <Icon name="ic:round-sticky-note-2" />
                  </template>
               </menu-item>
               <menu-item>
                  Pin
                  <template #icon>
                     <Icon class="text-green-500" name="ic:round-push-pin" />
                  </template>
               </menu-item>
               <menu-item>
                  Delete
                  <template #icon>
                     <Icon class="text-red-500" name="eva:trash-2-fill" />
                  </template>
               </menu-item>
            </template>
         </m-popover>
         <m-text-area v-model:value="taskValue" placeholder="New task" @enter="handleEnter"
            @ctrl-enter="handleCntrlEnter" />
         <m-check-input v-model:value="doneValue" />
      </div>
   </m-card>
</template>
