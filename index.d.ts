declare global{
   interface Note {
      id?: number;
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