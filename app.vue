<script lang="ts" setup>
import "@fontsource/numans";

const note = {
   note: "We will do Blinded by your grace this week"
}

const task = {
   task: "Do the laundry",
   done: true
}

const taskList: TaskList = {
   title: "Tasklist",
   tasks: [{ ...task, done: false }, task]
}
</script>

<template>
   <div
      class="w-full h-screen p-12 text-dark-500 bg-light-200 dark:bg-dark-600 dark:text-white flex flex-col gap-10 items-center justify-center transition">

      <Head>
         <Title>Doit by Navato Labs</Title>
      </Head>
      <header>
         <toggle-logo />
      </header>
      <!-- <page-loader /> -->
      <main class="w-full flex-1 max-w-6xl flex justify-between gap-12">
         <list-board>
            <note-item :note="note" />
         </list-board>

         <list-board>
            <task-item :task="task" />
            <task-item :task="task" />
            <task-list-item :task-list="taskList" />
         </list-board>

         <list-board>
            <task-item :task="task" />
         </list-board>
      </main>
   </div>
</template>

<style>
body {
   font-family: "Numans", sans-serif;
}
</style>
