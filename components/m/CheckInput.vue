<script lang="ts" setup>
const props = defineProps<{
   value?: boolean;
}>()
const emit = defineEmits(["update:value"])

const checked = useVModel(props, "value", emit)
const toggleChecked = useToggle(checked)

</script>
<template>
   <button class="text-2xl sm:text-3xl active:scale-95" @click="toggleChecked()">
      <span v-if="checked">
         <IconCSS name="eva:checkmark-square-2-fill" />
      </span>
      <span v-else>
         <IconCSS name="eva:square-fill" />
      </span>
   </button>
</template>