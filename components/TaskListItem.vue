<script lang="ts" setup>
import { Sortable } from "sortablejs-vue3";

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

const dragOptions = useDragOptions();
const tasksChange = ref(0);

const title = ref(props.tasklist?.title ?? "");
const tasks = ref(props.tasklist?.tasks ?? []);

const currentTasklist = computed<Tasklist>(() => ({
   title: title.value,
   tasks: tasks.value,
}));

const popover = ref<any | null>(null)

const loading = ref(false)

watchThrottled(currentTasklist, async () => {
   if (!props.noUpdate) await useFetch(`/api/tasks/list/${props.tasklist?.id}`, { method: "PATCH", body: { title: title.value } })
}, { throttle: 1500 })

function createNewTask(task: Task) {
   if (task.task) {
      if (props.tasklist && props.tasklist.id) useCreateNewTask({ ...task, tasklistId: props.tasklist.id })
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

function handleTasksAdd() { }

async function handleDelete() {
   popover.value.hidePopover()
   loading.value = true
   const { error } = await useFetch(`/api/tasks/list/${props.tasklist?.id}`, { method: "delete" })
   if (!error.value) {
      await refreshNuxtData("tasks")
   }
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
                     <Icon name="ic:round-sticky-note-2" />
                  </template>
               </menu-item>
               <menu-item>
                  Pin
                  <template #icon>
                     <Icon class="text-green-500" name="ic:round-push-pin" />
                  </template>
               </menu-item>
               <menu-item @click="handleDelete">
                  Delete
                  <template #icon>
                     <Icon class="text-red-500" name="eva:trash-2-fill" />
                  </template>
               </menu-item>
            </template>
         </m-popover>
         <m-text-input v-model:value="title" placeholder="New tasklist" @enter="handleEnter"
            @ctrl-enter="handleCntrlEnter" />
      </div>
      <task-item class="bg-light-400 dark:bg-dark-500" clear-on-enter hide-menu @enter="createNewTask"
         @ctrl-enter="handleEnter" />
      <Sortable v-model:list="tasks" :key="tasksChange" item-key="task" :options="dragOptions" @add="handleTasksAdd">
         <template #item="{ element: task }">
            <li class="mb-4">
               <task-item class="bg-light-400 dark:bg-dark-500" :task="task" />
            </li>
         </template>
      </Sortable>
   </m-card>
</template>
