<template>
  <header class="p-4 rounded-lg shadow md:px-6 md:py-8 w-full">
    <div class="flex items-center justify-end h-10">
      <ul class="flex flex-wrap items-center text-sm text-gray-500">
        <li>
          <router-link to="/">
            <a class="mr-4 hover:underline md:mr-6">Home/</a>
          </router-link>
        </li>
        <li>
          <router-link to="/stock">
            <a class="mr-4 hover:underline md:mr-6">一日法人買賣超/</a>
          </router-link>
        </li>
        <li>
          <router-link to="/news">
            <a class="mr-4 hover:underline md:mr-6">財經新聞/</a>
          </router-link>
        </li>
        <!-- <li>
          <router-link to="/filterStock"
            ><a class="mr-4 hover:underline md:mr-6">每日選股/</a></router-link
          >
        </li> -->
        <!-- <li>
          <router-link to="/igView"
            ><a class="mr-4 hover:underline md:mr-6">Ig 貼文/</a></router-link
          >
        </li> -->
      </ul>
    </div>
  </header>
</template>
<script>
</script>
