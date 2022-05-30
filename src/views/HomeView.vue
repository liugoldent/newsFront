<script>
import { RouterLink, RouterView } from 'vue-router'
import HomeCardVue from '../components/HomeCard.vue'
import { ref } from 'vue'
export default {
  components: {
    HomeCardVue,
  },
  setup() {
    let stockInfo = ref({})
    let trendInfo = ref({})
    stockInfo.value = {
      title: '台灣股市',
      content:
        '相較於以往的法人買賣超，在這裡我們可以透過買賣超與技術分析來篩選出你想看的股票',
    }
    trendInfo.value = {
      title: '熱搜關鍵字',
      content: '集合各線上購物網站的熱搜關鍵字，讓您了解現在趨勢為何',
    }
    return {
      stockInfo,
      trendInfo,
    }
  },
}
</script>

<template>
  <div class="flex flex-wrap flex-col place-content-center h-max w-auto">
    <div class="text-center m-8">
      <h1 class="text-9xl font-Monoton sm:text-6xl">News</h1>
    </div>
    <div class="flex flex-row flex-wrap justify-center items-center m-8 h-auto">
      <router-link to="/stock"><HomeCardVue :info="stockInfo" /></router-link>
      <router-link to="/trend"><HomeCardVue :info="trendInfo" /></router-link>
    </div>
  </div>
</template>

