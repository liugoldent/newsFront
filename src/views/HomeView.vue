<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HomeCardVue from '../components/HomeCard.vue'
</script>

<template>
  <div class="flex flex-wrap flex-col place-content-center h-max">
    <div class="text-center m-8">
      <h1 class="text-9xl font-Monoton">News</h1>
    </div>
    <div class="flex flex-row flex-wrap justify-center items-center m-8 h-auto">
      <router-link to="/stock"><HomeCardVue /></router-link>
      <router-link to="/trend"><HomeCardVue /></router-link>
      <HomeCardVue />
      <HomeCardVue />
      <HomeCardVue />
      <HomeCardVue />
      <HomeCardVue />
      <HomeCardVue />
      <HomeCardVue />
      <HomeCardVue />
      <HomeCardVue />
    </div>
  </div>
</template>

