<template>
  <div class="flex flex-col justify-start items-center">
    <div class="flex flex-row justify-center items-center">
      <button @click="getInvestSheetData('local_listed')" class="m-4">
        上市投信買賣超
      </button>
      <button @click="getInvestSheetData('local_otc')" class="m-4">
        上櫃投信買賣超
      </button>
      <button @click="getInvestSheetData('foreign_listed')" class="m-4">
        上市外資買賣超
      </button>
      <button @click="getInvestSheetData('foreign_otc')" class="m-4">
        上櫃外資買賣超
      </button>
    </div>
    <div class="flex flex-row justify-center items-center">
      <button @click="conditionalSelection('KD黃金交叉')" class="m-4">
        KD黃金交叉
      </button>
      <button @click="conditionalSelection('MACD黃金交叉')" class="m-4">
        MACD黃金交叉
      </button>
      <button @click="conditionalSelection('均線多頭排列')" class="m-4">
        均線多頭排列
      </button>
      <button @click="conditionalSelection('外資連續買賣超')" class="m-4">
        外資連續買賣超
      </button>
      <button @click="conditionalSelection('投信連續買賣超')" class="m-4">
        投信連續買賣超
      </button>
    </div>
    <div class="flex flex-row justify-center items-start w-full">
      <StockInvestDBTableVue
        :investData="buy_page_list"
        :conditionStatus="conditionStatus"
      />
      <StockInvestDBTableVue
        :investData="sell_page_list"
        :conditionStatus="conditionStatus"
      />
    </div>
  </div>
</template>
<script>
import StockInvestDBTableVue from '../components/StockInvestDBTable.vue'
import { ref, getCurrentInstance, onMounted } from 'vue'
import useGetTechSheet from '@/stores/getTechSheet'
export default {
  components: {
    StockInvestDBTableVue,
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
      await useGetTech.getSheetData()
    })

    // 各function開始
    let buy_page_list = ref([])
    let sell_page_list = ref([])
    /**
     * @description 設定api 與 template 連結
     * @param {*} investType
     */
    const getInvestSheetData = async function (investType) {
      try {
        // 法人一日買賣超的api請求
        const { data } = await typeSelect[investType]
        const { sheetsData } = data

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
          code: code[i],
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
      if (kd_goldSet.has(name)) {
        techResult.push('KD黃金交叉')
      }
      if (kd_deathSet.has(name)) {
        techResult.push('KD死亡交叉')
      }
      if (macd_goldSet.has(name)) {
        techResult.push('MACD黃金交叉')
      }
      if (macd_deathSet.has(name)) {
        techResult.push('MACD死亡交叉')
      }
      return techResult
    }
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
      console.log(conditionStatus.value)
    }
    return {
      getInvestSheetData,
      conditionalSelection,
      conditionStatus,
      buy_page_list,
      sell_page_list,
    }
  },
}
</script>
