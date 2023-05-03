<script lang="ts" setup>
const props = defineProps<{
   task?: Task;
   placeholder?: string;
   noUpdate?: boolean;
   clearOnEnter?: boolean;
   hideMenu?: boolean;
}>();

const emit = defineEmits<{
   (e: "enter", payload: Task): void;
   (e: "ctrlEnter", payload: Task): void;
}>();

const taskValue = ref(props.task?.task ?? "");
const doneValue = ref(props.task?.done ?? false);

const currentTask = computed(() => ({
   task: taskValue.value,
   done: doneValue.value,
}));

const popover = ref<any | null>(null);

const loading = ref(false);

watchThrottled(
   currentTask,
   async () => {
      if (!props.noUpdate)
         await updateTask({
            taskId: props.task?.id,
            task: currentTask,
         })
   },
   { throttle: 1500 }
);

function resetTask() {
   taskValue.value = "";
   doneValue.value = false;
}
function handleEnter() {
   emit("enter", currentTask.value);

   if (props.clearOnEnter) {
      resetTask();
   }
}
function handleCntrlEnter() {
   emit("ctrlEnter", currentTask.value);
}
async function handleDelete() {
   popover.value.hidePopover();
   loading.value = true;
   await deleteTask(props.task?.id)
   await nextTick();
   loading.value = false;
}
</script>
<template>
   <m-card :class="{ pulsing: loading }">
      <div class="h-full w-full flex items-center gap-2 justify-between">
         <m-popover ref="popover" v-if="!hideMenu">
            <m-drag-handle />
            <template #content>
               <menu-item>
                  Convert to note
                  <template #icon>
                     <IconCSS name="ic:round-sticky-note-2" />
                  </template>
               </menu-item>
               <menu-item>
                  Pin
                  <template #icon>
                     <IconCSS class="text-green-500" name="ic:round-push-pin" />
                  </template>
               </menu-item>
               <menu-item @click="handleDelete">
                  Delete
                  <template #icon>
                     <IconCSS class="text-red-500" name="eva:trash-2-fill" />
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
