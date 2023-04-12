<script lang="ts" setup>
import "@fontsource/numans";
import { SwiperOptions } from "swiper";
import { Sortable } from "sortablejs-vue3";

const { data: notes } = useAsyncData("notes", () => $fetch("/api/notes", { method: "GET" }), {
   transform: (_notes) => _notes.data,
})
const { data: tasks } = useAsyncData("tasks", () => $fetch("/api/tasks", { method: "GET" }), {
   transform: (_tasks) => [..._tasks.data.tasks, ..._tasks.data.tasklists],
})

const tasksDone = useLocalStorage<Array<Task | Tasklist>>("tasksDone", []);
const notesChange = ref(0)
const tasksChange = useTasksChange()
const tasksDoneChange = ref(0)
const tasklistMode = ref<Tasklist | null>(null)

const activeTab = ref("tasks")

const dragOptions = useDragOptions()

const swiperOptions: SwiperOptions = {
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
   }
}

async function createNewNote(note: Note) {
   if (note.note) {
      const { error } = await useFetch("/api/notes", { method: "POST", body: note })
      if (!error.value) {
         refreshNuxtData("notes")
      }
   }
}

async function createNewTasklist(tasklist: Tasklist) {
   if (tasklist.tasks) {
      const { error } = await useFetch("/api/tasks", { method: "POST", body: tasklist })
      if (!error.value) {
         refreshNuxtData("tasks")
      }
   }
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

function handleNotesAdd(e: any) {
   const newIndex = e.newIndex
   const oldNotes = notes.value
   const movedNote = oldNotes[newIndex] as any
   if (movedNote.task) {
      oldNotes[newIndex] = { note: movedNote.task }
   }
   notes.value = new Array(...oldNotes)
   notesChange.value++
}

function handleTasksAdd(e: any) {
   const newIndex = e.newIndex
   const oldTasks = tasks.value
   const movedTask = oldTasks[newIndex] as any
   if (movedTask.task) {
      oldTasks[newIndex] = { ...movedTask, done: false }
   }
   if (movedTask.note) {
      oldTasks[newIndex] = { task: movedTask.note, done: false }
   }
   tasks.value = new Array(...oldTasks)
   tasksChange.value++
}

function handleTasksDoneAdd(e: any) {
   const newIndex = e.newIndex
   const oldTasks = tasksDone.value
   const movedTask = oldTasks[newIndex] as any
   if (movedTask.task) {
      oldTasks[newIndex] = { ...movedTask, done: true }
   }
   if (movedTask.note) {
      oldTasks[newIndex] = { task: movedTask.note, done: true }
   }
   tasksDone.value = new Array(...oldTasks)
   tasksDoneChange.value++
}

</script>
<template>
   <main class="h-full w-full md:max-w-6xl flex-1 overflow-hidden">
      <swiper v-bind="swiperOptions" class="w-full h-full">
         <swiper-slide>
            <list-board>
               <h3 class="text-xl">Notes</h3>
               <note-item clear-on-enter hide-menu no-update @enter="createNewNote" />
               <Sortable v-if="notes" v-model:list="notes" :key="notesChange" item-key="note" :options="dragOptions"
                  @add="handleNotesAdd">
                  <template #item="{ element: note }">
                     <li class="mb-4">
                        <note-item :note="note" :key="note" />
                     </li>
                  </template>
               </Sortable>
            </list-board>
         </swiper-slide>

         <swiper-slide>
            <list-board>
               <h3 class="text-xl">Tasks</h3>
               <task-list-item v-if="tasklistMode" :tasklist="tasklistMode" clear-on-enter hide-menu
                  @enter="createNewTasklist" @ctrl-enter="convertToTask" />
               <task-item v-else clear-on-enter hide-menu @enter="useCreateNewTask" @ctrl-enter="convertToTasklist" />
               <Sortable v-model:list="tasks" :key="tasksChange" item-key="task" :options="dragOptions"
                  @add="handleTasksAdd">
                  <template #item="{ element: task }">
                     <li class="mb-4" v-if="task.task || task.tasks">
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
               <Sortable v-model:list="tasksDone" :key="tasksDoneChange" item-key="task" :options="dragOptions"
                  @add="handleTasksDoneAdd">
                  <template #item="{ element: task, }">
                     <li class="mb-4">
                        <task-item :task="task" />
                     </li>
                  </template>
               </Sortable>
            </list-board>
         </swiper-slide>
      </swiper>
   </main>
   <mobile-nav class="sm:hidden" v-model:active-tab="activeTab" />
</template>