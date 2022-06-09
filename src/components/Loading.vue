<template>
  <div
    v-if="loadingStatus"
    class="
      fixed
      h-full
      w-full
      bg-gray-900/70 bg-cover
      z-10
      flex flex-col flex-wrap
      justify-center
      items-center
    "
  >
    <div class="flex flex-row mb-4">
      <div
        class="z-20 m-4 w-8 h-8 rounded-lg opacity-100 animate-spin"
        v-for="(color, index) in bgColor"
        :class="[color, `delay${(index + 1) * 100}`]"
        :key="index"
      ></div>
    </div>

    <h1 class="text-white text-3xl font-Chiayifont">Loading...</h1>
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
