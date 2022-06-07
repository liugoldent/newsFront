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
            :class="textColor700Array[index]"
          >
            {{ listIndex[index] }}
          </p>
          <div
            class="sm:flex sm:flex-col sm:items-start sm:justify-center mx-1"
          >
            <div class="flex flex-row justify-start items-center mx-2">
              <font-awesome-icon
                v-if="eachData.time.length > 0"
                icon="clock-rotate-left"
                class="relative bottom-2"
                :class="textColor600Array[index]"
              />
              <p
                class="text-xl inline mx-2 relative bottom-2"
                v-if="eachData.time.length > 0"
                :class="textColor600Array[index]"
              >
                {{ eachData.time }}
              </p>
            </div>
            <div class="flex flex-row justify-start items-center mx-2">
              <font-awesome-icon
                v-if="eachData.time.length > 0"
                icon="angles-right"
                class="relative bottom-2"
                :class="textColor600Array[index]"
              />
              <p
                class="text-xl inline mx-2 relative bottom-2 sm:mx-4"
                v-if="eachData.from.length > 0"
                :class="textColor600Array[index]"
              >
                {{ eachData.from }}
              </p>
            </div>
          </div>
        </div>
        <h1 class="text-4xl inline mb-2">
          <a :href="eachData.href">{{ eachData.title }}</a>
        </h1>
        <p
          class="text-xl inline my-1"
          v-for="(subtitleText, index) in eachData.subtitle"
          :key="index"
        >
          {{ subtitleText }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'
import { series700, series600 } from '../../public/color'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faClockRotateLeft,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons'

library.add(faClockRotateLeft, faAnglesRight)
export default {
  props: ['newsData'],
  setup(props) {
    let textColor700Array = series700.textColor
    let textColor600Array = series600.textColor
    for (let i = 0, len = 2; i < len; i++) {
      textColor700Array = textColor700Array.concat(textColor700Array)
      textColor600Array = textColor600Array.concat(textColor600Array)
    }
    const onViewData = computed(() => {
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
      onViewData, // 在畫面上的資料
      listIndex, // 列表index
      textColor600Array, // 顏色600陣列
      textColor700Array, // 顏色600陣列
    }
  },
}
</script>
