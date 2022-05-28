<template>
  <div class="flex flex-col justify-start items-end bg-slate-300 rounded-md p-2 sm:overflow-y-auto sm:h-96">
    <button
      v-for="data in chi_techList"
      :key="data.name"
      class="p-2"
      @click="conditionalSelection(data.key)"
    >
      <span
        :class="[selectedBgClass(data.key), commonClass()]"
        class="ease-in-out duration-500 border-gray-500"
        >{{ data.name }}</span
      >
    </button>
    <div class="flex flex-row justify-start iemts-center">
      <button class="p-2" @click="cancelAll()"><span :class="commonClass()">取消選取</span></button>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'StockFilterList',
  // 子組件通過 props 來接收
  props: ['techList'],
  setup(props, { emit }) {
    const chi_techList = props.techList
    /**
     * @description 將要filter的條件傳入陣列
     */
    const conditionStatus = ref([])
    const conditionalSelection = function (condition) {
      if (conditionStatus.value.includes(condition)) {
        conditionStatus.value = conditionStatus.value.filter(
          (data) => data !== condition
        )
      } else {
        conditionStatus.value.push(condition)
      }
      emit('postFilterCondition', conditionStatus)
    }
    /**
     * @description 取消所有選取
     */
    const cancelAll = function () {
      conditionStatus.value = []
      emit('postFilterCondition', conditionStatus)
    }
    /**
     * @description 改變選取到的分析的背景色
     * @param {} key
     */
    const selectedBgClass = function (key) {
      return {
        'bg-red-400': conditionStatus.value.includes(key),
      }
    }
    const commonClass = function () {
      return ['p-2', 'border', 'rounded-md']
    }
    return {
      chi_techList,
      conditionStatus,
      commonClass,
      conditionalSelection,
      cancelAll,
      selectedBgClass,
    }
  },
}
</script>
