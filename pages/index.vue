<script lang="ts" setup>
import "@fontsource/numans";
import type { SwiperOptions } from "swiper";
import { SlickList, SlickItem } from "vue-slicksort";
import { useNewTaskMode } from "~/composables/useNewTaskMode";

const { data: notes } = useAsyncData("notes", () =>
   $fetch("/api/notes", { method: "GET" })
);
const { data: tasks } = useAsyncData("tasks", () =>
   $fetch("/api/tasks", {
      method: "GET",
      query: {
         group: "tasks",
      },
   })
);
const { data: tasksDone } = useAsyncData("tasksDone", () =>
   $fetch("/api/tasks", {
      method: "GET",
      query: {
         group: "tasksDone",
      },
   })
);

const sortableNotes = ref<Note[]>([]);

watchImmediate([notes], () => {
   if (notes.value) {
      sortableNotes.value = notes.value.notes as Note[];
   }
});

const sortableTasks = ref<Task[]>([]);

watchImmediate([tasks], () => {
   if (tasks.value) {
      sortableTasks.value = tasks.value.tasks as Task[];
   }
})

const activeTab = ref("tasks");

const { newTaskMode, convertToTask, convertToTasklist } = useNewTaskMode();

const swiperOptions /*: SwiperOptions*/ = {
   noSwiping: true,
   noSwipingSelector: ".handle",
   slidesPerView: 1,
   spaceBetween: 20,
   breakpoints: {
      640: {
         slidesPerView: 2,
      },
      1180: {
         slidesPerView: 3,
      },
   },
};

async function handleNotesSort(e: SlicksortSortEndEvent) {
   const currentNote = notes.value?.notes[e.oldIndex];
   await updateNote({
      noteId: currentNote?.id,
      note: {
         order: e.newIndex,
      },
   });
}

async function handleTasksSort(e: SlicksortSortEndEvent) {
   const currentTask = tasks.value?.tasks[e.oldIndex];
   await updateTask({
      taskId: currentTask?.id,
      task: {
         order: e.newIndex,
         group: currentTask?.group
      }
   })
}
</script>
<template>
   <main class="h-full w-full md:max-w-6xl flex-1 overflow-hidden">
      <ClientOnly>
         <template #fallback> <page-loader />bring </template>
         <swiper v-bind="swiperOptions" class="w-full h-full">
            <swiper-slide>
               <list-board>
                  <h3 class="text-xl">Notes</h3>
                  <note-item clear-on-enter hide-menu no-update @enter="createNewNote" />
                  <SlickList v-if="notes" v-model:list="sortableNotes" group="notes" v-bind="dragOptions"
                     @sort-insert="handleNotesAdd" @sort-end="handleNotesSort">
                     <SlickItem v-for="(note, i) in sortableNotes" :key="note.id" :index="i" class="mb-4">
                        <note-item :note="note" />
                     </SlickItem>
                  </SlickList>
               </list-board>
            </swiper-slide>

            <swiper-slide>
               <list-board>
                  <h3 class="text-xl">Tasks</h3>

                  <task-list-item v-if="newTaskMode" :tasklist="newTaskMode" no-update clear-on-enter hide-menu
                     @enter="createNewTasklist" @ctrl-enter="convertToTask" />

                  <task-item v-else no-update clear-on-enter hide-menu @enter="createNewTask"
                     @ctrl-enter="convertToTasklist" />

                  <SlickList v-if="tasks" v-model:list="sortableTasks" group="tasks" v-bind="dragOptions"
                     @sort-insert="handleTasksAdd" @sort-end="handleTasksSort">
                     <SlickItem v-for="(task, i) in sortableTasks" :key="task.id" :index="i" class="mb-4">
                        <task-item v-if="task.task" :task="task" />
                        <task-list-item v-if="task.tasks" :tasklist="task" />
                     </SlickItem>
                  </SlickList>
               </list-board>
            </swiper-slide>

            <swiper-slide>
               <list-board>
                  <h3 class="text-xl">Done</h3>
                  <SlickList :list="tasksDone?.tasks" group="tasksDone" v-bind="dragOptions"
                     @sort-insert="handleTasksDoneAdd">
                     <SlickItem v-for="(task, i) in tasksDone.tasks" :key="task.id" :index="i" class="mb-4">
                        <task-item v-if="task.task" :task="task" />
                        <task-list-item v-if="task.tasks" :tasklist="task" />
                     </SlickItem>
                  </SlickList>
               </list-board>
            </swiper-slide>
         </swiper>
      </ClientOnly>
   </main>
   <mobile-nav class="sm:hidden" v-model:active-tab="activeTab" />
</template>
