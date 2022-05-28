<template>
  <div
    v-if="loadingStatus"
    class="
      fixed
      h-full
      w-full
      bg-gray-900/70 bg-cover
      z-10
      flex flex-row flex-wrap
      justify-center
      items-end
    "
  >
    <div
      class="z-20 m-6 w-8 h-8 rounded-lg opacity-100 m-2 animate-spin"
      v-for="(color, index) in bgColor"
      :class="[color, `delay${(index + 1) * 100}`]"
      :key="index"
    ></div>
    <h1 class="text-white font-2xl fixed bottom-20 font-Monoton">Loading...</h1>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  props: ['loadingStatus'],
  setup() {
    let bgColor = ref([])
    bgColor.value = [
      'bg-purple-500',
      'bg-green-500',
      'bg-blue-500',
      'bg-red-500',
      'bg-yellow-500',
    ]
    return {
      bgColor,
    }
  },
}
</script>
