<script lang="ts" setup>
const props = withDefaults(
   defineProps<{
      placeholder?: string;
      value?: string;
   }>(),
   {
      placeholder: "Placeholder",
   }
);
const emit = defineEmits(["update:value", "enter", "ctrlEnter"]);

const mValue = useVModel(props, "value", emit);
const maxCharacterLength = ref(96)
const maxRows = ref(4)
const characterCount = ref(0)
const rows = ref(1)

const inputRef = ref(null)
const { focused } = useFocus(inputRef)

const { ctrl_enter } = useMagicKeys()

whenever(ctrl_enter, () => { if (focused.value) emit("ctrlEnter") })

watchEffect(() => {
   characterCount.value = mValue.value?.length ?? 0
   const quotient = characterCount.value / (maxCharacterLength.value / maxRows.value)
   if (quotient <= 1) {
      rows.value = 1
   } else if (quotient <= 2) {
      rows.value = 2
   } else if (quotient <= 3) {
      rows.value = 3
   } else if (quotient <= 4) {
      rows.value = 4
   }
})


function handleEnter() {
   emit("enter")
}
</script>

<template>
   <div class="h-full w-full flex flex-col justify-center">
      <textarea ref="inputRef" class="w-full p-1 rounded-lg bg-transparent outline-none resize-none overflow-hidden"
         :placeholder="placeholder" v-model="mValue" :rows="rows" :maxlength="maxCharacterLength"
         @keypress.enter.prevent="handleEnter" />
      <!-- <div class="text-xs text-light-600 self-end transition" :class="{
         'opacity-0 -translate-y-1': !inFocus
      }">
         {{ characterCount }} / {{ maxCharacterLength }}
      </div> -->
   </div>
</template>
