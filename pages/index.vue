<script lang="ts" setup>
import "@fontsource/numans";
import type { SwiperOptions } from "swiper";
import { SlickList, SlickItem } from 'vue-slicksort';

const { data: notes } = useAsyncData("notes", () => $fetch("/api/notes", { method: "GET" }))
const { data: allTasks } = useAsyncData("tasks", () => $fetch("/api/tasks", { method: "GET" }))

const tasks = computed(() => {
   if (allTasks.value) {
      return [...allTasks.value.tasks.filter(task => !task.done), ...allTasks.value.tasklists.filter(tasklist => !tasklist.done)]
   }
})

const tasksDone = computed(() => {
   if (allTasks.value) {
      return [...allTasks.value.tasks.filter(task => task.done), ...allTasks.value.tasklists.filter(tasklist => tasklist.done)]
   }
})

const tasklistMode = ref<Tasklist | null>(null)

const activeTab = ref("tasks")

const swiperOptions/*: SwiperOptions*/ = {
   noSwiping: true,
   noSwipingSelector: ".handle",
   slidesPerView: 1,
   spaceBetween: 20,
   breakpoints: {
      640: {
         slidesPerView: 2
      },
      1180: {
         slidesPerView: 3
      },
   },
}

function convertToTask(tasklist: Tasklist) {
   tasklistMode.value = null
}

function convertToTasklist(task: Task) {
   tasklistMode.value = {
      title: "",
      tasks: task.task ? [task] : []
   }
}

async function handleNotesAdd(e: SlicksortInsertEvent) {
   const dataItem = e.value
   console.log("dataItem", dataItem)
   if (dataItem.task) {
      const newNote = await createNewNote({
         note: dataItem.task
      })
      await deleteTask(dataItem.id)
   }
   if (dataItem.title) {
      const combinedFromTasklist = []
      combinedFromTasklist.push(dataItem.title)
      if (dataItem.tasks) {
         dataItem.tasks.forEach((task: Task) => combinedFromTasklist.push(task.task))
      }
      const newNote = await createNewNote({
         note: combinedFromTasklist.join("-")
      })
      await deleteTasklist(dataItem.id)
   }
}

async function handleTasksAdd(e: SlicksortInsertEvent) {
   const dataItem = e.value
   if (dataItem.note) {
      await createNewTask({
         task: dataItem.note,
         done: false
      })
      await deleteNote(dataItem.id)
   }
   if (dataItem.task) {
      await updateTask({
         taskId: dataItem.id,
         task: { done: false, tasklistId: null },
      })
   }
   if (dataItem.title) {
      await updateTasklist({
         tasklistId: dataItem.id,
         tasklist: { done: false }
      })
   }
}

async function handleTasksDoneAdd(e: SlicksortInsertEvent) {
   const dataItem = e.value
   if (dataItem.note) {
      await createNewTask({
         task: dataItem.note,
         done: true
      })
      await deleteNote(dataItem.id)
   }
   if (dataItem.task) {
      await updateTask({
         taskId: dataItem.id,
         task: { done: true, tasklistId: null }
      })
   }
   if (dataItem.title) {
      await updateTasklist({
         tasklistId: dataItem.id,
         tasklist: { done: true }
      })
   }
}

</script>
<template>
   <main class="h-full w-full md:max-w-6xl flex-1 overflow-hidden">
      <ClientOnly>
         <template #fallback>
            <page-loader />bring 
         </template>
         <swiper v-bind="swiperOptions" class="w-full h-full">
            <swiper-slide>
               <list-board>
                  <h3 class="text-xl">Notes</h3>
                  <note-item clear-on-enter hide-menu no-update @enter="createNewNote" />
                  <SlickList v-if="notes" :list="notes.notes" group="notes" v-bind="dragOptions"
                     @sort-insert="handleNotesAdd">
                     <SlickItem v-for="(note, i) in notes.notes" :key="note" :index="i" class="mb-4">
                        <note-item :note="note" />
                     </SlickItem>
                  </SlickList>
               </list-board>
            </swiper-slide>

            <swiper-slide>
               <list-board>
                  <h3 class="text-xl">Tasks</h3>

                  <task-list-item v-if="tasklistMode" :tasklist="tasklistMode" no-update clear-on-enter hide-menu
                     @enter="createNewTasklist" @ctrl-enter="convertToTask" />

                  <task-item v-else no-update clear-on-enter hide-menu @enter="createNewTask"
                     @ctrl-enter="convertToTasklist" />

                  <SlickList v-if="tasks" :list="tasks" group="tasks" v-bind="dragOptions" @sort-insert="handleTasksAdd">
                     <SlickItem v-for="(task, i) in tasks" :key="task" :index="i" class="mb-4">
                        <task-item v-if="task.task" :task="task" />
                        <task-list-item v-if="task.tasks" :tasklist="task" />
                     </SlickItem>
                  </SlickList>
               </list-board>
            </swiper-slide>

            <swiper-slide>
               <list-board>
                  <h3 class="text-xl">Done</h3>
                  <SlickList :list="tasksDone" group="tasksDone" v-bind="dragOptions" @sort-insert="handleTasksDoneAdd">
                     <SlickItem v-for="(task, i) in tasksDone" :key="task" :index="i" class="mb-4">
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