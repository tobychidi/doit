export default defineEventHandler(async (event) => {
   const tasklist_id = parseInt(event.context.params?.tasklist_id ?? "");

   const updatedtasklist = await readBody(event);

   console.log(updatedtasklist);

   if (tasklist_id) {
      await prisma.tasklist.update({
         where: { id: tasklist_id },
         data: {
            ...updatedtasklist.tasklistlist,
         },
      });
   }

   return {};
});
