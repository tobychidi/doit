declare global {
   interface Note {
      id?: number;
      note: string;
      group?: "notes";
      order?: number;
   }
   interface Task {
      id?: number;
      task: string;
      done: boolean;
      tasklistId?: number | null;
      group?: "tasks" | "tasksDone";
      order?: number;
   }

   interface Tasklist {
      id?: number;
      title: string;
      tasks: Task[];
      done?: boolean;
      group?: "tasks" | "tasksDone";
      order?: number;
   }

   interface SlicksortInsertEvent {
      newIndex: number;
      value: any;
   }

   interface SlicksortSortEndEvent {
      event: MouseEvent;
      oldIndex: number;
      newIndex: number;
   }
}

export {};
