<script lang="ts" setup>
import { Motion } from "motion/vue";
import { useFloating, Placement, offset, shift, flip, autoUpdate } from '@floating-ui/vue';
import { onClickOutside } from '@vueuse/core'

const props = withDefaults(defineProps<{
   placement?: Placement,
   offset?: number,
}>(), {
   placement: "left",
   offset: 20,
})
const reference = ref(null);
const floating = ref(null);
const { x, y, strategy } = useFloating(reference, floating, {
   placement: props.placement,
   middleware: [offset(props.offset), shift(), flip()],
   whileElementsMounted: autoUpdate,
});

const show = ref(false)

function showPopover() {
   show.value = true
}
function hidePopover() {
   show.value = false
}

onClickOutside(floating, () => {
   hidePopover()
})
</script>
<template>
   <div ref="reference" @click="showPopover()">
      <slot />
   </div>
   <Motion v-if="show" ref="floating" :style="{
      position: strategy,
      top: `${y ?? 0}px`,
      left: `${x ?? 0}px`,
      width: 'max-content',
   }" :initial="{ scale: .8, opacity: .5 }" :animate="{ scale: 1, opacity: 1 }" :transition="{duration: .15}">

      <m-card class="shadow-lg text-[.6rem] sm:text-xs" v-bind="$attrs">
         <slot name="content">   
            Content
         </slot>
      </m-card>
   </Motion>
</template>