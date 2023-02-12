export function useDragOptions() {
   const dragOptions = ref({
      animation: 150,
      group: "items",
      disabled: false,
      handle: ".handle",
      ghostClass: "ghost",
      tag: "ul",
      class: "flex flex-col flex-1 gap-4",
   });
   return dragOptions;
}
