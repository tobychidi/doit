export async function handleNotesAdd(e: SlicksortInsertEvent) {
   const dataItem = e.value;
   if (dataItem.task) {
      await createNewNote({
         note: dataItem.task,
         order: e.newIndex,
      });
      await deleteTask(dataItem.id);
   }
   if (dataItem.title) {
      const combinedFromTasklist = [];
      combinedFromTasklist.push(dataItem.title);
      if (dataItem.tasks) {
         dataItem.tasks.forEach((task: Task) => combinedFromTasklist.push(task.task));
      }
      await createNewNote({
         note: combinedFromTasklist.join("-"),
         order: e.newIndex,
      });
      await deleteTasklist(dataItem.id);
   }
}

export async function handleTasksAdd(e: SlicksortInsertEvent) {
   const dataItem = e.value;
   if (dataItem.note) {
      await createNewTask({
         task: dataItem.note,
         done: false,
         order: e.newIndex,
      });
      await deleteNote(dataItem.id);
   }
   if (dataItem.task) {
      await updateTask({
         taskId: dataItem.id,
         task: { done: false, tasklistId: null, order: e.newIndex },
      });
   }
   if (dataItem.title) {
      await updateTasklist({
         tasklistId: dataItem.id,
         tasklist: { done: false, order: e.newIndex },
      });
   }
}

export async function handleTasksDoneAdd(e: SlicksortInsertEvent) {
   const dataItem = e.value;
   if (dataItem.note) {
      await createNewTask({
         task: dataItem.note,
         done: true,
      });
      await deleteNote(dataItem.id);
   }
   if (dataItem.task) {
      await updateTask({
         taskId: dataItem.id,
         task: { done: true, tasklistId: null },
      });
   }
   if (dataItem.title) {
      await updateTasklist({
         tasklistId: dataItem.id,
         tasklist: { done: true },
      });
   }
}
