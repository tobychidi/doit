export default defineEventHandler(async (event) => {
   const task_id = parseInt(event.context.params?.task_id ?? "");

   const updatedtask:{task: Task} = await readBody(event);
   
   if (task_id) {
      console.log(updatedtask);
      await prisma.task.update({
         where: { id: task_id },
         data: {
            ...updatedtask.task,
            group: updatedtask.task.done ? "tasksDone" : "tasks"
         },
      });
   }

   return {};
});
