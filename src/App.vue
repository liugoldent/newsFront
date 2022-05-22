<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HomeViewVue from './views/HomeView.vue'
import HeaderVue from './components/Header.vue'
import FooterVue from './components/Footer.vue'
</script>

<template>
  <div class="flex flex-col justify-between h-screen">
    <HeaderVue />
    <RouterView> </RouterView>
    <FooterVue class="mt-auto" />
  </div>
</template>

<style>
</style>
