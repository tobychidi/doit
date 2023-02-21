<script lang="ts" setup>
import { SwiperOptions } from "swiper";

const swiperOptions = {
   slidesPerView: 1,
   spaceBetween: 10,
   breakpoints: {
      420:{
         slidesPerView: 2
      },
      640: {
         slidesPerView: 3
      },
      1280:{
         slidesPerView: 4
      }
   }
}

</script>
<template>
   <div>
      <swiper v-bind="swiperOptions" class="h-60 w-[90vw] md:w-[80vw] text-white text-center text-lg">
         <swiper-slide class="bg-red-600 rounded-lg p-2">
            <div class="h-full w-full flex justify-center items-center">
               Help me
            </div>
         </swiper-slide>
         <swiper-slide class="bg-green-600 rounded-lg p-2">
            <div class="h-full w-full flex justify-center items-center">
               I am strong
            </div>
         </swiper-slide>
         <swiper-slide class="bg-skyblue-600 rounded-lg p-2">
            <div class="h-full w-full flex justify-center items-center">
               I am wise
            </div>
         </swiper-slide>
         <swiper-slide class="bg-blue-600 rounded-lg p-2">
            <div class="h-full w-full flex justify-center items-center">
               I am mercyrounded
            </div>
         </swiper-slide>
      </swiper>
   </div>
</template>