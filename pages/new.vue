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
:root {
   --size: 50vmin;
   --white: #fff;
   --blue: #3051f1;
   --purple: #c92bb7;
   --red: #f73344;
   --orange: #fa8e37;
   --yellow: #fcdf8f;
   --yellow_to: #fbd377;
}

.instagram {
   background: radial-gradient(circle farthest-corner at 28% 100%, var(--yellow) 0%, var(--yellow_to) 10%, var(--orange) 22%, var(--red) 35%, transparent 65%),
      linear-gradient(145deg, var(--blue) 10%, var(--purple) 70%)
}
</style>