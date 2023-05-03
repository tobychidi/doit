<template>
<div class="h-full flex justify-center items-center">
      <div class="loader-circle">
         <span></span>
      </div>
</div>
</template>

<style lang="scss" scoped>
/* Circle Loader */
.loader-circle {
   --line-color-rgb: 225, 225, 225;
   --size: max(50vh, 100px);
   --line-width: calc(var(--size)/10);
   --speed: 8s;


   width: var(--size);
   height: var(--size);
   animation: circle-loader-1 var(--speed) linear infinite;
}

@keyframes circle-loader-1 {
   to {
      transform: rotate(360deg);
   }
}

.loader-circle span {
   display: block;
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   margin: auto;
   clip: rect(0, var(--size), var(--size), calc(var(--size) / 2));
   animation: circle-loader-2 calc(var(--speed)/4) linear infinite;
}

@keyframes circle-loader-2 {
   from {
      transform: rotate(0deg);
   }

   to {
      transform: rotate(220deg);
   }
}

.loader-circle span::after {
   content: '';
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   margin: auto;
   clip: rect(0, var(--size), var(--size), calc(var(--size) / 2));
   border: var(--line-width) solid rgb(var(--line-color-rgb));
   border-radius: 50%;
   animation: circle-loader-3 calc(var(--speed)/4) cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
}

@keyframes circle-loader-3 {
   0% {
      transform: rotate(-140deg);
   }

   50% {
      transform: rotate(-160deg);
   }

   100% {
      transform: rotate(140deg);
   }
}
</style>