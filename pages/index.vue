<script lang="ts" setup>
import "@fontsource/numans";
import type { SwiperOptions } from "swiper";
import { Sortable } from "sortablejs-vue3";

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

const dragOptions = useDragOptions()

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

async function handleNotesAdd(e: any) {
   const dataItem = sortableEventItemDataValue(e)
   if (dataItem.task) {
      await createNewNote({
         note: dataItem.task
      })
      await deleteTask(dataItem.id)
   }
   if(dataItem.title){
      const combinedFromTasklist = []
      combinedFromTasklist.push(dataItem.title)
      if(dataItem.tasks){
         dataItem.tasks.forEach((task:Task) => combinedFromTasklist.push(task.task))
      }
      await createNewNote({
         note: combinedFromTasklist.join("-")
      })
      await deleteTasklist(dataItem.id)
   }
}

async function handleTasksAdd(e: any) {
   const dataItem = sortableEventItemDataValue(e)
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

async function handleTasksDoneAdd(e: any) {
   const dataItem = sortableEventItemDataValue(e)
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
      <swiper v-bind="swiperOptions" class="w-full h-full">
         <swiper-slide>
            <list-board>
               <h3 class="text-xl">Notes</h3>
               <note-item clear-on-enter hide-menu no-update @enter="createNewNote" />
               <Sortable v-if="notes" v-model:list="notes.notes" :key="notes.timestamp" item-key="note"
                  :options="dragOptions" @add="handleNotesAdd">
                  <template #item="{ element: note }">
                     <li class="mb-4" :data-value="JSON.stringify(note)">
                        <note-item :note="note" :key="note" />
                     </li>
                  </template>
               </Sortable>
            </list-board>
         </swiper-slide>

         <swiper-slide>
            <list-board>
               <h3 class="text-xl">Tasks</h3>

               <task-list-item v-if="tasklistMode" :tasklist="tasklistMode" no-update clear-on-enter hide-menu
                  @enter="createNewTasklist" @ctrl-enter="convertToTask" />

               <task-item v-else no-update clear-on-enter hide-menu @enter="createNewTask"
                  @ctrl-enter="convertToTasklist" />

               <Sortable :list="tasks" :key="allTasks?.timestamp" item-key="task" :options="dragOptions"
                  @add="handleTasksAdd">
                  <template #item="{ element: task }">
                     <li class="mb-4" v-if="task.task || task.tasks" :data-value="JSON.stringify(task)">
                        <task-item v-if="task.task" :task="task" />
                        <task-list-item v-if="task.tasks" :tasklist="task" />
                     </li>
                  </template>
               </Sortable>
            </list-board>
         </swiper-slide>

         <swiper-slide>
            <list-board>
               <h3 class="text-xl">Done</h3>
               <Sortable :list="tasksDone" :key="allTasks?.timestamp" item-key="task" :options="dragOptions"
                  @add="handleTasksDoneAdd">
                  <template #item="{ element: task, }">
                     <li class="mb-4" :data-value="JSON.stringify(task)">
                        <task-item v-if="task.task" :task="task" />
                        <task-list-item v-if="task.tasks" :tasklist="task" />
                     </li>
                  </template>
               </Sortable>
            </list-board>
         </swiper-slide>
      </swiper>
   </main>
   <mobile-nav class="sm:hidden" v-model:active-tab="activeTab" />
</template>