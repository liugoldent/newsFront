<script>
import { RouterLink, RouterView } from 'vue-router'
import HomeCardVue from '../components/HomeCard.vue'
import { ref, provide } from 'vue'
export default {
  components: {
    HomeCardVue,
  },
  setup() {
    let stockInfo = ref({})
    let trendInfo = ref({})
    let financeInfo = ref({})
    stockInfo.value = {
      title: '一日法人買賣超',
      content:
        '相較於以往的法人買賣超，在這裡我們可以透過買賣超與技術分析來篩選出你想看的股票',
    }
    trendInfo.value = {
      title: '熱搜關鍵字',
      content: '集合各線上購物網站的熱搜關鍵字，讓您了解現在趨勢為何',
    }
    financeInfo.value = {
      title: '財經新聞',
      content: '集結yahoo與鉅亨網的所見所聞，讓你一手掌握財經事',
    }
    return {
      stockInfo,
      trendInfo,
      financeInfo,
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
      <router-link to="/financeNews"
        ><HomeCardVue :info="financeInfo"
      /></router-link>
      <!-- <router-link to="/trend"><HomeCardVue :info="trendInfo" /></router-link> -->
    </div>
  </div>
</template>

