<script>
import { series400, series700 } from './public/color'
import { provide } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HomeViewVue from './views/HomeView.vue'
import HeaderVue from './components/Header.vue'
import FooterVue from './components/Footer.vue'
import AdVue from './components/Ad.vue'
export default {
  components: {
    HeaderVue,
    FooterVue,
    AdVue,
  },
  setup() {
    let randomNumber = Math.floor(Math.random() * 16)
    let rectangleTextColor = series700.textColor[randomNumber]
    let rectangleBorderColor = series700.borderColor[randomNumber]
    let rectangleBgColor = series700.bgColor[randomNumber]
    let scrollToTopBorderColor = series400.borderColor[randomNumber]
    let scrollToTopTextColor = series400.textColor[randomNumber]
    let scrollToTopShadowColor = series400.shadowColor[randomNumber]
    provide('rectangleColor', {
      rectangleTextColor,
      rectangleBorderColor,
      rectangleBgColor,
    })
    provide('scrollToTopColor', {
      scrollToTopBorderColor,
      scrollToTopTextColor,
      scrollToTopShadowColor,
    })
  },
}
</script>

<template>
  <div class="flex flex-col items-center justify-between h-screen">
    <HeaderVue />
    <RouterView> </RouterView>
    <!-- <AdVue class="fixed bottom-8 right-2 z-30 my-2" /> -->
    <FooterVue class="mt-auto" />
  </div>
</template>

<style>
</style>
