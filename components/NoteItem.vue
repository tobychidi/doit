<script lang="ts" setup>
const props = defineProps<{
   note?: Note;
   placeholder?: string;
   noUpdate?: boolean;
   clearOnEnter?: boolean;
   hideMenu?: boolean
}>()

const emit = defineEmits<{
   (e: "enter", payload: Note): void;
   (e: "delete"): void;
}>();

const noteValue = ref(props.note?.note)

const popover = ref<any | null>(null)

const loading = ref(false)

watchThrottled(noteValue, async () => {
   if (!props.noUpdate) await updateNote({ noteId: props.note?.id, note: { note: noteValue.value } })
}, { throttle: 1500 })

function handleEnter() {
   emit("enter", {
      note: noteValue.value ?? ""
   });

   if (props.clearOnEnter) {
      noteValue.value = ""
   }
}

async function handleDelete() {
   popover.value.hidePopover()
   loading.value = true
   await deleteNote(props.note?.id)
   await nextTick()
   loading.value = false
}
</script>
<template>
   <m-card :class="{ 'pulsing': loading }">
      <div class="h-full w-full flex items-center gap-2 justify-between">
         <m-popover ref="popover" v-if="!hideMenu">
            <m-drag-handle />
            <template #content>
               <menu-item>
                  Convert to task
                  <template #icon>
                     <IconCSS class="text-skyblue-500" name="eva:checkmark-square-2-fill" />
                  </template>
               </menu-item>
               <menu-item>
                  Pin
                  <template #icon>
                     <IconCSS class="text-green-500" name="ic:round-push-pin" />
                  </template>
               </menu-item>
               <menu-item @click="handleDelete">
                  Delete
                  <template #icon>
                     <IconCSS class="text-red-500" name="eva:trash-2-fill" />
                  </template>
               </menu-item>
            </template>
         </m-popover>
         <m-text-area v-model:value="noteValue" placeholder="New note" @enter="handleEnter" />
      </div>
   </m-card>
</template>

<style lang="scss">
@keyframes pulse {
   from {
      opacity: .5
   }

   to {
      opacity: .1
   }
}

.pulsing {
   opacity: 0;
   animation: pulse 650ms ease-in-out infinite;
}
</style>