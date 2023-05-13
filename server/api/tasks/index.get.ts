export default defineEventHandler(async (event) => {
   const query = getQuery(event);

   if (query.group) {
      if (query.group == "tasks") {
         const [tasks, tasklists] = await prisma.$transaction(async (tx) => {
            const tasks = await tx.task.findMany({
               where: { group: "tasks", tasklistId: null },
            });
            const tasklists = await tx.tasklist.findMany({
               where: { group: "tasks" },
               include: {
                  tasks: true,
               },
            });

            return [tasks, tasklists];
         });

         return {
            tasks: combineAndSortLists<Task | Tasklist>([tasks, tasklists], "order"),
            timestamp: new Date(),
         };
      }

      if (query.group == "tasksDone") {
         const [tasks, tasklists] = await prisma.$transaction(async (tx) => {
            const tasks = await tx.task.findMany({
               where: { group: "tasksDone", tasklistId: null },
            });
            const tasklists = await tx.tasklist.findMany({
               where: { group: "tasksDone" },
               include: {
                  tasks: true,
               },
            });

            return [tasks, tasklists];
         });

         return {
            tasks: combineAndSortLists<Task | Tasklist>([tasks, tasklists], "order"),
            timestamp: new Date(),
         };
      }
   }
   return {
      tasks: [],
      timestamp: new Date(),
   };
});
