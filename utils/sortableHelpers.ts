export function sortableEventItemDataValue(e: any) {
   return JSON.parse(e.item.getAttribute("data-value"));
}
