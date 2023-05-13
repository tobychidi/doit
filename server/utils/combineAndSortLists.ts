export function combineAndSortLists<T>(lists: T[][], sortKey: keyof T): T[] {
   const combinedList = [];

   for (let i = 0; i < lists.length; i++) {
      const list = lists[i];
      for (let j = 0; j < list.length; j++) {
         const item = list[j];
         combinedList.push(item);
      }
   }
   combinedList.sort((a, b) => {
      const normalizedA = a[sortKey] ?? 0;
      const normalizedB = b[sortKey] ?? 0;
      if (normalizedA < normalizedB) return -1;
      if (normalizedA > normalizedB) return 1;
      return 0;
   });
   return combinedList;
}
