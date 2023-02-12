<script lang="ts" setup>
const props = defineProps<{
   note?: Note;
   placeholder?: string;
   clearOnEnter?: boolean;
   hideMenu?: boolean
}>()

const emit = defineEmits<{
   (e: "enter", payload: Note): void;
}>();

const noteValue = ref(props.note?.note)


function handleEnter() {
   emit("enter", {
      note: noteValue.value ?? ""
   });

   if (props.clearOnEnter) {
      noteValue.value = ""
   }
}
</script>
<template>
   <m-card>
      <div class="h-full w-full flex items-center gap-2 justify-between">
         <m-popover v-if="!hideMenu">
            <m-drag-handle />
            <template #content>
               <menu-item>
                  Convert to task
                  <template #icon>
                     <Icon class="text-skyblue-500" name="eva:checkmark-square-2-fill" />
                  </template>
               </menu-item>
               <menu-item>
                  Pin
                  <template #icon>
                     <Icon class="text-green-500" name="ic:round-push-pin" />
                  </template>
               </menu-item>
               <menu-item>
                  Delete
                  <template #icon>
                     <Icon class="text-red-500" name="eva:trash-2-fill" />
                  </template>
               </menu-item>
            </template>
         </m-popover>
         <m-text-area v-model:value="noteValue" placeholder="New note" @enter="handleEnter" />
      </div>
   </m-card>
</template>