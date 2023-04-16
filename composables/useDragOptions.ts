export function useDragOptions() {
   const dragOptions = ref({
      animation: 150,
      group: "items",
      disabled: false,
      handle: ".handle",
      ghostClass: "ghost",
      tag: "ul",
   });
   return dragOptions;
}
