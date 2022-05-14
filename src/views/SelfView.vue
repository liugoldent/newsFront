<template>
  <div class="about">
    <h1>This is an self page</h1>
    <button @click="get">Get Func</button>
    <button @click="testAwaitPinia">testAwaitPinia</button>
    <button @click="testPinia">TestPinia</button>
    base：{{ useGetTech.counter }} double: {{ useGetTech.double }}
    {{ useGetTech }}
    <ol>
      <li v-for="data in buy_page_list" :key="data.name">
        {{ data.name }}
      </li>
    </ol>
    <ol>
      <li v-for="data in sell_page_list" :key="data.name">
        {{ data.name }}
      </li>
    </ol>
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
  </div>
</template>
<script>
import { ref, getCurrentInstance, onMounted, reactive } from "vue";
import useGetTechSheet from "@/stores/getTechSheet";
export default {
  setup() {
    // 設定API
    const { proxy } = getCurrentInstance();
    const getInvestLocal = proxy.axios.get(
      `${proxy.envURL}/stockApi/sheetData/invest/local_listed`
    );
    // 設定pinia
    const useGetTech = useGetTechSheet();

    // 各function開始
    let buy_page_list = ref([]);
    let sell_page_list = ref([]);
    const get = async function () {
      try {
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
    async function testAwaitPinia() {
      try {
        await useGetTech.getSheetData();
      } catch (error) {
        alert(error);
      }
    }

    const testPinia = async function () {
      await useGetTech.increment();
    };

    return {
      get,
      testAwaitPinia,
      buy_page_list,
      sell_page_list,
      testPinia,
      useGetTech,
    };
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
