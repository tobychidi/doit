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

const { height } = useWindowSize({ initialHeight: 300 })
const swipeTarget = ref(null)

const activeTab = ref("tasks")

const dragOptions = useDragOptions()

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
   <ClientOnly>
      <div
         class="w-full box-border p-10 lg:p-20 text-dark-500 dark:bg-dark-600 dark:text-white flex flex-col gap-8 items-center justify-center transition overflow-hidden"
         :style="{ height: height + 'px' }">

         <Head>
            <Title>Doit by Navato Labs</Title>
         </Head>
         <header>
            <toggle-logo />
         </header>
         <!-- <page-loader /> -->
         <main ref="swipeTarget" class="h-full w-full md:max-w-6xl flex-1 overflow-hidden">
            <div class="w-full h-full flex justify-between md:gap-8 lg:gap-12 transition sm:transform-none"
               :class="{ 'translate-x-[-100%]': activeTab == 'tasks', 'translate-x-[-200%]': activeTab == 'tasksDone' }">
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
            </div>
         </main>
         <footer class="w-full">
            <mobile-nav class="sm:hidden" v-model:active-tab="activeTab" />
         </footer>
      </div>
   </ClientOnly>
</template>

<style>
body {
   font-family: "Numans", sans-serif;
   font-size: 15px;
}

.ghost {
   opacity: 0.4;
}
</style>
