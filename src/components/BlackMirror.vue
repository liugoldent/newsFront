<template>
   <div
    v-if="mirrorStatus"
    class="fixed h-full w-full bg-gray-900/70 bg-cover z-20"
  ></div>
</template>
<script>
export default {
  props: ['mirrorStatus']
}
</script>
