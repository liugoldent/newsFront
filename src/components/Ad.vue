<template>
  <div
    class="h-auto w-auto flex flex-col justify-center items-end"
    :class="{ invisible: visiableStatus }"
  >
    <font-awesome-icon
      :icon="['fas', 'xmark']"
      class="border-none text-4xl text-red-500 cursor-pointer relative top-5"
      @click="visiableStatus = !visiableStatus"
    />
    <div
      v-for="product in productList"
      :key="product.name"
      class="rounded-lg flex flex-col justify-center items-center"
    >
      <a
        href="
https://line.me/ti/g2/V1O2JN2etzTffgjw5NIq5-JvXF5FToNydOV5bw?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
        ><font-awesome-icon
          :icon="['fab', 'line']"
          class="border-none text-8xl text-green-700 cursor-pointer"
      /></a>
      <!-- <p class="text-xl bg-red-400 w-full text-center">{{ product.name }}</p> -->
      <!-- <a :href="product.href"
        ><img :src="product.src" class="animate-pulse hover:animate-none"
      /></a> -->
    </div>
  </div>
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faLine } from '@fortawesome/fontawesome-free-brands'
library.add(faXmark, faLine)

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
