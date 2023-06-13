<template>
   <div class="instagram h-100 w-100 rounded-3xl bg-white flex justify-center items-center relative">
      <div class="bg-white h-80 w-80 rounded-3xl absolute"></div>
      <div class="instagram bg-pink h-70 w-70 rounded-3xl absolute"></div>
      <div class="bg-white h-10 w-10 absolute rounded-full top-20 right-20"></div>
      <div class="bg-transparent border-white border-solid border-20 h-50 w-50 absolute rounded-full">
      </div>
   </div>
</template>

<style lang="scss" scoped>
$colors: (
   1:#f09433,
   2:#e6683c,
   3:#dc2743,
   4:#cc2366,
   5:#bc1888
);

@each $pos,
$color in $colors {
   @property --stop-#{$pos} {
      syntax: '<color>';
      inherits: false;
      initial-value: $color;
   }
}

@keyframes colorati {
   50% {
      --stop-1: #bc1888;
      --stop-2: #cc2366;
      --stop-3: #dc2743;
      --stop-4: #e6683c;
      --stop-5: #f09433;
   }
}

.instagram {
   background: linear-gradient(45deg, var(--stop-1) 0%, var(--stop-2) 25%, var(--stop-3) 50%, var(--stop-4) 75%, var(--stop-5) 100%);
   animation: colorati 5s ease-in-out infinite;
}
</style>