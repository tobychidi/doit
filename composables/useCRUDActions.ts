export async function useCreateNewTask(task: Task) {
   if (task.task) {
      const { error } = await useFetch("/api/tasks", { method: "POST", body: task });
      if (!error.value) {
         await refreshNuxtData("tasks");
      }
      useTasksChange().value++;
   }
}
