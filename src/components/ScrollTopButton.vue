<template>
  <button
    @click="scrollToTop"
    class="
      animate-bounce
      fixed
      sm:bottom-5 sm:left-5
      bottom-10
      left-10
      border border-double
      rounded-full
      p-3
      shadow-xl
    "
    :class="[borderColor, shadowColor]"
  >
    <font-awesome-icon
      icon="angles-up"
      class="fa-2xl text-rose-400"
      :class="textColor"
    />
  </button>
</template>
<script>
import { inject } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons'

library.add(faAnglesUp)
export default {
  setup() {
    /**
     * @description 點擊向上按鈕
     */
    const scrollToTop = function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
    const {
      scrollToTopBorderColor: borderColor,
      scrollToTopTextColor: textColor,
      scrollToTopShadowColor: shadowColor,
    } = inject('scrollToTopColor')
    return {
      scrollToTop,
      borderColor,
      textColor,
      shadowColor
    }
  },
}
</script>
