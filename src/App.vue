<script setup>
import { RouterLink, RouterView } from 'vue-router'

import HomeViewVue from './views/HomeView.vue'
import HeaderVue from './components/Header.vue'
import FooterVue from './components/Footer.vue'
</script>

<template>
  <div class="flex flex-col h-screen justify-between">
    <HeaderVue />
    <RouterView> </RouterView>
    <FooterVue />
  </div>
</template>

<style>
</style>
