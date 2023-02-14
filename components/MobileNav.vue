<script lang="ts" setup>
const props = withDefaults(defineProps<{
   defaultTab?: string;
}>(), {
   defaultTab: "tasks"
})
const activeTab = ref(props.defaultTab)

function handleChangeTab(newTab: string){
   activeTab.value = newTab
}
</script>
<template>
   <m-card class="bg-light-100 dark:bg-dark-700 shadow-lg">
      <div class="w-full flex justify-around gap-2">
         <m-tab-button name="notes" :active-tab="activeTab" @change-tab="handleChangeTab">
            <template #icon>
               <Icon class="text-xl" name="ic:round-sticky-note-2" />
            </template>
            Notes
         </m-tab-button>
         <m-tab-button name="tasks" :active-tab="activeTab" @change-tab="handleChangeTab">
            <template #icon>
               <Icon class="text-xl" name="eva:square-fill" />
            </template>
            Tasks
         </m-tab-button>
         <m-tab-button name="taskDone" :active-tab="activeTab" @change-tab="handleChangeTab">
            <template #icon>
               <Icon class="text-xl" name="eva:checkmark-square-2-fill" />
            </template>
            Done
         </m-tab-button>
      </div>
   </m-card>
</template>