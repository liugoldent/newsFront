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
      <p class="border-l-2 border-b-2 rounded-b-md border-red-500 p-2 mb-1">
        法人 - 1
      </p>
      <div class="flex">
        <template v-for="(item, index) in investorType" :key="index">
          <input
            type="checkbox"
            :id="`${item.type}${index}`"
            class="peer hidden"
            v-model="investorSelectedType"
            :value="item.name"
            @change="investorSelectedType = [item.name]"
          />
          <label
            :for="`${item.type}${index}`"
            class="select-none cursor-pointer rounded-lg border-2 border-gray-200 py-3 px-6 font-bold text-gray-200 transition-colors duration-200 ease-in-out bg-black"
            :class="{
              'peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200':
                investorSelectedType.includes(item.name),
            }"
          >
            {{ item.name }}
          </label>
        </template>
      </div>
      <p class="border-l-2 border-b-2 rounded-b-md border-red-500 p-2 mb-1">
        法人 - 2
      </p>
      <div class="flex">
        <template v-for="(item, index) in investorType" :key="index">
          <input
            type="checkbox"
            :id="`${item.type}${index}-2`"
            class="peer hidden"
            v-model="investorSelectedType2"
            :value="item.name"
            @change="investorSelectedType2 = [item.name]"
          />
          <label
            :for="`${item.type}${index}-2`"
            class="select-none cursor-pointer rounded-lg border-2 border-gray-200 py-3 px-6 font-bold text-gray-200 transition-colors duration-200 ease-in-out bg-black"
            :class="{
              'peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200':
                investorSelectedType2.includes(item.name),
            }"
          >
            {{ item.name }}
          </label>
        </template>
      </div>
      <p class="border-l-2 border-b-2 rounded-b-md border-red-500 p-2 mb-1">
        市場類別
      </p>
      <div class="flex">
        <template v-for="(item, index) in marketType" :key="index">
          <input
            type="checkbox"
            :id="`${item.type}${index}`"
            class="peer hidden"
            v-model="marketSelectedType"
            :value="item.name"
            @change="marketSelectedType = [item.name]"
          />
          <label
            :for="`${item.type}${index}`"
            class="select-none cursor-pointer rounded-lg border-2 border-gray-200 py-3 px-6 font-bold text-gray-200 transition-colors duration-200 ease-in-out bg-black"
            :class="{
              'peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200':
                marketSelectedType.includes(item.name),
            }"
          >
            {{ item.name }}
          </label>
        </template>
      </div>
      <p class="border-l-2 border-b-2 rounded-b-md border-red-500 p-2 mb-1">
        累積日期
      </p>
      <div class="flex">
        <template v-for="(item, index) in accumDayType" :key="index">
          <input
            type="checkbox"
            :id="`${item.type}${index}`"
            class="peer hidden"
            v-model="accumDaySelectedType"
            :value="item.name"
            @change="accumDaySelectedType = [item.name]"
          />
          <label
            :for="`${item.type}${index}`"
            class="select-none cursor-pointer rounded-lg border-2 border-gray-200 py-3 px-6 font-bold text-gray-200 transition-colors duration-200 ease-in-out bg-black"
            :class="{
              'peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200':
                accumDaySelectedType.includes(item.name),
            }"
          >
            {{ item.name }}
          </label>
        </template>
      </div>
      <button
        @click="getInvestCombineData"
        class="rounded-md border border-gray-500 p-2 mb-1"
      >
        Search
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
    <div class="sm:visible md:visible visible fixed left-0 top-30">
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
import StockModalLink from "../components/Stock/StockModalLink.vue";
import RectangleNameVue from "../components/RectangleName.vue";
import ScrollTopButton from "../components/ScrollTopButton.vue";
import BlackMirrorVue from "../components/BlackMirror.vue";
import {
  ref,
  getCurrentInstance,
  onMounted,
  watch,
  computed,
  reactive,
} from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowTrendUp, faList } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowTrendUp, faList);
export default {
  components: {
    StockInvestDBTableVue,
    StockModalLink,
    RectangleNameVue,
    ScrollTopButton,
    BlackMirrorVue,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    // 使用loading參數來讓畫面變暗
    let loadingStatus = ref(true);
    let investorSelectedType = ref([]);
    let investorSelectedType2 = ref([]);
    let marketSelectedType = ref([]);
    let accumDaySelectedType = ref([]);
    const titleName = computed(() => {
      if (
        marketSelectedType.value[0] &&
        investorSelectedType.value[0] &&
        investorSelectedType2.value[0] &&
        accumDaySelectedType.value[0]
      ) {
        return `${marketSelectedType.value[0]} - ${investorSelectedType.value[0]} - ${investorSelectedType2.value[0]} - ${accumDaySelectedType.value[0]} 共同買賣超`;
      } else {
        return "";
      }
    });
    onMounted(async () => {
      loadingStatus.value = false;
    });
    /**
     * @description 設定api 與 template 連結 => 點選法人買賣種類，會對應到左上角的title
     * @param {*} investType
     */
    let buy_page_list = ref([]);
    let sell_page_list = ref([]);
    let titleHref = ref("");
    const getInvestCombineData = async function () {
      try {
        const keyUrl = getApiRouteKey();
        const { data } = await proxy.axios.post(
          `${proxy.envURL}/stock/investorCombine/${keyUrl}`
        );
        buy_page_list.value = data.buy;
        sell_page_list.value = data.sell;
      } catch (error) {
        console.error(error);
      }
    };
    const getApiRouteKey = function () {
      let { key: investorKey1 } = investorType.find(
        (item) => item.name === investorSelectedType.value[0]
      );
      let { key: investorKey2 } = investorType.find(
        (item) => item.name === investorSelectedType2.value[0]
      );
      let { key: marketKey } = marketType.find(
        (item) => item.name === marketSelectedType.value[0]
      );
      let { key: accumDayKey } = accumDayType.find(
        (item) => item.name === accumDaySelectedType.value[0]
      );
      return `${investorKey1}_${investorKey2}_${marketKey}_${accumDayKey}`;
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
     * @description 建立法人類別
     */
    let investorType = [
      {
        type: "foreign",
        name: "外資",
        key: "f",
      },
      {
        type: "local",
        name: "投信",
        key: "l",
      },
      {
        type: "employed",
        name: "自營商",
        key: "e",
      },
      {
        type: "main",
        name: "主力",
        key: "m",
      },
    ];
    /**
     * @description 建立市場類別
     */
    let marketType = [
      {
        type: "listed",
        name: "上市",
        key: "listed",
      },
      {
        type: "otc",
        name: "上櫃",
        key: "otc",
      },
    ];
    /**
     * @description 建立積累日子
     */
    let accumDayType = [
      {
        type: "1",
        name: "1日",
        key: "1",
      },
      {
        type: "5",
        name: "5日",
        key: "5",
      },
      {
        type: "10",
        name: "10日",
        key: "10",
      },
      {
        type: "30",
        name: "30日",
        key: "30",
      },
    ];
    /**
     * @description 切換選單進入or移出
     */
    let toggleInvestStatus = ref(window.innerWidth < 1200 ? true : false);
    let toggleTechStatus = ref(window.innerWidth < 1200 ? true : false);
    return {
      getInvestCombineData, // 取得法人買賣超資料（打api
      troggleModalF, // emit上來的function，目的是用於開啟關閉視窗
      toggleInvestStatus, // 切換法人買賣超出現與否的參數
      toggleTechStatus, // 切換技術分析出現與否的參數
      buy_page_list, // 法人買超資料
      sell_page_list, // 法人賣超資料
      modalStatus, // modal的開啟狀況
      propsToModal, // 給modal的資料
      linkWeb, // 給modal的連結資料
      titleName, // 點完之後要顯示在畫面上的名稱
      titleHref, // 點完之後要顯示在畫面左上角的連結
      loadingStatus, //點進畫面的初始loading
      investorType, // 所有法人種類
      investorSelectedType, // 選到的法人種類
      investorSelectedType2, // 選到的第二種法人種類
      marketType, // 市場類別
      marketSelectedType,
      accumDayType, // 積累日期類別
      accumDaySelectedType,
    };
  },
};
</script>
