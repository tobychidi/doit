export default defineEventHandler(async (event) => {
   const task_id = parseInt(event.context.params?.task_id ?? "");

   if (task_id) {
      const res = await prisma.$transaction(async (tx) => {
         const task = await prisma.task.delete({
            where: { id: task_id },
         });

         const deletedOrder = task.order ?? 0;
         const deletedGroup = task.group;

         await tx.task.updateMany({
            where: {
               tasklistId: null,
               group: deletedGroup,
               order: {
                  gte: deletedOrder,
               },
            },
            data: {
               order: { decrement: 1 },
            },
         });

         await tx.tasklist.updateMany({
            where: {
               group: deletedGroup,
               order: {
                  gte: deletedOrder,
               },
            },
            data: {
               order: { decrement: 1 },
            },
         });
      });

      console.log("deleted", res);
      return res;
   }
   return {};
});
