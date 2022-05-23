import { ref, getCurrentInstance } from 'vue'
import { defineStore } from 'pinia'

// 对外部暴露一个 use 方法，该方法会导出我们定义的 state
const useGetTechSheet = defineStore('getTechSheet', function () {
  const { proxy } = getCurrentInstance()

  const kd_gold = ref([])
  const kd_death = ref([])
  const macd_gold = ref([])
  const macd_death = ref([])
  const avg_gold = ref([])
  const avg_death = ref([])
  const local_c_buy = ref([])
  const local_c_sell = ref([])
  const foreign_c_buy = ref([])
  const foreign_c_sell = ref([])
  const kd_promise = proxy.axios.get(
    `${proxy.envURL}/stockApi/sheetData/tech/kd`
  )
  const macd_promise = proxy.axios.get(
    `${proxy.envURL}/stockApi/sheetData/tech/macd`
  )
  const avg_promise = proxy.axios.get(
    `${proxy.envURL}/stockApi/sheetData/tech/avg`
  )
  const local_promise = proxy.axios.get(
    `${proxy.envURL}/stockApi/sheetData/tech/local_buy_sell`
  )
  const foreign_promise = proxy.axios.get(
    `${proxy.envURL}/stockApi/sheetData/tech/foreign_buy_sell`
  )

  const getSheetData = async function () {
    try {
      await Promise.all([
        kd_promise,
        macd_promise,
        avg_promise,
        local_promise,
        foreign_promise,
      ])
        .then((res) => {
          kd_gold.value = res[0].data.sheetsData.kd_gold_stock_name
          kd_death.value = res[0].data.sheetsData.kd_death_stock_name
          macd_gold.value = res[1].data.sheetsData.macd_gold_stock_name
          macd_death.value = res[1].data.sheetsData.macd_death_stock_name
          avg_gold.value = res[2].data.sheetsData.avg_gold_stock_name
          avg_death.value = res[2].data.sheetsData.avg_death_stock_name
          local_c_buy.value = res[3].data.sheetsData.buy_stock_name
          local_c_sell.value = res[3].data.sheetsData.sell_stock_name
          foreign_c_buy.value = res[4].data.sheetsData.buy_stock_name
          foreign_c_sell.value = res[4].data.sheetsData.sell_stock_name
          console.log('get SheetData')
          return res
        })
        .catch((err) => {
          throw err
        })

    } catch (error) {
      console.error(error)
    }
  }
  return {
    getSheetData,
    kd_gold,
    kd_death,
    macd_gold,
    macd_death,
    avg_gold,
    avg_death,
    local_c_buy,
    local_c_sell,
    foreign_c_buy,
    foreign_c_sell,
  }
})

export default useGetTechSheet
