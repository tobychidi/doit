<template>
   <div class="wrapper w-[35rem] h-[35rem] rounded-full flex justify-center items-center">
      <div class="parent relative text-white">
         <m-cap class="w-25 sm:w-30 bg-blue-800 ">Yo!</m-cap>
         <m-cap class="w-20 sm:w-25 bg-orange-500">T</m-cap>
         <m-cap class="w-15 sm:w-20 bg-red-800">R</m-cap>
         <m-cap class="w-20 sm:w-25 bg-emerald-500">I</m-cap>
         <m-cap class="w-15 sm:w-20 bg-violet-800">G</m-cap>
         <m-cap class="w-20 sm:w-25 bg-pink-500">N</m-cap>
         <m-cap class="w-15 sm:w-20 bg-teal-800">O</m-cap>
         <m-cap class="w-20 sm:w-25 bg-yellow-500">M</m-cap>
         <m-cap class="w-15 sm:w-20 bg-gray-800">E</m-cap>
         <m-cap class="w-15 sm:w-20 bg-orange-500">T</m-cap>
         <m-cap class="w-10 sm:w-15 bg-red-800">R</m-cap>
         <m-cap class="w-15 sm:w-20 bg-emerald-500">I</m-cap>
         <m-cap class="w-10 sm:w-15 bg-violet-800">G</m-cap>
         <m-cap class="w-15 sm:w-20 bg-pink-500">N</m-cap>
         <m-cap class="w-10 sm:w-15 bg-teal-800">O</m-cap>
         <m-cap class="w-15 sm:w-20 bg-yellow-500">M</m-cap>
         <m-cap class="w-10 sm:w-15 bg-gray-800">E</m-cap>
         <m-cap class="w-15 sm:w-20 bg-orange-500">T</m-cap>
         <m-cap class="w-10 sm:w-15 bg-red-800">R</m-cap>
         <m-cap class="w-15 sm:w-20 bg-emerald-500">I</m-cap>
         <m-cap class="w-10 sm:w-15 bg-violet-800">C</m-cap>
         <m-cap class="w-15 sm:w-20 bg-pink-500">A</m-cap>
         <m-cap class="w-10 sm:w-15 bg-teal-800">L</m-cap>
         <m-cap class="w-15 sm:w-20 bg-yellow-500">L</m-cap>
         <m-cap class="w-15 sm:w-15 bg-gray-800">Y</m-cap>
      </div>
   </div>
</template>

<style lang="scss" scoped>
@property --circle-pos {
   syntax: '<angle>';
   inherits: false;
   initial-value: 0deg;
}

@keyframes wheel {
   100% {
      --circle-pos: 360deg;
   }
}

.parent {
   width: 8rem;
   aspect-ratio: 1;
   border-radius: 50%;

   &>div {
      inset: 0;
      margin: auto;
      filter: grayscale(50%);


      @media screen and (min-width: 640px) {
         --radius: 8rem;
      }

      &:hover {
         scale: 110%;
         z-index: 1;
         filter: grayscale(0%);
      }

      @for $index from 1 through 8 {
         &:nth-of-type(#{$index+1}) {
            --radius: 6.5rem;
            --degrees: calc((#{$index}*360deg/8) + var(--circle-pos));
            transform: translate(calc(cos(var(--degrees))*var(--radius)),
                  calc(sin(var(--degrees))*var(--radius)));
            animation: wheel 60s linear infinite paused;

            &:not(.wrapper:hover div) {
               animation-play-state: running;
            }

            @media screen and (min-width: 640px) {
               --radius: 8rem;
            }
         }
      }

      @for $index from 9 through 24 {
         &:nth-of-type(#{$index+1}) {
            --radius: 8.5rem;
            --degrees: calc((#{$index}*360deg/16) + var(--circle-pos));

            transform: translate(calc(cos(var(--degrees))*var(--radius)),
                  calc(sin(var(--degrees))*var(--radius)));
            animation: wheel 45s linear infinite paused;

            &:not(.wrapper:hover div) {
               animation-play-state: running;
            }

            @media screen and (min-width: 640px) {
               --radius: 14rem;
            }
         }
      }
   }
}
</style>