<template>
  <main class="flex flex-col justify-center items-center w-full">
    <div
      class="
        flex flex-col
        justify-start
        items-start
        h-64
        md:h-72
        sm:h-72
        duration-500
        m-28
        -ml-6
        md:m-20
        sm:m-6
        border-b-4
      "
      :class="[titleCss]"
    >
      <!-- title -->
      <div
        class="
          flex flex-row
          justify-start
          items-center
          md:flex-col
          sm:flex-col
          md:items-start
          sm:items-start
        "
      >
        <h1 class="text-6xl md:text-5xl sm:text-3xl sm:mt-5">選擇。</h1>
        <h1 class="text-6xl text-slate-500 md:text-5xl sm:text-3xl md:mt-5">
          你所喜歡的操作方式。
        </h1>
        <!-- 選擇，你所喜歡的操作方式。 -->
      </div>
      <!-- 警告用語 -->
      <p class="text-sm self-end text-end mt-4 text-slate-600 underline">
        本網站與所推介分析之個別有價證券無不當之財務利益關係，本網站資料僅供參考，投資人應獨立判斷，審慎評估並自負投資風險。
      </p>
      <!-- 選擇button -->
      <div class="flex flex-row justify-center items-center mt-8 self-end w-auto">
        <button @click="stockShow('bull')">
          <div
            class="
              h-auto
              w-auto
              rounded-lg
              flex flex-row
              justify-center
              items-center
              mx-8
              cursor-pointer
            "
            :class="{
              'border-double border-4 duration-500 border-red-400':
                marketType === 'bull',
            }"
          >
            <font-awesome-icon
              icon="arrow-trend-up"
              class="border-none text-4xl text-red-700 m-2 sm:text-2xl"
            />
            <p class="text-4xl m-2 sm:text-2xl">多</p>
          </div>
        </button>
        <p class="text-5xl sm:text-2xl">/</p>
        <button @click="stockShow('bear')">
          <div
            class="
              h-auto
              w-auto
              rounded-lg
              flex flex-row
              justify-center
              items-center
              mx-8
              cursor-pointer
            "
            :class="{
              'border-double border-4 duration-500 border-green-400':
                marketType === 'bear',
            }"
          >
            <p class="text-4xl m-2 sm:text-2xl">空</p>
            <font-awesome-icon
              icon="arrow-trend-down"
              class="border-none text-4xl text-green-700 m-2 sm:text-2xl"
            />
          </div>
        </button>
      </div>
    </div>

    <!-- 內容部分開始 -->
    <div
      v-for="(listKey, outlineIndex) in stockListKey"
      :key="listKey"
      class="w-full duration-500"
    >
      <div
        v-if="stockList[listKey].length > 0"
        class="
          flex flex-col
          justify-start
          items-start
          overflow-auto
          w-full
          snap-x
          scrollbar-hide
          h-auto
        "
      >
        <div
          class="flex flex-row justify-center items-center w-auto appleCenter mx-4"
        >
          <p class="border-none text-4xl mx-1 my-2 sm:text-2xl">{{ outlineIndex + 1 }}</p>
          <p class="w-auto my-4 mx-2 text-5xl sm:text-2xl">
            {{ correspondWord[outlineIndex] }}
          </p>
        </div>
        <div
          class="
            flex flex-row
            justify-start
            items-center
            overflow-auto
            w-full
            snap-x
            scrollbar-hide
            h-auto
          "
        >
          <!-- 卡片開始 -->
          <RecommendStockVue
            v-for="(eachSignalData, cardIndex) in stockList[listKey]"
            :key="cardIndex"
            class="m-4 shrink-0 appleCenter"
            :signalData="eachSignalData"
            :shadowColor="shadowColorArray[outlineIndex]"
          />
        </div>
      </div>
    </div>
  </main>
  <!-- 顯示更新日期與多方空方 -->
  <div class="visible">
    <RectangleNameVue :titleName="titleName" :titleHref="''" />
  </div>
  <!-- 捲軸到頂端 -->
  <ScrollTopButton />
  <loading-view :loadingStatus="loadingStatus" />
</template>
<script>
import { getCurrentInstance, onMounted, ref, reactive, computed } from 'vue'
import { series200 } from '../public/color'
import { getRandom } from '../public/publicFun'
import RecommendStockVue from '../components/Stock/RecommendStock.vue'
import ScrollTopButton from '../components/ScrollTopButton.vue'
import RectangleNameVue from '../components/RectangleName.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowTrendUp,
  faArrowTrendDown
} from '@fortawesome/free-solid-svg-icons'
library.add(faArrowTrendUp, faArrowTrendDown)
export default {
  components: {
    RecommendStockVue,
    ScrollTopButton,
    RectangleNameVue,
  },
  setup() {
    const { proxy } = getCurrentInstance()
    const filterStockApi = proxy.axios.get(
      `${proxy.envURL}/stockApi/sheetData/filterStock`
    )
    let rawFilterStockData = {}
    let eachDataKey = [] // 各個要顯示資料的key值。ex：代號、股票名稱....
    let loadingStatus = ref(true)
    onMounted(async () => {
      loadingStatus.value = true
      const apiResult = await filterStockApi
      if (apiResult.status === 200) {
        rawFilterStockData = apiResult.data
        eachDataKey = Object.keys(rawFilterStockData.listKey)
      }
      loadingStatus.value = false
    })
    let correspondWord = [
      '初出茅廬，趨勢未定',
      '二次訊號，確認籌碼',
      '多多觀察，趨勢已成',
      '等候時機，小心操作',
      '不疾不徐，靜待訊號',
    ]
    /**
     * 組合要show出的股票
     * @param {@} type bear or bull -> 抉擇是熊市還是牛市的股票
     */
    let stockList = reactive({
      signal1: [],
      signal2: [],
      signal3: [],
      signal4: [],
      signal5: [],
    })
    let stockListKey = Object.keys(stockList)
    let marketType = ref('')
    const stockShow = function (type) {
      marketType.value = type
      cardNumber()
      titleNameFunc(type)
      const keyOfStockList = Object.keys(stockList)
      for (let i = 0, len = stockListKey.length; i < len; i++) {
        stockList[`${keyOfStockList[i]}`] = composeListData(
          `${type}_${keyOfStockList[i]}`
        )
      }
    }
    /**
     * @description 組成每個component資料
     * @param {} thisTimeSignal 這次要組成的signal為何。ex：bullSignal1、bullSignal2...
     */
    const composeListData = function (thisTimeSignal) {
      const codeData = rawFilterStockData[thisTimeSignal].code
      let thisSignalAllData = []
      for (let j = 0, lenj = codeData.length; j < lenj; j++) {
        let emptyObject = eachDataKey.reduce(function (
          accumulator,
          currentValue
        ) {
          // 現在跑到的資料為第幾種資料
          const currentData =
            rawFilterStockData[thisTimeSignal][`${currentValue}`]
          // 第幾種資料的第j個
          accumulator[`${currentValue}`] = currentData[j]
          return accumulator
        },
        {})
        thisSignalAllData.push(emptyObject)
      }
      return thisSignalAllData
    }
    /**
     * @description title列的css
     */
    const titleCss = computed(() => {
      return marketType.value.length === 0
        ? 'sm:translate-y-20 md:translate-y-10 translate-y-44'
        : ''
    })
    /**
     * @description 得到card的顏色
     */
    let shadowColorArray = ref([])
    const cardNumber = function () {
      shadowColorArray.value = []
      const number = getRandom(
        1,
        series200.shadowColor.length - stockListKey.length
      )
      for (let i = 0, len = stockListKey.length; i < len; i++) {
        shadowColorArray.value.push(series200.shadowColor[number + i])
      }
    }
    /**
     * @description 製造出title Name
     * @param {} type
     */
    const titleName = ref('')
    const titleNameFunc = function (type) {
      const typeChinese = {
        bear: '做空',
        bull: '做多',
      }
      titleName.value = `${typeChinese[type]}選股：${rawFilterStockData.updateDay}更新`
    }
    return {
      stockShow,
      titleCss, // title列的css
      titleName, // 左上標題的名稱
      shadowColorArray, // card的shadow顏色
      stockList,
      stockListKey,
      correspondWord, // 對應文字
      loadingStatus,
      marketType, //現在是選到做多or做空
    }
  },
}
</script>
<style scoped>
.appleCenter {
  transform: translateX(calc(max(1024px, 100vw) / 2 - 490px));
}
.scrollDisplayNone {
  display: none;
}
</style>
