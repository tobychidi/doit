<script lang="ts" setup>
const props = defineProps<{
   value: boolean;
}>()
const emit = defineEmits(["update:value"])

const checked = useVModel(props, "value", emit)
const toggleChecked = useToggle(checked)

</script>
<template>
   <button class="text-3xl" @click="toggleChecked()">
      <span v-if="checked">
         <Icon name="eva:checkmark-square-2-fill" />
      </span>
      <span v-else>
         <Icon name="eva:square-fill" />
      </span>
   </button>
</template>