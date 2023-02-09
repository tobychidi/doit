declare global{
   interface Note {
      note: string;
   }
   interface Task {
      task: string;
      done: boolean;
   }

   interface TaskList {
      title: string;
      tasks: Task[];
   }
}

export {}