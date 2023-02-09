<script lang="ts" setup>
import "@fontsource/numans";
import draggable from "vuedraggable";

const taskList: TaskList = {
   title: "Tasklist",
   tasks: [{ task: "Eat food", done: false }]
}

const notes = useLocalStorage<Array<Note>>("notes", [])
const tasks = useLocalStorage<Array<Task|TaskList>>("tasks", [])
const tasksDone = useLocalStorage<Array<Task|TaskList>>("tasksDone", [])

function createNewNote(note: Note) {
   notes.value.push(note)
}
function createNewTask(task: Task) {
   tasks.value.push(task)
}
</script>

<template>
   <div
      class="w-full h-screen box-border p-20 text-dark-500 bg-light-200 dark:bg-dark-600 dark:text-white flex flex-col gap-8 items-center justify-center transition overflow-hidden">

      <Head>
         <Title>Doit by Navato Labs</Title>
      </Head>
      <header>
         <toggle-logo />
      </header>
      <!-- <page-loader /> -->
      <main class="w-full h-full flex-1 max-w-6xl flex justify-between gap-12">
         <list-board>
            <note-item placeholder="New note" clear-on-enter hide-menu @enter="createNewNote" />
            <draggable class="flex flex-col flex-1 gap-4" group="items" handle=".handle" v-model:list="notes" item-key="task">
               <template #item="{ element: note }">
                  <note-item :note="note" />
               </template>
            </draggable>
         </list-board>

         <list-board>
            <task-item placeholder="New task" clear-on-enter hide-menu @enter="createNewTask" />
            <draggable class="flex flex-col flex-1 gap-4" group="items" handle=".handle" v-model:list="tasks" item-key="task">
               <template #item="{ element: task }">
                  <task-item :task="task" placeholder="New task" />
               </template>
            </draggable>
         </list-board>

         <list-board>
            <draggable class="flex flex-col flex-1 gap-4" group="items" handle=".handle" v-model:list="tasksDone" item-key="task">
               <template #item="{ element: task }">
                  <task-item :task="task" placeholder="New task" />
               </template>
            </draggable>
         </list-board>
      </main>
   </div>
</template>

<style>
body {
   font-family: "Numans", sans-serif;
}
</style>
