export default defineEventHandler(async (event) => {
   const tasklist_id = parseInt(event.context.params?.tasklist_id ?? "");

   if (tasklist_id) {
      const tasklist = await prisma.tasklist.delete({
         where: { id: tasklist_id },
      });
      console.log("deleted", tasklist);
   }
   return {};
});
