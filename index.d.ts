declare global{
   interface Note {
      note: string;
   }
   interface Task {
      task: string;
      done: boolean;
   }

   interface Tasklist {
      title: string;
      tasks: Task[];
   }
}

export {}