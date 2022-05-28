<template>
  <button
    @click="scrollToTop"
    class="
      animate-bounce
      fixed
      bottom-10
      left-10
      border border-double
      rounded-full
      p-3
      border-rose-400
      shadow-rose-300/30 shadow-xl
    "
  >
    <font-awesome-icon icon="angles-up" class="fa-2xl text-rose-400" />
  </button>
</template>
<script>
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
    return {
      scrollToTop
    }
  },
}
</script>
