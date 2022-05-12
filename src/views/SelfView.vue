<template>
  <div class="about">
    <h1>This is an self page</h1>
    <button @click="get">Get Func</button>
    <button @click="post">Post Func</button>
    <ol>
      <li v-for="(data,index) in buy_page_list">
        {{ data.name }}
      </li>
    </ol>
    <ol>
      <li v-for="(data,index) in sell_page_list">
        {{ data.name }}
      </li>
    </ol>
  </div>
</template>
<script>
import { ref, getCurrentInstance, onMounted, reactive } from "vue";
export default {
  setup() {
    // 設定API
    const { proxy } = getCurrentInstance();
    const getInvestLocal = proxy.axios.get(
      `${proxy.envURL}/stockApi/sheetData/invest/local_listed`
    );
    // const tech_avg_url = `${proxy.envURL}/stockApi/sheetData/tech/avg`
    // const tech_local_url = `${proxy.envURL}/stockApi/sheetData/tech/local_buy_sell`
    // const tech_foreign_url = `${proxy.envURL}/stockApi/sheetData/tech/foreign_buy_sell`
    const kd_promise = proxy.axios.get(
      `${proxy.envURL}/stockApi/sheetData/tech/kd`
    );
    // const macd_promise = proxy.axios.get(
    //   `${proxy.envURL}/stockApi/sheetData/tech/macd`
    // );

    // 設定template資料
    let buy_page_list = ref([]);
    let sell_page_list = ref([]);

    const get = async function () {
      try {
        // 技術分析的api請求
        const [kd_condition] = await Promise.all([kd_promise])
          .then((values) => {
            return values;
          })
          .catch((err) => {
            throw err;
          });
        // 法人一日買賣超的api請求
        const { data } = await getInvestLocal;
        const { sheetsData } = data;
        buy_page_list.value = composeBaseBuySell(
          sheetsData.local_listed_buy_no,
          sheetsData.local_listed_buy_code,
          sheetsData.local_listed_buy_name
        );
        sell_page_list.value = composeBaseBuySell(
          sheetsData.local_listed_sell_no,
          sheetsData.local_listed_sell_code,
          sheetsData.local_listed_sell_name
        );
      } catch (error) {
        console.log("error", error);
      }
    };
    /**
     * @description 組成買進 or 賣出的陣列
     * @param {*} no 名次
     * @param {*} code 代號
     * @param {*} name 名稱
     */
    function composeBaseBuySell(no, code, name) {
      const result = [];
      for (let i = 0, len = name.length; i < len; i++) {
        result.push({
          no: no[i],
          code: code[i],
          name: name[i],
          tech: [],
        });
      }
      return result;
    }
    function post() {
      proxy
        .axios({
          method: "post",
          url: `${proxy.envURL}/word`,
          data: {
            firstName: "Finn",
            lastName: "Williams",
          },
        })
        .then((res) => {
          console.log(res);
          // let { data } = res.data
          // console.log(data)
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return { get, post, buy_page_list, sell_page_list };
  },
};
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
