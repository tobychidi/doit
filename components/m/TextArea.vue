<script lang="ts" setup>
import { Motion, Presence } from "motion/vue";

const props = withDefaults(
   defineProps<{
      placeholder?: string;
      value: string;
   }>(),
   {
      placeholder: "Placeholder",
   }
);
const emit = defineEmits(["update:value"]);

const mValue = useVModel(props, "value", emit);
const maxCharacterLength = ref(96)
const maxRows = ref(4)
const characterCount = ref(0)
const rows = ref(1)

const inFocus = ref(false)

watchEffect(() => {
   characterCount.value = mValue.value.length
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

function handleFocus() {
   inFocus.value = true
}
function handleBlur() {
   inFocus.value = false
}
</script>

<template>
   <Presence class="h-full w-full flex flex-col justify-center">
      <textarea class="w-full p-1 px-2 rounded-lg bg-transparent outline-none h-200 resize-none overflow-hidden"
         :placeholder="placeholder" v-model="mValue" :rows="rows" :maxlength="maxCharacterLength"
         @keypress.enter.prevent="" @focus="handleFocus" @blur="handleBlur" />

      <Motion tag="p" class="text-xs text-light-600 self-end" v-show="inFocus" :initial="{ y:-10, scale: 0 }"
         :animate="{ y: 0, scale: 1 }" :exit="{ y:-10, scale: 0.6 }" :transition="{ duration: 2 }">
         {{ characterCount }}/{{ maxCharacterLength }}
      </Motion>
   </Presence>
</template>
