<script lang="ts" setup>
const props = defineProps<{
   note?: Note;
   placeholder?: string;
   clearOnEnter?: boolean;
   hideMenu?: boolean
}>()

const emit = defineEmits<{
   (e: "enter", payload: Note): void;
   (e: "delete"): void;
}>();

const noteValue = ref(props.note?.note)

const popover = ref<any| null>(null)

const loading = ref(false)


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
   const { error } = await useFetch(`/api/notes/${props.note?.id}`, { method: "delete" })
   if (!error.value) {
      await refreshNuxtData("notes")
   }
   await nextTick()
   loading.value = false
}
</script>
<template>
   <m-card :class="{'loading': loading}">
      <div class="h-full w-full flex items-center gap-2 justify-between">
         <m-popover ref="popover" v-if="!hideMenu">
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
               <menu-item @click="handleDelete">
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

<style lang="scss" scoped>

@keyframes pulse {
   from{
      opacity: .5
   }
   to{
      opacity: .1
   }
}
.loading{
   opacity: 0;
   animation: pulse 650ms ease-in-out infinite;
}
</style>