import Note_idDelete from "../notes/[note_id].delete";

export default defineEventHandler(async (event) => {
   const task_id = parseInt(event.context.params?.task_id ?? "");

   const updatedTask: Task = await readBody(event);

   if (task_id) {
      console.log(updatedTask);

      const res = await prisma.$transaction(async (tx) => {
         const currentTask = await tx.task.findUnique({
            where: {
               id: task_id,
            },
         });

         let updatedOrder = updatedTask.order ?? 0;
         const currentOrder = currentTask?.order ?? 0;

         const updatedGroup = updatedTask.done ? "tasksDone" : "tasks";
         const currentGroup = currentTask?.group;

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

   sendError(event, createError({ statusCode: 404, statusMessage: "Task not found" }));
});
