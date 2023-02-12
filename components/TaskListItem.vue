<script lang="ts" setup>
import draggable from "vuedraggable";

const props = defineProps<{
   tasklist?: Tasklist;
   clearOnEnter?: boolean;
   hideMenu?: boolean;
}>();

const emit = defineEmits<{
   (e: "enter", payload: Tasklist): void;
   (e: "ctrlEnter", payload: Tasklist): void;
}>();

const dragOptions = useDragOptions();
const tasksChange = ref(0);

const title = ref(props.tasklist?.title ?? "");
const tasks = ref(props.tasklist?.tasks ?? []);

const currentTasklist = computed<Tasklist>(() => ({
   title: title.value,
   tasks: tasks.value,
}));

function createNewTask(task: Task) {
   if (task.task) tasks.value.push(task);
}
function resetTasklist() {
   title.value = "",
      tasks.value = []
   console.log("reset?")
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

function handleTasksAdd() { }
</script>

<template>
   <m-card>
      <div class="h-full w-full flex items-center gap-2 justify-between">
         <m-drag-handle v-if="!hideMenu" />
         <m-text-input v-model:value="title" placeholder="New tasklist" @enter="handleEnter"
            @ctrl-enter="handleCntrlEnter" />
      </div>
      <task-item class="bg-light-400 dark:bg-dark-500" clear-on-enter hide-menu @enter="createNewTask"
         @ctrl-enter="handleEnter" />
      <draggable v-model:list="tasks" :key="tasksChange" item-key="task" v-bind="dragOptions" @add="handleTasksAdd">
         <template #item="{ element: task }">
            <li>
               <task-item class="bg-light-400 dark:bg-dark-500" :task="task" />
            </li>
         </template>
      </draggable>
   </m-card>
</template>
