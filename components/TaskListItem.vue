<script lang="ts" setup>
import { SlickList, SlickItem } from 'vue-slicksort';

const props = defineProps<{
   tasklist?: Tasklist;
   clearOnEnter?: boolean;
   noUpdate?: boolean;
   hideMenu?: boolean;
}>();

const emit = defineEmits<{
   (e: "enter", payload: Tasklist): void;
   (e: "ctrlEnter", payload: Tasklist): void;
}>();

const title = ref(props.tasklist?.title ?? "");
const tasks = ref(props.tasklist?.tasks ?? []);

const currentTasklist = computed<Tasklist>(() => ({
   title: title.value,
   tasks: tasks.value,
}));

const popover = ref<any | null>(null)

const loading = ref(false)

watchThrottled(currentTasklist, async () => {
   if (!props.noUpdate) await updateTasklist({
      tasklistId: props.tasklist?.id,
      tasklist: { title: title.value }
   })
}, { throttle: 1500 })

function createNewTaskInList(task: Task) {
   if (task.task) {
      if (props.tasklist && props.tasklist.id) {
         createNewTask({ ...task, tasklistId: props.tasklist.id })
         return
      }
      tasks.value.push(task);
   }
}
function resetTasklist() {
   title.value = "",
      tasks.value = []
}
function handleEnter() {
   emit("enter", currentTasklist.value);

   if (props.clearOnEnter) {
      resetTasklist();
   }
}

function handleCntrlEnter() {
   emit("ctrlEnter", currentTasklist.value);
}

async function handleTasksAdd(e: SlicksortInsertEvent) {
   const dataItem = e.value
   if (dataItem.note) {
      await createNewTask({
         task: dataItem.note,
         done: false,
         tasklistId: props.tasklist?.id
      })
      await deleteNote(dataItem.id)
   }
   if (dataItem.task) {
      await updateTask({
         taskId: dataItem.id,
         task: { ...dataItem, tasklistId: props.tasklist?.id }
      })
   }
}

async function handleDelete() {
   popover.value.hidePopover()
   loading.value = true
   await deleteTasklist(props.tasklist?.id)
   await nextTick()
   loading.value = false
}
</script>

<template>
   <m-card :class="{ 'pulsing': loading }">
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

         <m-text-input v-model:value="title" placeholder="New tasklist" @enter="handleEnter"
            @ctrl-enter="handleCntrlEnter" />
      </div>
      <task-item class="bg-light-400 dark:bg-dark-500" clear-on-enter hide-menu @enter="createNewTaskInList"
         @ctrl-enter="handleEnter" />
      <SlickList v-if="tasks" :list="tasks" group="tasklistTasks" @sort-insert="handleTasksAdd">
         <SlickItem v-for="(task, i) in tasks" :key="task" :index="i" class="mb-4">
            <task-item class="bg-light-400 dark:bg-dark-500" :task="task" />
         </SlickItem>
      </SlickList>
   </m-card>
</template>
