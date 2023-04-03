export default defineEventHandler(async (event) => {
   const task = await readBody(event)
   const newTask = await prisma.task.create({
      data: task
   })
   return {
      ...newTask
   }
})