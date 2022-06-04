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
    class="absolute inset-0 w-full h-full bg-white border-2"
    :class="[`border-${color}`]"
  ></span>
  <span
    class="relative group-hover:text-red-100 p-5 text-xl"
    :class="textClass"
  >
    {{ titleName }}
  </span>
  <button class="relative left-10" @click="test">12222</button>
</template>
<script>
import { onMounted, ref, onBeforeMount, nextTick } from 'vue'
export default {
  props: ['titleName', 'color'],
  setup(props) {
    console.log(props.color)
    let colorArr = ['purple-700']
    const composeShapeClass = function (color) {
      return [`border-${color}`, `group-hover:bg-${color}`]
    }
    const composeTextClass = function (color) {
      return `text-${color}`
    }
    let shapeClass = ref('')
    let textClass = ref('')
    // onBeforeMount(() => {
    //   shapeClass.value = composeShapeClass(colorArr[0])
    //   textClass.value = composeTextClass(colorArr[0])
    // })
    const test = async function () {
      // shapeClass.value = composeShapeClass(colorArr[0])
      textClass.value = composeTextClass(colorArr[0])
    }
    onMounted(() => {
      shapeClass.value = composeShapeClass(colorArr[0])
      textClass.value = composeTextClass(colorArr[0])
    })
    return {
      shapeClass,
      textClass,
      test,
    }
  },
}
</script>

