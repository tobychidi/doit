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
const emit = defineEmits(["update:value"]);

const mValue = useVModel(props, "value", emit);
</script>

<template>
   <div class="h-full w-full flex flex-col justify-center">
      <input class="w-full p-1 px-2 rounded-lg bg-transparent outline-none h-200"
         :placeholder="placeholder" v-model="mValue" :maxlength="maxlength" @keypress.enter.prevent=""  />
   </div>
</template>
