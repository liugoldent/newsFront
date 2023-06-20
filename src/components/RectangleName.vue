<template>
  <div class="fixed left-1 top-18 sm:top-16 md:top-24">
    <span
      class="
        absolute
        inset-0
        w-full
        h-full
        transition
        duration-300
        ease-out
        transform
        translate-x-1 translate-y-1
        group-hover:-translate-x-0 group-hover:-translate-y-0
      "
      :class="bgColor"
    ></span>
    <span
      class="absolute inset-0 w-full h-full bg-white border-2"
      :class="borderColor"
    ></span>
    <span
      class="relative group-hover:text-red-100 p-5 text-xl"
      :class="textColor"
    >
      <a :href="titleHref">{{ titleName }}</a>
    </span>
  </div>
</template>
<script>
import { inject } from 'vue'
export default {
  props: ['titleName', 'titleHref'],
  setup() {
    const {
      rectangleTextColor: textColor,
      rectangleBorderColor: borderColor,
      rectangleBgColor: bgColor,
    } = inject('rectangleColor')

    return {
      borderColor,
      textColor,
      bgColor,
    }
  },
}
</script>

