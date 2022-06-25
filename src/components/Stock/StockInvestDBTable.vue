<template>
  <div class="mx-10 relative overflow-x-auto shadow-md sm:rounded-lg border sm:w-full">
    <div class="p-2 bg-gray-900 h-auto w-auto">
      <p class="text-center text-xl text-gray-50">{{ title }}</p>
    </div>
    <table
      class="text-sm text-left text-gray-500 dark:text-gray-400 table-auto"
    >
      <thead
        class="
          text-xs text-gray-700
          uppercase
          bg-gray-50
          dark:bg-gray-700 dark:text-gray-400
        "
      >
        <tr>
          <th scope="col" class="px-6 py-3 text-center">排名</th>
          <th scope="col" class="px-6 py-3 text-center">代號</th>
          <th scope="col" class="px-6 py-3 text-center w-56">名稱</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="
            border-b
            dark:bg-gray-800 dark:border-gray-700
            text-center
            cursor-pointer
            hover:bg-sky-200
            ease-in-out
            duration-500
          "
          v-for="eachData in chi_investData"
          @click="emit('openModal', eachData)"
          :key="eachData.name"
        >
          <th
            scope="row"
            class="
              px-10
              py-4
              font-medium
              text-gray-900
              dark:text-white
              whitespace-nowrap
            "
          >
            {{ eachData.no || '' }}
          </th>
          <td class="px-10 py-4">{{ eachData.code || '' }}</td>
          <td class="px-10 py-4">{{ eachData.name || '' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { computed } from 'vue'
export default {
  name: 'StockInvestDBTable',
  // 子組件通過 props 來接收
  props: ['investData', 'conditionStatus', 'title'],
  setup(props, { emit }) {
    // 從父組件拿到的資料
    const chi_investData = computed(() => {
      return props.investData.filter((data) => {
        const techSet = new Set(data.tech)
        const conditionSet = new Set(props.conditionStatus)
        const intersection = getIntersection(techSet, conditionSet)
        if (
          intersection.size === conditionSet.size ||
          conditionSet.size === 0
        ) {
          return data
        }
      })
    })

    const getIntersection = function (setA, setB) {
      const intersection = new Set(
        [...setA].filter((element) => setB.has(element))
      )
      return intersection
    }
    return {
      chi_investData,
      emit,
    }
  },
}
</script>
