declare global{
   interface Note {
      id?: number;
      note: string;
   }
   interface Task {
      id?: number;
      task: string;
      done: boolean;
      tasklistId?: number | null;
   }

   interface Tasklist {
      id?: number;
      title: string;
      tasks: Task[];
      done?: boolean;
   }
}

export {}