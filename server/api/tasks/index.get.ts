export default defineEventHandler(async (event) => {
   
   const tasks = await prisma.task.findMany()
   const tasklists = await prisma.tasklist.findMany()
   console.log("Tasks Sent")
   return {
      data: {
         tasks,
         tasklists,
      },
   };
})