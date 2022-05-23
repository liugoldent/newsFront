<template>
  <div class="flex flex-col justify-start items-center">
    <!-- 上方button -->
    <div class="flex flex-row justify-center items-center">
      <button
        @click="getInvestSheetData(content.key)"
        class="m-8 rounded-md border border-gray-300 p-2"
        v-for="content in buttonContent"
        :key="content.key"
      >
        <font-awesome-icon
          icon="arrow-trend-up"
          v-if="selectedButton === content.key"
          style="color:red"
          class="mr-2"
        />
        <p
          class="inline"
          :class="{
            'underline underline-offset-2 text-red-600': selectedButton === content.key,
          }"
        >
          {{ content.name }}
        </p>
      </button>
    </div>
    <!-- 左方filter list -->
    <div class="fixed left-0 top-1/4 z-10">
      <StockFilterListVue
        :techList="techList"
        @postFilterCondition="updateFilterCondition"
      />
    </div>
    <!-- 主要內容table -->
    <div class="flex flex-row justify-center items-start w-full">
      <StockInvestDBTableVue
        :investData="buy_page_list"
        :conditionStatus="conditionStatus"
        @openModal="troggleModalF"
      />
      <StockInvestDBTableVue
        :investData="sell_page_list"
        :conditionStatus="conditionStatus"
        @openModal="troggleModalF"
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
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowTrendUp)
export default {
  components: {
    StockInvestDBTableVue,
    StockFilterListVue,
    StockModalLink,
  },
  setup() {
    // 設定API
    const { proxy } = getCurrentInstance()
    const typeSelect = {
      local_listed: proxy.axios.get(
        `${proxy.envURL}/stockApi/sheetData/invest/local_listed`
      ),
      local_otc: proxy.axios.get(
        `${proxy.envURL}/stockApi/sheetData/invest/local_otc`
      ),
      foreign_listed: proxy.axios.get(
        `${proxy.envURL}/stockApi/sheetData/invest/foreign_listed`
      ),
      foreign_otc: proxy.axios.get(
        `${proxy.envURL}/stockApi/sheetData/invest/foreign_otc`
      ),
    }
    // 讓 pinia 先去跑google sheets 來拿到資料
    const useGetTech = useGetTechSheet()
    onMounted(async () => {
      useGetTech.getSheetData()
    })

    /**
     * @description 設定api 與 template 連結
     * @param {*} investType
     */
    let buy_page_list = ref([])
    let sell_page_list = ref([])
    let selectedButton = ref('')
    const getInvestSheetData = async function (investType) {
      try {
        // 法人一日買賣超的api請求
        const { data } = await typeSelect[investType]
        const { sheetsData } = data
        selectedButton.value = investType
        buy_page_list.value = composeBaseBuySell(
          sheetsData[`${investType}_buy_no`],
          sheetsData[`${investType}_buy_code`],
          sheetsData[`${investType}_buy_name`]
        )
        sell_page_list.value = composeBaseBuySell(
          sheetsData[`${investType}_sell_no`],
          sheetsData[`${investType}_sell_code`],
          sheetsData[`${investType}_sell_name`]
        )
        console.log('buy_page_list', buy_page_list)
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
      console.log(result.value)
    }
    /**
     * @description 接收子組件上來的資料，並且開啟/關閉視窗
     * @param {*} data
     */
    let modalStatus = ref(false)
    let propsToModal = ref({})
    const troggleModalF = function (emitFromTableData) {
      propsToModal.value = emitFromTableData
      console.log('data', emitFromTableData.code)
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
    ]
    return {
      getInvestSheetData, // 取得法人買賣超資料（打api
      updateFilterCondition, // 更新使用者選到的指標function
      troggleModalF, // emit上來的function，目的是用於開啟關閉視窗
      conditionStatus, // client選擇到的技術分析指標
      buy_page_list, // 法人買超資料
      sell_page_list, // 法人賣超資料
      techList, // 我寫程式者定義的技術分析陣列
      modalStatus, // modal的開啟狀況
      propsToModal, // 給modal的資料
      linkWeb, // 給modal的連結資料
      buttonContent, // 上方 button的資料
      selectedButton, // 點選到的button
    }
  },
}
</script>
