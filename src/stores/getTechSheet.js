// import { getCurrentInstance } from "vue";
// import { defineStore } from 'pinia'

// id 是這個容器的名字，必須為唯一值
// id 之後的東西是選填物件
// export const useGetTechSheet = defineStore({
//   id: 'getTechSheet',
//   // 類似component中的data
//   state: () => ({
//     counter: 0,
//     kd_gold: [],
//     kd_death: []
//   }),

//   getters: {
//     // 正常function的getter中的this，會指向state
//     // 箭頭function的第一個參數是state
//     doubleCount: (state) => state.counter * 2
//   },
//   actions: {
//     // 改變state都可以放在actions
//     increment() {
//       this.counter++
//     },
//     async getSheetData() {
//       try {
//         const [kd_condition] = await Promise.all([kd_promise])
//           .then((values) => {
//             return values;
//           })
//           .catch((err) => {
//             throw err;
//           });
//         console.log(kd_condition)
//       } catch (error) {

//       }
//     }
//   }
// })


import { ref, getCurrentInstance, computed } from "vue";
import { defineStore } from 'pinia'

// 对外部暴露一个 use 方法，该方法会导出我们定义的 state
const useGetTechSheet = defineStore('getTechSheet', function () {
  const { proxy } = getCurrentInstance();

  const counter = ref(0)
  const double = computed(() => counter.value * 2)
  function increment() {
    counter.value++
  }
  const kd_gold = ref([])
  const kd_death = ref([])
  const kd_promise = proxy.axios.get(
    `${proxy.envURL}/stockApi/sheetData/tech/kd`
  );
  // const tech_macd_url = proxy.axios.get(
  //   `${proxy.envURL}/stockApi/sheetData/tech/macd`
  // );
  // const tech_avg_url = proxy.axios.get(`${proxy.envURL}/stockApi/sheetData/tech/avg`)
  // const tech_local_url = proxy.axios.get(`${proxy.envURL}/stockApi/sheetData/tech/local_buy_sell`)
  // const tech_foreign_url = proxy.axios.get(`${proxy.envURL}/stockApi/sheetData/tech/foreign_buy_sell`)

  const getSheetData = async function () {
    try { 
      await Promise.all([kd_promise])
        .then((res) => {
          kd_gold.value = res[0].data.sheetsData.kd_gold_stock_name
          return res;
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {

    }
  }
  return {
    counter, increment, double, getSheetData, kd_gold, kd_death
  }
})

export default useGetTechSheet
