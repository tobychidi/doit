import type { MaybeRef } from "@vueuse/core";

type PartialTask = Partial<Task>;

export async function createNewTask(task: Task) {
   if (task.task) {
      const { error } = await useFetch("/api/tasks", { method: "POST", body: task });
      if (!error.value) {
         await refreshNuxtData("tasks");
      }
   }
}
export async function createNewNote(note: Note) {
   if (note.note) {
      const { data, error } = await useFetch("/api/notes", { method: "post", body: note });
      if (!error.value) {
         await refreshNuxtData("notes");
         return data
      }
   }
}

export async function createNewTasklist(tasklist: Tasklist) {
   if (tasklist.tasks) {
      const { error } = await useFetch("/api/tasks", { method: "post", body: tasklist });
      if (!error.value) {
         refreshNuxtData("tasks");
      }
   }
}

export async function deleteNote(noteId?: number) {
   if (noteId) {
      const { error } = await useFetch(`/api/notes/${noteId}`, { method: "delete" });
      if (!error.value) {
         await refreshNuxtData("notes");
      }
   }
}
export async function deleteTask(taskId?: number) {
   if (taskId) {
      const { error } = await useFetch(`/api/tasks/${taskId}`, {
         method: "delete",
      });
      if (!error.value) {
         await refreshNuxtData("tasks");
      }
   }
}
export async function deleteTasklist(tasklistId?: number) {
   if(tasklistId){
      const { error } = await useFetch(`/api/tasks/list/${tasklistId}`, {
         method: "delete",
      });
      if (!error.value) {
         await refreshNuxtData("tasks");
      }
   }
}

export async function updateTask(args: { taskId?: number; task: MaybeRef<PartialTask> }) {
   if (args.taskId) {
      await useFetch(`/api/tasks/${args.taskId}`, {
         method: "PATCH",
         body: { task: unref(args.task) },
      });
      await refreshNuxtData("tasks");
   }
}

export async function updateTasklist(args: {
   tasklistId?: number;
   tasklist: Partial<Tasklist>;
}) {
   if (args.tasklistId) {
      await useFetch(`/api/tasks/list/${args.tasklistId}`, {
         method: "PATCH",
         body: args.tasklist,
      });
      await refreshNuxtData("tasks");
   }
}