export default defineEventHandler(async (event) => {
   console.log("hit")
   const task_id = parseInt(event.context.params?.task_id ?? "");
   console.log(task_id);

   const updatedtask = await readBody(event);

   console.log(updatedtask);

   if (task_id) {
      await prisma.task.update({
         where: { id: task_id },
         data: {
            ...updatedtask.task,
         },
      });
   }

   return {};
});
