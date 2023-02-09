<template>
   <m-button class="shadow-none gap-2">
      <slot />
      <div
         class="h-7 w-7 flex justify-center items-center rounded-full bg-light-400 dark:bg-transparent text-lg">
         <slot name="icon" />
      </div>
   </m-button>
</template>