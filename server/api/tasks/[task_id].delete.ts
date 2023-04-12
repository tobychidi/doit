export default defineEventHandler(async (event) => {
   const task_id = parseInt(event.context.params?.task_id ?? "");

   if (task_id) {
      const task = await prisma.task.delete({
         where: { id: task_id },
      });
      console.log("deleted", task);
   }
   return {};
});
