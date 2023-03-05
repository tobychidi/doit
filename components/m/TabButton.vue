<script lang="ts" setup>
const props = withDefaults(defineProps<{
   name?: string;
   activeTab?: string;
}>(), {
   name: "tab"
})

const emit = defineEmits<{
   (e: 'changeTab', payload: string): void,
}>()

function handleClick(){
   emit("changeTab", props.name)
}
const tabType = computed(() => props.name == props.activeTab ? "primary" : "transparent");
</script>
<template>
   <m-button class="active:scale-100" :type="tabType" @click="handleClick">
      <div class="flex flex-col text-xs items-center justify-center gap-1">
         <slot name="icon" />
         <slot>Tab button</slot>
      </div>
   </m-button>
</template>