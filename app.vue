<script lang="ts" setup>
import "@fontsource/numans";

const task = {
   task: "Do the laundry",
   done: true
}
</script>

<template>
   <div
      class="w-full h-screen p-12 text-dark-500 bg-light-200 dark:bg-dark-500 dark:text-white flex flex-col gap-10 items-center justify-center transition">

      <Head>
         <Title>Doit by Navato Labs</Title>
      </Head>
      <header>
         <toggle-logo />
      </header>
      <!-- <page-loader /> -->
      <main class="w-full flex-1 max-w-6xl flex justify-between gap-12">
         <list-board>
            <task-item :task="task" />
         </list-board>
         <list-board>
            <task-item :task="task" />
            <task-item :task="task" />
            <task-item :task="task" />
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
