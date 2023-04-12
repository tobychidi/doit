export default defineEventHandler(async (event) => {
   
   const tasks = await prisma.task.findMany({
      where:{tasklistId: null, done: false}
   })
   const tasklists = await prisma.tasklist.findMany({
      include: {
         tasks: true
      }
   })
   return {
      data: {
         tasks,
         tasklists,
      },
   };
})