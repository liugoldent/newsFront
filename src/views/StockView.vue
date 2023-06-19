<template>
  <main class="flex flex-col justify-start items-center">
    <!-- 左右方button -->
    <div class="flex flex-row justify-between w-full fixed z-10 m-10">
      <button
        @click="toggleInvestStatus = !toggleInvestStatus"
        class="fixed left-0 px-6 py-2 text-sm transition-colors rounded shadow-xl bg-slate-500 hover:bg-slate-600 text-slate-100 shadow-slate-400 duration-500"
        :class="{ '-translate-x-24': toggleInvestStatus }"
      >
        法人買賣超<font-awesome-icon icon="list" class="mx-2" />
      </button>
      <button
        @click="toggleTechStatus = !toggleTechStatus"
        class="fixed right-0 px-6 py-2 text-sm transition-colors rounded shadow-xl bg-slate-500 hover:bg-slate-600 text-slate-100 shadow-slate-400 duration-500"
        :class="{ 'translate-x-24': toggleTechStatus }"
      >
        <font-awesome-icon icon="list" class="mx-2" />
        技術分析&ensp;&thinsp;
      </button>
    </div>
    <!-- 左方選單List -->
    <div
      class="flex flex-col justify-center items-start bg-slate-300 opacity-90 fixed left-0 z-10 my-20 p-4 rounded-md duration-500"
      :class="{ '-translate-x-full': toggleInvestStatus }"
    >
      <p class="border-l-2 border-b-2 rounded-b-md border-red-500 p-2 mb-1">
        資料更新時間：06/19
      </p>
      <button
        @click="getInvestCombineData(content)"
        class="rounded-md border border-gray-500 p-2 mb-1"
        v-for="content in buttonContent"
        :key="content.key"
      >
        <font-awesome-icon
          icon="arrow-trend-up"
          style="color: red"
          v-if="thisTimeClickType === content.key"
          class="mr-2"
        />
        <title
          class="inline"
          :class="{
            'underline underline-offset-2 text-red-600':
              selectedButton === content.key,
          }"
        >
          {{ content.name }}
        </title>
      </button>
    </div>
    <!-- 主要內容table -->
    <div
      class="flex flex-row justify-center items-start w-full sm:flex-col sm:items-center mt-8 sm:mt-40"
    >
      <StockInvestDBTableVue
        :investData="buy_page_list"
        title="買超"
        @openModal="troggleModalF"
        class="sm:mt-2"
      />
      <StockInvestDBTableVue
        :investData="sell_page_list"
        title="賣超"
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
    <!-- 方塊顯示點選到的法人長方形 -->
    <div class="sm:visible md:visible invisible">
      <RectangleNameVue :titleName="titleName" :titleHref="titleHref" />
    </div>
    <!-- 捲軸到頂端 -->
    <ScrollTopButton />
  </main>
  <BlackMirrorVue :mirrorStatus="modalStatus" />
  <loading-view :loadingStatus="loadingStatus" />
</template>
<script>
import StockInvestDBTableVue from "../components/Stock/StockInvestDBTable.vue";
import StockFilterListVue from "../components/Stock/StockFilterList.vue";
import StockModalLink from "../components/Stock/StockModalLink.vue";
import RectangleNameVue from "../components/RectangleName.vue";
import ScrollTopButton from "../components/ScrollTopButton.vue";
import BlackMirrorVue from "../components/BlackMirror.vue";
import { ref, getCurrentInstance, onMounted } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowTrendUp, faList } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowTrendUp, faList);
export default {
  components: {
    StockInvestDBTableVue,
    StockFilterListVue,
    StockModalLink,
    RectangleNameVue,
    ScrollTopButton,
    BlackMirrorVue,
  },
  setup() {
    const { proxy } = getCurrentInstance()
    // 使用loading參數來讓畫面變暗
    let loadingStatus = ref(true);
    onMounted(async () => {
      loadingStatus.value = false;
    });
    /**
     * @description 設定api 與 template 連結 => 點選法人買賣種類，會對應到左上角的title
     * @param {*} investType
     */
    let buy_page_list = ref([]);
    let sell_page_list = ref([]);
    let selectedButton = ref("");
    let titleName = ref("");
    let titleHref = ref("");
    let thisTimeClickType = ref("");
    const getInvestCombineData = async function (content) {
      try {
        const { key } = content
        thisTimeClickType.value = key;
        const inverstorData = await proxy.axios.get(
          `${proxy.envURL}/stock/investorCombine/${key}`
        )
        const { data } = inverstorData
        buy_page_list.value = data.buy
        sell_page_list.value = data.sell
      } catch (error) {
        console.error(error);
      }
    };
    /**
     * @description 組成買進 or 賣出的陣列
     * @param {*} no 名次
     * @param {*} code 代號
     * @param {*} name 名稱
     */
    function composeBaseBuySell(code, name) {
      const result = [];
      for (let i = 0, len = name.length; i < len; i++) {
        result.push({
          no: i,
          code: code[i].replace("code-", ""),
          name: name[i],
        });
      }
      return result;
    }
    /**
     * @description 接收 emit 資料 並將其塞入condition array
     */
    const conditionStatus = ref([]);
    const updateFilterCondition = function (result) {
      conditionStatus.value = result.value;
    };
    /**
     * @description 接收子組件上來的資料，並且開啟/關閉視窗
     * @param {*} data
     */
    let modalStatus = ref(false);
    let propsToModal = ref({});
    const troggleModalF = function (emitFromTableData) {
      propsToModal.value = emitFromTableData;
      modalStatus.value = emitFromTableData.name.length > 0 ? true : false;
    };
    /**
     * @description 設定連結的web
     */
    let linkWeb = ref([]);
    linkWeb.value = [
      {
        name: "yahoo Stock",
        frontHref: "https://tw.stock.yahoo.com/quote/",
        backHref: "",
      },
      {
        name: "玩股網",
        frontHref: "https://www.wantgoo.com/stock/",
        backHref: "",
      },
      {
        name: "Hi Stock 嗨投資",
        frontHref: "https://histock.tw/stock/",
        backHref: "",
      },
      {
        name: "PC Home 股市",
        frontHref: "https://stock.pchome.com.tw/stock/sid",
        backHref: ".html",
      },
      {
        name: "Goodinfo! 台灣股市資訊網",
        frontHref: "https://goodinfo.tw/tw/StockDetail.asp?STOCK_ID=",
        backHref: "",
      },
      {
        name: "anue 鉅亨網",
        frontHref: "https://invest.cnyes.com/twstock/TWS/",
        backHref: "",
      },
      {
        name: "台灣證券交易所",
        frontHref: "https://mis.twse.com.tw/stock/fibest.jsp?stock=",
        backHref: "",
      },
      {
        name: "股市爆料同學會",
        frontHref: "https://www.cmoney.tw/forum/stock/",
        backHref: "",
      },
    ];
    /**
     * @description 上方button的資料
     */
    let buttonContent = ref([]);
    buttonContent.value = [
      {
        name: "上市投信外資共同買賣超",
        key: "lf_listed_1",
      },
      {
        name: "上櫃投信外資共同買賣超",
        key: "lf_otc_1",
      },
      {
        name: "上市主力共同買賣超",
        key: "local_listed",
      },
    ];
    /**
     * 組成主力同買同賣資料
     */
    const composeSameArray = async function () {
      const { data } = await investAllData;
      const mainInvestObj = {
        mainInvest_fl: ["foreign", "local"],
        mainInvest_all: ["foreign", "local", "employed"],
      };
      const selectType = mainInvestObj[selectedButton.value];
      const listedDataFunc = function () {
        let list = [];
        for (let i = 0, len = selectType.length; i < len; i++) {
          list.push(data[`${selectType[i]}_listed`]);
        }
        return list;
      };
      const otcDataFunc = function () {
        let list = [];
        for (let i = 0, len = selectType.length; i < len; i++) {
          list.push(data[`${selectType[i]}_otc`]);
        }
        return list;
      };
      const listedBuyRes = concatArr(listedDataFunc(), "buy");
      const otcBuyRes = concatArr(otcDataFunc(), "buy");
      const listedSellRes = concatArr(listedDataFunc(), "sell");
      const otcSellRes = concatArr(otcDataFunc(), "sell");
      buy_page_list.value = composeBaseBuySell(
        listedBuyRes.name.concat(otcBuyRes.name).map((el, index) => index + 1),
        listedBuyRes.code.concat(otcBuyRes.code),
        listedBuyRes.name.concat(otcBuyRes.name)
      );
      sell_page_list.value = composeBaseBuySell(
        listedSellRes.name
          .concat(otcSellRes.name)
          .map((el, index) => index + 1),
        listedSellRes.code.concat(otcSellRes.code),
        listedSellRes.name.concat(otcSellRes.name)
      );
    };
    const concatArr = function (arrListed, type) {
      try {
        let name = [];
        let code = [];
        for (let i = 0, len = arrListed.length; i < len; i++) {
          name.push(arrListed[i][`${arrListed[i].type}_${type}_name`]);
          code.push(arrListed[i][`${arrListed[i].type}_${type}_code`]);
        }
        name = findRepeatEle(name);
        code = findRepeatEle(code);

        return {
          name,
          code,
        };
      } catch (error) {
        console.log(error);
      }
    };
    const findRepeatEle = function (arr) {
      return arr.reduce(function (accumulator, curValue) {
        if (accumulator.length === 0) {
          accumulator = curValue;
          return accumulator;
        } else {
          accumulator = accumulator.filter((ele) => curValue.includes(ele));
          return accumulator;
        }
      }, []);
    };
    /**
     * @description 切換選單進入or移出
     */
    let toggleInvestStatus = ref(window.innerWidth < 1200 ? true : false);
    let toggleTechStatus = ref(window.innerWidth < 1200 ? true : false);
    return {
      getInvestCombineData, // 取得法人買賣超資料（打api
      updateFilterCondition, // 更新使用者選到的指標function
      troggleModalF, // emit上來的function，目的是用於開啟關閉視窗
      composeSameArray, // 用來測試api資料
      toggleInvestStatus, // 切換法人買賣超出現與否的參數
      toggleTechStatus, // 切換技術分析出現與否的參數
      conditionStatus, // client選擇到的技術分析指標
      buy_page_list, // 法人買超資料
      sell_page_list, // 法人賣超資料
      modalStatus, // modal的開啟狀況
      propsToModal, // 給modal的資料
      linkWeb, // 給modal的連結資料
      getInvestCombineData, // 上方 button的資料
      titleName, // 點完之後要顯示在畫面上的名稱
      titleHref, // 點完之後要顯示在畫面左上角的連結
      loadingStatus, //點進畫面的初始loading
      selectedButton, // 選到的法人買賣
      buttonContent, // 左邊法人按鈕形式
      thisTimeClickType, // 此次點到的法人種類
    };
  },
};
</script>
