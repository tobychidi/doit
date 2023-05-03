export default defineEventHandler(async (event) => {
   const task = await readBody(event)
   console.log(task.title)
   if(task.task){
      const newTask = await prisma.task.create({
         data: task,
      });
      return {
         ...newTask,
      };
   }
   if(task.title){
      console.log("tasklist++++++", task);
      const newTasklist = await prisma.tasklist.create({
         data: {
            title: task.title
         }
      });

      if(task.tasks){
         const parsedTasks = Array.from(task.tasks, (taskItem: Task) => ({
            ...taskItem,
            tasklistId: newTasklist.id
         }));
         console.log(parsedTasks);
         const newTasks = await prisma.task.createMany({
            data: parsedTasks,
         });
      }
      return {
         ...newTasklist,
      };
   }
   sendError(event, createError({statusCode: 404, statusMessage: "Invalid payload"}))
})