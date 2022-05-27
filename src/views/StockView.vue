<template>
  <div class="flex flex-col justify-start items-center">
    <!-- 上方button -->
    <div class="flex flex-row justify-between w-full fixed z-10 m-10">
      <button
        @click="toggleInvestStatus = !toggleInvestStatus"
        class="
          fixed
          left-0
          px-6
          py-2
          text-sm
          transition-colors
          rounded rounded-full
          shadow-xl
          bg-slate-500
          hover:bg-slate-600
          text-slate-100
          shadow-slate-400
          duration-500
        "
        :class="{ '-translate-x-24': toggleInvestStatus }"
      >
        法人買賣超<font-awesome-icon icon="list" class="mx-2" />
      </button>
      <button
        @click="toggleTechStatus = !toggleTechStatus"
        class="
          fixed
          right-0
          px-6
          py-2
          text-sm
          transition-colors
          rounded rounded-full
          shadow-xl
          bg-slate-500
          hover:bg-slate-600
          text-slate-100
          shadow-slate-400
          duration-700
        "
        :class="{ 'translate-x-20': toggleTechStatus }"
      >
        <font-awesome-icon icon="list" class="mx-2" /> <p class="inline">技術分析</p>
      </button>
    </div>
    <!-- 左方選單List -->
    <div
      class="
        flex flex-col
        justify-center
        items-start
        bg-slate-300
        opacity-90
        fixed
        left-0
        z-10
        my-20
        p-4
        rounded-md
        duration-500
      "
      :class="{ '-translate-x-full': toggleInvestStatus }"
    >
      <button
        @click="getInvestSheetData(content.key)"
        class="rounded-md border border-gray-500 p-2 mb-1"
        v-for="content in buttonContent"
        :key="content.key"
      >
        <font-awesome-icon
          icon="arrow-trend-up"
          v-if="selectedButton === content.key"
          style="color: red"
          class="mr-2"
        />
        <span
          class="inline"
          :class="{
            'underline underline-offset-2 text-red-600':
              selectedButton === content.key,
          }"
        >
          {{ content.name }}
        </span>
      </button>
    </div>
    <!-- 右方filter list -->
    <div
      class="fixed right-0 my-20 z-10 duration-500 opacity-90"
      :class="{ 'translate-x-full': toggleTechStatus }"
    >
      <StockFilterListVue
        :techList="techList"
        @postFilterCondition="updateFilterCondition"
      />
    </div>
    <!-- 主要內容table -->
    <div
      class="
        flex flex-row
        justify-center
        items-start
        w-full
        sm:flex-col sm:items-center
        mt-8
        sm:mt-40
      "
    >
      <StockInvestDBTableVue
        :investData="buy_page_list"
        title="買超"
        :conditionStatus="conditionStatus"
        @openModal="troggleModalF"
        class="sm:mt-2"
      />
      <StockInvestDBTableVue
        :investData="sell_page_list"
        title="賣超"
        :conditionStatus="conditionStatus"
        @openModal="troggleModalF"
        class="sm:mt-2"
      />
    </div>
    <!-- 跳窗 -->
    <div class="fixed top-50 z-30" v-if="modalStatus">
      <StockModalLink
        @closeModal="troggleModalF"
        :propsToModal="propsToModal"
        :linkWeb="linkWeb"
      />
    </div>
    <div class="fixed sm:left-2 sm:bottom-10 sm:visible md:visible invisible">
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
        {{ listName.name }}
      </span>
    </div>
  </div>
  <div
    v-if="modalStatus"
    class="fixed h-full w-full bg-gray-900/70 bg-cover z-20"
  ></div>
</template>
<script>
import StockInvestDBTableVue from '../components/Stock/StockInvestDBTable.vue'
import StockFilterListVue from '../components/Stock/StockFilterList.vue'
import StockModalLink from '../components/Stock/StockModalLink.vue'
import { ref, getCurrentInstance, onMounted, computed } from 'vue'
import useGetTechSheet from '@/stores/getTechSheet'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowTrendUp, faList } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowTrendUp, faList)
export default {
  components: {
    StockInvestDBTableVue,
    StockFilterListVue,
    StockModalLink,
  },
  setup() {
    // 設定 proxy
    const { proxy } = getCurrentInstance()
    const investAllData = proxy.axios.get(
      `${proxy.envURL}/stockApi/sheetData/invest`
    )
    // 讓 pinia 先去跑google sheets 來拿到資料
    const useGetTech = useGetTechSheet()
    onMounted(async () => {
      await useGetTech.getSheetData()
    })

    /**
     * @description 設定api 與 template 連結
     * @param {*} investType
     */
    let buy_page_list = ref([])
    let sell_page_list = ref([])
    let selectedButton = ref('')
    let listName = ref('')
    const getInvestSheetData = async function (investType) {
      try {
        console.log('', 123)
        listName.value = buttonContent.value.find(
          (data) => data.key === investType
        )
        if (investType === 'localForeign_same') {
          selectedButton.value = investType
          composeSameArray()
          return
        }
        // 法人一日買賣超的api請求
        const { data } = await investAllData
        selectedButton.value = investType
        buy_page_list.value = composeBaseBuySell(
          data[`${investType}`][`${investType}_buy_no`],
          data[`${investType}`][`${investType}_buy_code`],
          data[`${investType}`][`${investType}_buy_name`]
        )
        sell_page_list.value = composeBaseBuySell(
          data[`${investType}`][`${investType}_sell_no`],
          data[`${investType}`][`${investType}_sell_code`],
          data[`${investType}`][`${investType}_sell_name`]
        )
      } catch (error) {
        console.error(error)
      }
    }

    /**
     * @description 組成買進 or 賣出的陣列
     * @param {*} no 名次
     * @param {*} code 代號
     * @param {*} name 名稱
     */
    function composeBaseBuySell(no, code, name) {
      const result = []
      for (let i = 0, len = name.length; i < len; i++) {
        result.push({
          no: no[i],
          code: code[i].replace('code-', ''),
          name: name[i],
          tech: setTech(name[i]),
        })
      }
      return result
    }
    /**
     * @description 把一堆技術指標塞入買超賣超的tech陣列
     * @param {*} name
     */
    const setTech = function (name) {
      const techResult = []
      const kd_goldSet = new Set(useGetTech.kd_gold)
      const kd_deathSet = new Set(useGetTech.kd_death)
      const macd_goldSet = new Set(useGetTech.macd_gold)
      const macd_deathSet = new Set(useGetTech.macd_death)
      const avg_goldSet = new Set(useGetTech.avg_gold)
      const avg_deathSet = new Set(useGetTech.avg_death)
      const local_c_buySet = new Set(useGetTech.local_c_buy)
      const local_c_sellSet = new Set(useGetTech.local_c_sell)
      const foreign_c_buySet = new Set(useGetTech.foreign_c_buy)
      const foreign_c_sellSet = new Set(useGetTech.foreign_c_sell)

      if (kd_goldSet.has(name)) {
        techResult.push('kd_gold')
      }
      if (kd_deathSet.has(name)) {
        techResult.push('kd_death')
      }
      if (macd_goldSet.has(name)) {
        techResult.push('macd_gold')
      }
      if (macd_deathSet.has(name)) {
        techResult.push('macd_death')
      }
      if (avg_goldSet.has(name)) {
        techResult.push('avg_gold')
      }
      if (avg_deathSet.has(name)) {
        techResult.push('avg_death')
      }
      if (local_c_buySet.has(name)) {
        techResult.push('local_buy')
      }
      if (local_c_sellSet.has(name)) {
        techResult.push('local_sell')
      }
      if (foreign_c_buySet.has(name)) {
        techResult.push('foreign_buy')
      }
      if (foreign_c_sellSet.has(name)) {
        techResult.push('foreign_sell')
      }
      return techResult
    }
    /**
     * @description 要傳進去filter Component的資料
     */
    const techList = [
      {
        name: 'KD 黃金交叉',
        key: 'kd_gold',
      },
      {
        name: 'KD 死亡交叉',
        key: 'kd_death',
      },
      {
        name: 'MACD 黃金交叉',
        key: 'macd_gold',
      },
      {
        name: 'MACD 死亡交叉',
        key: 'macd_death',
      },
      {
        name: '均線多頭排列',
        key: 'avg_gold',
      },
      {
        name: '均線空頭排列',
        key: 'avg_death',
      },
      {
        name: '投信連續買超個股',
        key: 'local_buy',
      },
      {
        name: '投信連續賣超個股',
        key: 'local_sell',
      },
      {
        name: '外資連續買超個股',
        key: 'foreign_buy',
      },
      {
        name: '外資連續賣超個股',
        key: 'foreign_sell',
      },
    ]
    /**
     * @description 接收 emit 資料 並將其塞入condition array
     */
    const conditionStatus = ref([])
    const updateFilterCondition = function (result) {
      conditionStatus.value = result.value
    }
    /**
     * @description 接收子組件上來的資料，並且開啟/關閉視窗
     * @param {*} data
     */
    let modalStatus = ref(false)
    let propsToModal = ref({})
    const troggleModalF = function (emitFromTableData) {
      propsToModal.value = emitFromTableData
      modalStatus.value = emitFromTableData.name.length > 0 ? true : false
    }
    /**
     * @description 設定連結的web
     */
    let linkWeb = ref([])
    linkWeb.value = [
      {
        name: 'yahoo Stock',
        frontHref: 'https://tw.stock.yahoo.com/quote/',
        backHref: '',
      },
      {
        name: '玩股網',
        frontHref: 'https://www.wantgoo.com/stock/',
        backHref: '',
      },
      {
        name: 'Hi Stock 嗨投資',
        frontHref: 'https://histock.tw/stock/',
        backHref: '',
      },
      {
        name: 'PC Home 股市',
        frontHref: 'https://stock.pchome.com.tw/stock/sid',
        backHref: '.html',
      },
      {
        name: 'Goodinfo! 台灣股市資訊網',
        frontHref: 'https://goodinfo.tw/tw/StockDetail.asp?STOCK_ID=',
        backHref: '',
      },
      {
        name: 'anue 鉅亨網',
        frontHref: 'https://invest.cnyes.com/twstock/TWS/',
        backHref: '',
      },
      {
        name: '台灣證券交易所',
        frontHref: 'https://mis.twse.com.tw/stock/fibest.jsp?stock=',
        backHref: '',
      },
      {
        name: '股市爆料同學會',
        frontHref: 'https://www.cmoney.tw/forum/stock/',
        backHref: '',
      },
    ]
    /**
     * @description 上方button的資料
     */
    let buttonContent = ref([])
    buttonContent.value = [
      {
        name: '上市投信買賣超',
        key: 'local_listed',
      },
      {
        name: '上櫃投信買賣超',
        key: 'local_otc',
      },
      {
        name: '上市外資買賣超',
        key: 'foreign_listed',
      },
      {
        name: '上櫃外資買賣超',
        key: 'foreign_otc',
      },
      {
        name: '外資投信同步買賣超',
        key: 'localForeign_same',
      },
    ]
    /**
     * 組成上市外資投信同買資料
     */
    const composeSameArray = async function () {
      const { data } = await investAllData

      const buyRes = concatArr(
        [
          data['local_listed'],
          data['local_otc'],
          data['foreign_listed'],
          data['foreign_otc'],
        ],
        'buy'
      )
      const sellRes = concatArr(
        [
          data['local_listed'],
          data['local_otc'],
          data['foreign_listed'],
          data['foreign_otc'],
        ],
        'sell'
      )
      buy_page_list.value = composeBaseBuySell(
        buyRes.no,
        buyRes.code,
        buyRes.name
      )
      sell_page_list.value = composeBaseBuySell(
        sellRes.no,
        sellRes.code,
        sellRes.name
      )
    }
    const concatArr = function (arrList, type) {
      let name = []
      let code = []
      let no = []
      for (let i = 0, len = arrList.length; i < len; i++) {
        name.push(...arrList[i][`${arrList[i].type}_${type}_name`])
        code.push(...arrList[i][`${arrList[i].type}_${type}_code`])
      }
      name = name.filter((item, index) => name.indexOf(item) !== index)
      code = code.filter((item, index) => code.indexOf(item) !== index)
      no = name.map((index) => no.push(index))

      return {
        name,
        code,
        no,
      }
    }
    /**
     * @description 切換選單進入or移出
     */
    console.log(window.innerWidth)
    let toggleInvestStatus = ref(window.innerWidth < 1200 ? true : false)
    let toggleTechStatus = ref(window.innerWidth < 1200 ? true : false)
    return {
      getInvestSheetData, // 取得法人買賣超資料（打api
      updateFilterCondition, // 更新使用者選到的指標function
      troggleModalF, // emit上來的function，目的是用於開啟關閉視窗
      composeSameArray, // 用來測試api資料
      toggleInvestStatus, // 切換法人買賣超出現與否的參數
      toggleTechStatus, // 切換技術分析出現與否的參數
      conditionStatus, // client選擇到的技術分析指標
      buy_page_list, // 法人買超資料
      sell_page_list, // 法人賣超資料
      techList, // 我寫程式者定義的技術分析陣列
      modalStatus, // modal的開啟狀況
      propsToModal, // 給modal的資料
      linkWeb, // 給modal的連結資料
      buttonContent, // 上方 button的資料
      listName, // 左方list 的名稱
      selectedButton, // 點選到的button
    }
  },
}
</script>
