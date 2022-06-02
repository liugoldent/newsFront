<template>
  <div class="flex flex-col justify-center items-center m-10">
    <div
      v-for="(eachData, index) in onViewData"
      :key="index"
      class="w-4/5 m-6 h-max"
    >
      <div class="flex flex-col justify-start items-start">
        <div class="flex flex-row justify-start items-end">
          <p
            class="
              text-6xl
              inline
              mb-4
              decoration-4
              text-right
              underline underline-offset-4
            "
          >
            {{ listIndex[index] }}
          </p>

          <p
            class="text-xl inline mx-4 relative bottom-2"
            v-if="eachData.time.length > 0"
          >
            {{ eachData.time }}
          </p>
          <p
            class="text-xl inline mx-2 relative bottom-2"
            v-if="eachData.from.length > 0"
          >
            {{ eachData.from }}
          </p>
        </div>
        <h1 class="text-4xl inline mb-2">
          <a :href="eachData.href">{{ eachData.title }}</a>
        </h1>
        <p class="text-xl inline" v-if="eachData.subtitle.length > 0">
          {{ eachData.subtitle }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'
export default {
  props: ['newsData'],
  setup(props) {
    const onViewData = computed(() => {
      console.log(props.newsData)
      return props.newsData
    })
    const listIndex = computed(() => {
      let listResult = []
      for (let i = 1, len = props.newsData.length; i <= len; i++) {
        if (i < 10) {
          listResult.push(`0${i}`)
        } else {
          listResult.push(i)
        }
      }
      return listResult
    })
    return {
      onViewData,
      listIndex,
    }
  },
}
</script>
