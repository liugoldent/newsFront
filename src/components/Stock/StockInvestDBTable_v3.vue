<template>
  <div id="accordion-open" data-accordion="open" class="mx-4 w-1/3">
    <!-- main content -->
    <div class="m-2" v-for="data in chi_investData" :key="data.name">
      <!-- title -->
      <div id="accordion-open-heading-1">
        <button
          type="button"
          class="
            flex
            justify-between
            items-center
            p-5
            w-full
            font-medium
            text-left text-gray-400
            rounded-t-xl
            border border-b-0 border-gray-400
          "
          data-accordion-target="#accordion-open-body-1"
          aria-expanded="true"
          aria-controls="accordion-open-body-1"
        >
          <div class="flex flex-row">
            <p class="text-black mx-4 font-bold">{{ data.no }}</p>
            <p class="text-gray-500 mx-4">{{ data.code }}</p>
            <p class="text-gray-500 mx-4 underline underline-offset-4">
              {{ data.name }}
            </p>
          </div>
          <svg
            data-accordion-icon
            class="w-6 h-6 rotate-180 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <!-- content -->
      <div
        id="accordion-open-body-1"
        class="open w-full"
        aria-labelledby="accordion-open-heading-1"
      >
        <div class="p-2 border border-gray-400">
          <ul class="p-2 h-20 flex flex-row justify-center items-center">
            <li
              v-for="(techData, index) in data.tech"
              :key="index"
              class="inline mx-2"
            >
              {{ techData }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'
export default {
  name: 'StockInvestDBTable',
  // 子組件通過 props 來接收
  props: ['investData'],
  setup(props) {
    // 從父組件拿到的資料
    const chi_investData = computed(() => props.investData)
    return {
      chi_investData,
    }
  },
}
</script>
