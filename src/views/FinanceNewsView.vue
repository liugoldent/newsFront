<template>
  <div class="flex flex-col justify-start items-center w-full">
    <div
      class="flex flex-row justify-center items-center fixed right-0 z-30"
      :class="{
        'z-0': loadingStatus,
      }"
    >
      <font-awesome-icon
        icon="circle-arrow-left"
        class="
          text-3xl
          cursor-pointer
          relative
          -right-8
          z-20
          duration-500
          rounded-full
          bg-red-100
        "
        :class="{
          'rotate-180 ': !toggleNewsWeb,
          'translate-x-44': toggleNewsWeb,
        }"
        @click="toggleNewsWeb = !toggleNewsWeb"
        v-if="!loadingStatus"
      />
      <div
        class="
          flex flex-row
          justify-end
          items-center
          m-4
          bg-slate-400
          z-10
          rounded
          opacity-90
          w-48
          duration-500
        "
        :class="{ 'translate-x-44': toggleNewsWeb }"
      >
        <div class="flex flex-col items-end">
          <button
            @click="selectNewsName(eachKey)"
            v-for="eachKey in Object.keys(webType)"
            :key="eachKey"
            class="m-2"
          >
            <font-awesome-icon
              v-if="eachKey === thisTimeSelectKey"
              icon="newspaper"
              class="mx-3"
            />
            <router-link :to="`/financeNews/${eachKey}`">
              <p
                class="inline"
                :class="{
                  'underline underline-offset-4': eachKey === thisTimeSelectKey,
                }"
              >
                {{ webType[eachKey].name }}
              </p>
            </router-link>
          </button>
        </div>
      </div>
    </div>
    <router-view :newsData="newsListInChild"></router-view>
    <!-- 顯示新聞的名稱 -->
    <div class="fixed left-2 sm:visible md:visible invisible">
      <RectangleNameVue :titleName="titleName" :titleHref="titleHref" />
    </div>
    <!-- 捲軸到頂端 -->
    <ScrollTopButton />
  </div>
  <loading-view :loadingStatus="loadingStatus" />
</template>
<script>
import {
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  inject,
  watch,
} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import StockNewsListVue from '../components/Stock/StockNewsList.vue'
import ScrollTopButton from '../components/ScrollTopButton.vue'
import RectangleNameVue from '../components/RectangleName.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faNewspaper,
  faCircleArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
library.add(faNewspaper, faCircleArrowLeft)

export default {
  components: {
    StockNewsListVue,
    ScrollTopButton,
    RectangleNameVue,
  },
  setup() {
    const { proxy } = getCurrentInstance()
    const router = useRouter()
    const route = useRoute()
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
        link: 'https://tw.stock.yahoo.com/intl-markets',
      },
      yahooTwStock: {
        name: 'yahoo 台股盤勢',
        source: 'yahoo',
        link: 'https://tw.stock.yahoo.com/tw-market',
      },
      yahooHot: {
        name: 'yahoo 熱門文章',
        source: 'yahoo',
        link: 'https://tw.stock.yahoo.com/news/',
      },
      anueNews: {
        name: '鉅亨 - 最新新聞',
        source: '鉅亨網',
        link: 'https://news.cnyes.com/news/cat/headline',
      },
      pttStock: {
        name: ' ptt -  Stock 版',
        source: 'ptt股版',
        link: 'https://www.ptt.cc/bbs/Stock/index.html',
      },
    }
    let loadingStatus = ref(true)
    onMounted(async () => {
      loadingStatus.value = true
      await devideFinanceData()
      selectNewsName('yahooInternational')
      router.push({
        path: '/financeNews/yahooInternational',
      })
      loadingStatus.value = false
    })
    watch(
      () => route.path,
      () => {
        const objKey = Object.keys(webType)
        let routeKey = ''
        for (let i = 0, len = objKey.length; i < len; i++) {
          if (route.path.match(objKey[i])) {
            routeKey = objKey[i]
          }
        }
        selectNewsName(routeKey)
      }
    )
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
    let titleName = ref('')
    let titleHref = ref('')
    let thisTimeSelectKey = ref('')
    let newsListInChild = ref([])
    const selectNewsName = async function (inputName) {
      thisTimeSelectKey.value = inputName
      titleName.value = webType[inputName].name
      titleHref.value = webType[inputName].link
      if (inputName.length > 0 && !inputName.includes('ptt')) {
        newsListInChild.value = financeNewsSheetData[inputName]
      }
      if (inputName.length > 0 && inputName.includes('ptt')) {
        newsListInChild.value = await setPttView(inputName)
      }
    }
    /**
     * 組成ptt在View上的格式
     * @param {} inputName 此網站名稱為何
     */
    const setPttView = async function (inputName) {
      const pttResult = await pttStockAllData
      let result = []
      if (pttResult.status === 200) {
        const { crawData } = pttResult.data
        for (let i = 0, len = crawData.length; i < len; i++) {
          result.push({
            title: crawData[i].title,
            href: `https://www.ptt.cc${crawData[i].link}`,
            subtitle: '',
            time: crawData[i].date,
            from: `熱度：${crawData[i].pushCount}`,
            webName: webType[inputName].name,
            source: webType[inputName].source,
          })
        }
        return result
      }
    }
    /**
     * @description 開啟關閉新聞網
     * @param {} param0
     */
    let toggleNewsWeb = ref(window.innerWidth < 1200 ? true : false)
    /**
     * @description 要給子component的顏色
     */
    const rectangleColor = inject('rectangleColor')

    return {
      financeNewsSheetData, // 爬出來的財經資料
      selectNewsName, //選到哪個新聞的名稱
      titleName, // 點完之後要顯示在畫面上的名稱
      titleHref, // 點完之後要顯示在畫面左上角的連結
      webType, // 所有的新聞網站
      newsListInChild, // 要送給子component的資料
      thisTimeSelectKey, // 這次點選到的網站
      toggleNewsWeb, // 切換開啟關閉的參數
      loadingStatus, // loading 視窗
      rectangleColor, // 給左上角方形title的顏色
    }
  },
}
</script>
