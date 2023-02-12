<script lang="ts" setup>
const props = withDefaults(
   defineProps<{
      placeholder?: string;
      value: string;
      maxlength?: number;
   }>(),
   {
      placeholder: "Placeholder",
      maxlength: 24
   }
);
const emit = defineEmits(["update:value", "enter", "ctrlEnter"]);

const mValue = useVModel(props, "value", emit);

const inputRef = ref(null)
const { focused } = useFocus(inputRef)

const { ctrl_enter } = useMagicKeys()

whenever(ctrl_enter, () => { if (focused.value) emit("ctrlEnter") })

function handleEnter() {
   emit("enter")
}
</script>

<template>
   <div class="h-full w-full flex flex-col justify-center">
      <input class="w-full p-1 rounded-lg bg-transparent outline-none h-200" :placeholder="placeholder" v-model="mValue"
         :maxlength="maxlength" @keypress.enter.prevent="handleEnter" />
   </div>
</template>
