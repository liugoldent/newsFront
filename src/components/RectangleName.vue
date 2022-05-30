<template>
  <span
    class="
      absolute
      inset-0
      w-full
      h-full
      transition
      duration-300
      ease-out
      transform
      translate-x-1 translate-y-1
      bg-red-700
      group-hover:-translate-x-0 group-hover:-translate-y-0
    "
  ></span>
  <span
    class="
      absolute
      inset-0
      w-full
      h-full
      bg-white
      border-2 border-red-700
      group-hover:bg-red-700
    "
  ></span>
  <span class="relative text-red-700 group-hover:text-red-100 p-5 text-xl">
    {{ titleName }}
  </span>
</template>
<script>
export default {
  props: ['titleName'],
}
</script>

