export default defineEventHandler(async (event) => {
   const tasks = await prisma.task.findMany({
      where: { tasklistId: null },
   });
   const tasklists = await prisma.tasklist.findMany({
      include: {
         tasks: true,
      },
   });

   return {
      tasks,
      tasklists,
      timestamp: new Date(),
   };
});
