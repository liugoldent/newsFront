<template>
  <div
    class="h-60 w-60 flex flex-col justify-center items-end"
    :class="{ invisible: visiableStatus }"
  >
    <font-awesome-icon
      icon="xmark"
      class="border-none text-4xl text-red-700 cursor-pointer"
      @click="visiableStatus = !visiableStatus"
    />
    <div
      v-for="product in productList"
      :key="product.name"
      class="
        rounded-lg
        flex flex-col
        justify-center
        items-center
      "
    >
      <p class="text-xl bg-red-400 w-full text-center">{{ product.name }}</p>
      <a :href="product.href"><img :src="product.src" class="animate-pulse hover:animate-none"/></a>
    </div>
  </div>
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
library.add(faXmark)

import { ref } from 'vue'
import { productList } from '../public/AdInfo.js'
export default {
  setup() {
    const visiableStatus = ref(false)
    return {
      productList,
      visiableStatus,
    }
  },
}
</script>
