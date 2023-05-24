export default defineEventHandler(async (event) => {
   const task_id = parseInt(event.context.params?.task_id ?? "");

   const updatedTask: Task = await readBody(event);

   if (task_id) {
      console.log("updated task", updatedTask);

      const res = await prisma.$transaction(async (tx) => {
         const currentTask = await tx.task.findUnique({
            where: {
               id: task_id,
            },
         });

         console.log("currentTask: ", currentTask);

         let updatedOrder = updatedTask.order ?? 0;
         const currentOrder = currentTask?.order ?? 0;

         const updatedGroup =
            updatedTask.done !== undefined
               ? updatedTask.done
                  ? "tasksDone"
                  : "tasks"
               : updatedTask.group;
         const currentGroup = currentTask?.group;

         console.log("updatedGroup: " + updatedGroup);

         if (updatedGroup !== currentGroup) {
            updatedOrder = 0;

            //This sestion increments other tasks in new group
            await tx.task.updateMany({
               where: {
                  tasklistId: null,
                  group: updatedGroup,
                  order: { gte: updatedOrder },
               },
               data: {
                  order: { increment: 1 },
               },
            });
            await tx.tasklist.updateMany({
               where: {
                  group: updatedGroup,
                  order: { gte: updatedOrder },
               },
               data: {
                  order: { increment: 1 },
               },
            });

            //Decrement order of tasks in old group
            await tx.task.updateMany({
               where: {
                  tasklistId: null,
                  group: currentGroup,
                  order: { gte: updatedOrder },
               },
               data: {
                  order: { decrement: 1 },
               },
            });
            await tx.tasklist.updateMany({
               where: {
                  group: currentGroup,
                  order: { gte: updatedOrder },
               },
               data: {
                  order: { decrement: 1 },
               },
            });
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

         return await tx.task.update({
            where: { id: task_id },
            data: {
               ...updatedTask,
               order: updatedOrder,
               group: updatedGroup,
            },
         });
      });
      return res;
   }

   SendTaskNotFound(event);
});
