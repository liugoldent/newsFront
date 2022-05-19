import { ref, getCurrentInstance, computed } from "vue";
import { defineStore } from 'pinia'

// 对外部暴露一个 use 方法，该方法会导出我们定义的 state
const useGetTechSheet = defineStore('getTechSheet', function () {
  const { proxy } = getCurrentInstance();

  const kd_gold = ref([])
  const kd_death = ref([])
  const macd_gold = ref([])
  const macd_death = ref([])
  const kd_promise = proxy.axios.get(
    `${proxy.envURL}/stockApi/sheetData/tech/kd`
  );
  const macd_promise = proxy.axios.get(
    `${proxy.envURL}/stockApi/sheetData/tech/macd`
  );
  // const tech_avg_url = proxy.axios.get(`${proxy.envURL}/stockApi/sheetData/tech/avg`)
  // const tech_local_url = proxy.axios.get(`${proxy.envURL}/stockApi/sheetData/tech/local_buy_sell`)
  // const tech_foreign_url = proxy.axios.get(`${proxy.envURL}/stockApi/sheetData/tech/foreign_buy_sell`)

  const getSheetData = async function () {
    try {
      await Promise.all([kd_promise, macd_promise])
        .then((res) => {
          kd_gold.value = res[0].data.sheetsData.kd_gold_stock_name
          kd_death.value = res[0].data.sheetsData.kd_death_stock_name
          macd_gold.value = res[1].data.sheetsData.macd_gold_stock_name
          macd_death.value = res[1].data.sheetsData.macd_death_stock_name
          return res;
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {

    }
  }
  return {
    getSheetData, kd_gold, kd_death, macd_gold, macd_death
  }
})

export default useGetTechSheet
