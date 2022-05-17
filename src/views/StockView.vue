<template>
  <div class="flex flex-col justify-start items-center">
    <div>
      <button @click="getInvest('local_listed')" class="m-8">上市投信買賣超</button>
      <button @click="getInvest('local_otc')" class="m-8">上櫃投信買賣超</button>
      <button @click="getInvest('foreign_listed')" class="m-8">上市外資買賣超</button>
      <button @click="getInvest('foreign_otc')" class="m-8">上櫃外資買賣超</button>
    </div>
    <div class="flex flex-row justify-center items-start" v-if="buy_page_list.length > 0">
      <StockInvestDBTableVue :investData="buy_page_list" />
      <StockInvestDBTableVue :investData="sell_page_list" />
    </div>
    <!-- <button @click="testAwaitPinia">testAwaitPinia</button> -->
    <!-- <button @click="testPinia">TestPinia</button> -->
    <!-- base：{{ useGetTech.counter }} double: {{ useGetTech.double }}
    {{ useGetTech }} -->
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
    // 設定pinia
    // const useGetTech = useGetTechSheet();

    // 各function開始
    let buy_page_list = ref([])
    let sell_page_list = ref([])
    const getInvest = async function (investType) {
      try {
        // 法人一日買賣超的api請求
        const { data } = await typeSelect[investType]
        const { sheetsData } = data
                console.log('data',sheetsData)

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
        console.log('error', error)
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
          tech: [],
        })
      }
      return result
    }
    // async function testAwaitPinia() {
    //   try {
    //     await useGetTech.getSheetData();
    //   } catch (error) {
    //     alert(error);
    //   }
    // }

    // const testPinia = async function () {
    //   await useGetTech.increment();
    // };

    return {
      getInvest,
      // testAwaitPinia,
      buy_page_list,
      sell_page_list,
      // testPinia,
      // useGetTech,
    }
  },
}
</script>
