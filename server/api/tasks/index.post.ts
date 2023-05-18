import { Prisma } from "@prisma/client";

export default defineEventHandler(async (event) => {
   const task = await readBody(event);
   const group = task.done ? "tasksDone" : "tasks";

   if (task.task || task.title) {
      const res = await prisma.$transaction(async (tx) => {
         
         await tx.task.updateMany({
            where: {
               tasklistId: null,
               group: group,
               order: {
                  gte: task.order ?? 0,
               },
            },
            data: {
               order: { increment: 1 },
            },
         });

         await tx.tasklist.updateMany({
            where: {
               group: group,
               order: {
                  gte: task.order ?? 0,
               },
            },
            data: {
               order: { increment: 1 },
            },
         });

         if (task.task) {
            const newTask = await tx.task.create({
               data: task,
            });
            return newTask;
         }

         if (task.title) {
            const newTasklist = await tx.tasklist.create({
               data: {
                  title: task.title,
                  tasks: {
                     create: task.tasks,
                  },
               },
            });
            return newTasklist;
         }
      },{
         isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted
      });

      return {
         ...res,
      };
   }

   sendError(event, createError({ statusCode: 404, statusMessage: "Invalid payload" }));
});
