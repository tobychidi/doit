<script lang="ts" setup>
import "@fontsource/numans";
import draggable from "vuedraggable";

const tasklist: Tasklist = {
   title: "Tasklist",
   tasks: [{ task: "Eat food", done: false }],
};

const notes = useLocalStorage<Array<Note>>("notes", []);
const tasks = useLocalStorage<Array<Task | Tasklist>>("tasks", []);
const tasksDone = useLocalStorage<Array<Task | Tasklist>>("tasksDone", []);
const notesChange = ref(0)
const tasksChange = ref(0)
const tasksDoneChange = ref(0)
const tasklistMode = ref<Tasklist | null>(null)

const activeTab = ref("tasks")

const dragOptions = useDragOptions()

const swiperOptions = {
   slidesPerView: 1,
   spaceBetween: 20,
   breakpoints: {
      480: {
         slidesPerView: 2
      },
      960: {
         slidesPerView: 3
      },
   }
}

function createNewNote(note: Note) {
   if (note.note) notes.value.push(note);
}
function createNewTask(task: Task) {
   if (task.task) tasks.value.push(task);
}
function createNewTasklist(tasklist: Tasklist) {
   if (tasklist.tasks) tasks.value.push(tasklist);
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
               <note-item clear-on-enter hide-menu @enter="createNewNote" />
               <draggable v-model:list="notes" :key="notesChange" item-key="note" v-bind="dragOptions"
                  @add="handleNotesAdd">
                  <template #item="{ element: note }">
                     <li>
                        <note-item :note="note" :key="note" />
                     </li>
                  </template>
               </draggable>
            </list-board>
         </swiper-slide>

         <swiper-slide>
            <list-board>
               <task-list-item v-if="tasklistMode" :tasklist="tasklistMode" clear-on-enter hide-menu
                  @enter="createNewTasklist" @ctrl-enter="convertToTask" />
               <task-item v-else clear-on-enter hide-menu @enter="createNewTask" @ctrl-enter="convertToTasklist" />
               <draggable v-model:list="tasks" :key="tasksChange" item-key="task" v-bind="dragOptions"
                  @add="handleTasksAdd">
                  <template #item="{ element: task }">
                     <li v-if="task.task || task.tasks">
                        <task-item v-if="task.task" :task="task" />
                        <task-list-item v-if="task.tasks" :tasklist="task" />
                     </li>
                  </template>
               </draggable>
            </list-board>
         </swiper-slide>

         <swiper-slide>
            <list-board>
               <draggable v-model:list="tasksDone" :key="tasksDoneChange" item-key="task" v-bind="dragOptions"
                  @add="handleTasksDoneAdd">
                  <template #item="{ element: task, }">
                     <li>
                        <task-item :task="task" />
                     </li>
                  </template>
               </draggable>
            </list-board>
         </swiper-slide>
      </swiper>
   </main>
   <mobile-nav class="sm:hidden" v-model:active-tab="activeTab" />
</template>