export function useNewTaskMode() {
   const newTaskMode = ref<Tasklist | null>(null);

   function convertToTask(tasklist: Tasklist) {
      newTaskMode.value = null;
   }

   function convertToTasklist(task: Task) {
      newTaskMode.value = {
         title: "",
         tasks: task.task ? [task] : [],
      };
   }

   return { newTaskMode, convertToTask, convertToTasklist };
}
