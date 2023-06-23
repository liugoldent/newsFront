<template>
  <div class="about">
    <DisplayTableVue :webList="webList" />
  </div>
</template>
<script>
import TrendJson from "../public/trend.json";
import DisplayTableVue from "../components/Trend/DisplayTable.vue";
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
export default {
  components: {
    DisplayTableVue,
  },
  setup() {
    // 設定 proxy
    const { proxy } = getCurrentInstance();
    const hotwordsAllData = proxy.axios.get(
      `${import.meta.env.VITE_BASE_URL}/trendsApi/hotwords`
    );
    // 設定要給子component的資料
    let webList = reactive({
      buy123List: {},
      pconeList: {},
      sevenlList: {},
      bookStoreList: {},
      rakutenlList: {},
      rutenList: {},
      carrefourList: {},
      momoList: {},
      etmailList: {},
      fridaylList: {},
    });
    onMounted(async () => {
      await getWordsData();
    });
    /**
     * @description 得到所有資料
     */
    const getWordsData = async function () {
      const sheetAllData = await hotwordsAllData;
      console.log("", sheetAllData);
      composeDisplay(sheetAllData.data);
    };
    /**
     * @description 組成各群組資料
     * @param {} data
     */
    const composeDisplay = function (data) {
      // 各網站的基本資料
      const typeKeys = Object.keys(TrendJson);
      for (let i = 0, len = typeKeys.length; i < len; i++) {
        const thisTimeWeb = typeKeys[i];
        const productResult = composeFormat(data[thisTimeWeb], thisTimeWeb);
        webList[thisTimeWeb].product = productResult;
        webList[thisTimeWeb] = Object.assign(
          webList[thisTimeWeb],
          TrendJson[thisTimeWeb]
        );
        webList[thisTimeWeb].classColor = classFunc(i);
      }
      // webList = webList.filter((data) => data.product.productName.length > 0)
      console.log(webList);
    };
    /**
     * @description 組出產品陣列
     * @param {*} rawData
     */
    const composeFormat = function (rawData, shopType) {
      try {
        let productResult = [];
        for (let i = 0, len = rawData.word.length; i < len; i++) {
          let href = rawData.href[i];
          if (href && href.includes("javascript")) href = "";
          productResult.push({
            productName: rawData.word[i],
            productHref: href || "",
          });
        }
        return productResult;
      } catch (error) {
        throw error;
      }
    };
    const classFunc = function (i) {
      let color = [
        "bg-red-300",
        "bg-orange-300",
        "bg-amber-300",
        "bg-lime-300",
        "bg-green-300",
        "bg-yellow-800",
        "bg-sky-300",
        "bg-indigo-300",
        "bg-fuchsia-300",
        "bg-rose-300",
      ];
      return color[i];
    };
    return {
      webList,
    };
  },
};
</script>
