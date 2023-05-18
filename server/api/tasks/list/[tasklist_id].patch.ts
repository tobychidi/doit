export default defineEventHandler(async (event) => {
   const tasklist_id = parseInt(event.context.params?.tasklist_id ?? "");

   const updatedTasklist: Omit<Tasklist, "tasks"> = await readBody(event);

   console.log("updated task list", updatedTasklist);

   if (tasklist_id) {
      const res = await prisma.$transaction(async (tx) => {
         const currrentTasklist = await tx.tasklist.findUnique({
            where: {
               id: tasklist_id,
            },
         });

         let updatedOrder = updatedTasklist.order ?? 0;
         const currentOrder = currrentTasklist?.order ?? 0;

         const updatedGroup = updatedTasklist.done ? "tasksDone" : "tasks";
         const currentGroup = currrentTasklist?.group;

         if (updatedGroup !== currentGroup) {
            updatedOrder = 0;
         }

         if (currentOrder !== updatedOrder) {
            if (updatedOrder > currentOrder) {
               await tx.task.updateMany({
                  where: {
                     tasklistId: null,
                     group: updatedGroup,
                     order: { lte: updatedOrder, gt: currentOrder },
                  },
                  data: {
                     order: { decrement: 1 },
                  },
               });
               await tx.tasklist.updateMany({
                  where: {
                     group: updatedGroup,
                     order: { lte: updatedOrder, gt: currentOrder },
                  },
                  data: {
                     order: { decrement: 1 },
                  },
               });
            } else {
               await tx.task.updateMany({
                  where: {
                     tasklistId: null,
                     group: updatedGroup,
                     order: { gte: updatedOrder, lt: currentOrder },
                  },
                  data: {
                     order: { increment: 1 },
                  },
               });
               await tx.tasklist.updateMany({
                  where: {
                     group: updatedGroup,
                     order: { gte: updatedOrder, lt: currentOrder },
                  },
                  data: {
                     order: { increment: 1 },
                  },
               });
            }
         }

         return await tx.tasklist.update({
            where: { id: tasklist_id },
            data: {
               ...updatedTasklist,
               order: updatedOrder,
               group: updatedGroup,
            },
         });
      });
      return res;
   }

   return {};
});
