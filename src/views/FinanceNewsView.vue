<template>
  <div class="flex flex-col justify-start items-center w-full">
    <div class="flex flex-col fixed right-0">
      <button
        @click="selectNewsName(eachKey)"
        v-for="eachKey in Object.keys(webType)"
        :key="eachKey"
        class="m-2"
      >
        {{ webType[eachKey].name }}
      </button>
    </div>
    <StockNewsListVue :newsData="newsListInChild" />
    <!-- 顯示新聞的名稱 -->
    <div class="fixed left-2 sm:visible md:visible invisible">
      <RectangleNameVue :titleName="name" />
    </div>
    <!-- 捲軸到頂端 -->
    <ScrollTopButton />
  </div>
</template>
<script>
import { getCurrentInstance, onMounted, reactive, ref } from 'vue'
import StockNewsListVue from '../components/Stock/StockNewsList.vue'
import ScrollTopButton from '../components/ScrollTopButton.vue'
import RectangleNameVue from '../components/RectangleName.vue'
export default {
  components: {
    StockNewsListVue,
    ScrollTopButton,
    RectangleNameVue,
  },
  setup() {
    const { proxy } = getCurrentInstance()
    const financeNews = proxy.axios.get(
      `${proxy.envURL}/stockApi/sheetData/financeNews`
    )
    const pttStockAllData = proxy.axios.get(
      `${proxy.envURL}/pttApi/pttarticlelist`
    )
    let financeNewsSheetData = reactive({
      yahooInternational: [],
      yahooTwStock: [],
      yahooHot: [],
      anueNews: [],
    })
    const webType = {
      yahooInternational: {
        name: 'yahoo 國際財經',
        source: 'yahoo',
      },
      yahooTwStock: {
        name: 'yahoo 台股盤勢',
        source: 'yahoo',
      },
      yahooHot: {
        name: 'yahoo 熱門文章',
        source: 'yahoo',
      },
      anueNews: {
        name: '鉅亨網 - 最新新聞',
        source: '鉅亨網',
      },
    }
    onMounted(async () => {
      await devideFinanceData()
      selectNewsName('yahooInternational')
    })
    /**
     * @description 取回sheets內的資料
     */
    const devideFinanceData = async function () {
      const financeSheetData = await financeNews
      const sheetNameKey = Object.keys(financeNewsSheetData)
      const { data } = financeSheetData
      for (let i = 0, len = sheetNameKey.length; i < len; i++) {
        financeNewsSheetData[sheetNameKey[i]] = composeViewData(
          data[sheetNameKey[i]],
          sheetNameKey[i]
        )
      }
    }
    /**
     * @description 組成畫面上的資料
     * @param {*} rawSheetData
     * @param {*} type 是哪個財經網來的
     */
    const composeViewData = function (rawSheetData, type) {
      let result = []
      for (let i = 0, len = rawSheetData.title.length; i < len; i++) {
        const fromStr = rawSheetData.from[i] || '' // 新聞來源為何
        const timeStr = rawSheetData.time[i].replace('t-', '') || '' // 時間為何
        if (type === 'anueNews') {
          const allReplaceString = `${timeStr}${fromStr}` // 要取代掉的字為何（因應鉅亨網標題不同，所以先組出replace string）
          const baseHref = 'https://news.cnyes.com/news/id/'
          const idNumber = rawSheetData.href[i].match(/\d+/g).join()
          rawSheetData.title[i] = rawSheetData.title[i].replace(
            allReplaceString,
            ''
          ) // 取代之後的title為何
          rawSheetData.href[i] = `${baseHref}${idNumber}` // 最後鉅亨的href為何
        }
        result.push({
          title: rawSheetData.title[i],
          href: rawSheetData.href[i],
          subtitle: separateSubTitle(rawSheetData.subtitle[i]),
          time: timeStr,
          from: fromStr,
          webName: webType[type].name,
          source: webType[type].source,
        })
      }
      return result
    }
    const separateSubTitle = function (subtitle) {
      if (subtitle !== undefined) {
        return subtitle.split('。')
      } else {
        return []
      }
    }
    /**
     * @description 點選按鈕改變news list 內容
     */
    let name = ref('')
    let newsListInChild = ref([])
    const selectNewsName = function (inputName) {
      name.value = webType[inputName].name
      newsListInChild.value = financeNewsSheetData[inputName]
    }
    return {
      financeNewsSheetData, // 爬出來的財經資料
      selectNewsName, //選到哪個新聞的名稱
      name, // 點完之後要顯示在畫面上的資料
      webType, // 所有的新聞網站
      newsListInChild, // 要送給子component的資料
    }
  },
}
</script>
