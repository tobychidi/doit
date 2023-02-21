<template>
   <div>
      <swiper :slides-per-view="3" :breakpoints="{
         
      }" :space-between="10" class="h-60 w-[80vw] text-white text-center text-lg">
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