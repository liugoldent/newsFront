<template>
  <main class="flex flex-col justify-start items-center w-full">
    <div
      class="flex flex-row justify-center items-center fixed right-0 z-30"
      :class="{
        'z-0': loadingStatus,
      }"
    >
      <font-awesome-icon
        icon="circle-arrow-left"
        class="text-3xl cursor-pointer relative -right-8 z-20 duration-500 rounded-full bg-red-100"
        :class="{
          'rotate-180 ': !toggleNewsWeb,
          'translate-x-44': toggleNewsWeb,
        }"
        @click="toggleNewsWeb = !toggleNewsWeb"
        v-if="!loadingStatus"
      />
      <div
        class="flex flex-col justify-end items-center m-4 bg-slate-400/30 z-10 rounded opacity-90 w-48 duration-500"
        :class="{ 'translate-x-44': toggleNewsWeb }"
      >
        <!-- 新聞清單 -->
        <div class="flex flex-col items-end">
          <button
            @click="debounceSelectNewsNameToList(eachKey)"
            v-for="eachKey in webType"
            :key="eachKey['apiRoute']"
            class="m-2"
          >
            <template class="flex flex-row items-end">
              <font-awesome-icon
                v-if="eachKey['apiRoute'] === thisTimeSelectKey"
                icon="newspaper"
                class="mx-3"
              />
              <div>
                <p
                  class="inline"
                  :class="{
                    'underline underline-offset-4':
                      eachKey['apiRoute'] === thisTimeSelectKey,
                  }"
                >
                  {{ eachKey.name }}
                </p>
              </div>
            </template>
          </button>
        </div>
        <button
          @click="updateNewsList"
          class="relative top-5 w-100 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
        >
          <span class="mx-auto">更新資料庫</span>
        </button>
      </div>
    </div>
    <!-- ptt filter -->
    <transition>
      <div
        v-if="thisTimeSelectKey.includes('ptt')"
        class="fixed left-2 top-28 w-auto h-auto rounded opacity-80 flex flex-col items-start justify-center z-10 bg-slate-400"
      >
        <button
          v-for="(ele, index) in Object.keys(pushFilterList)"
          :key="index"
          @click="filterPttList(ele)"
          class="p-2"
        >
          <p
            :class="{
              'text-red-700': filterScale === ele && filterScale !== 'cancel',
            }"
          >
            {{ pushFilterList[ele].name }}
          </p>
        </button>
      </div>
    </transition>
    <StockNewsListVue
      :newsData="newsListInChild"
      class="z-0"
    ></StockNewsListVue>
    <!-- 顯示新聞的名稱 -->
    <div class="sm:visible md:visible invisible">
      <RectangleNameVue :titleName="titleName" :titleHref="titleHref" />
    </div>
    <!-- 捲軸到頂端 -->
    <ScrollTopButton />
  </main>
  <loading-view :loadingStatus="loadingStatus" />
</template>
<script>
import {
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  inject,
  watch,
} from "vue";
import StockNewsListVue from "../components/Stock/StockNewsList.vue";
import ScrollTopButton from "../components/ScrollTopButton.vue";
import RectangleNameVue from "../components/RectangleName.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faNewspaper,
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { debounce } from "lodash";
library.add(faNewspaper, faCircleArrowLeft);

export default {
  components: {
    StockNewsListVue,
    ScrollTopButton,
    RectangleNameVue,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const webType = [
      {
        // key: 'yahooInternational',
        name: "yahoo 國際新聞",
        source: "yahoo",
        link: "https://tw.stock.yahoo.com/intl-markets",
        apiRoute: "yahooIntl",
      },
      {
        // key: 'yahooTwStock',
        name: "yahoo 台股盤勢",
        source: "yahoo",
        link: "https://tw.stock.yahoo.com/tw-market",
        apiRoute: "yahooTwMarket",
      },
      {
        // key: 'yahooHot',
        name: "yahoo 重點要聞",
        source: "yahoo",
        link: "https://tw.stock.yahoo.com/news/",
        apiRoute: "yahooNews",
      },
      {
        // key: 'pttStock',
        name: " ptt -  Stock 版",
        source: "ptt股版",
        link: "https://www.ptt.cc/bbs/Stock/index.html",
        apiRoute: "pttStock",
      },
      {
        // key: 'anueNews',
        name: "鉅亨 - 最新新聞",
        source: "鉅亨網",
        link: "https://news.cnyes.com/news/cat/headline",
        apiRoute: "cnyes",
      },
      {
        // key: 'liveNews',
        name: "工商時報",
        source: "工商時報",
        link: "https://news.cnyes.com/news/cat/headline",
        apiRoute: "liveNews",
      },
    ];
    const pushFilterList = {
      hot: {
        name: "爆",
        pushCount: 99,
      },
      lg: {
        name: "> 75",
        pushCount: 75,
      },
      md: {
        name: "> 50",
        pushCount: 50,
      },
      sm: {
        name: "> 25",
        pushCount: 25,
      },
      cancel: {
        name: "取消",
        pushCount: 0,
      },
    };
    /**
     * @description 設定 loadingStatus
     */
    let loadingStatus = ref(true);
    onMounted(async () => {
      try {
        loadingStatus.value = true;
      } catch (error) {
        console.error(error);
      } finally {
        loadingStatus.value = false;
      }
    });
    /**
     * @description 點選按鈕改變news list 內容
     */
    let titleName = ref("");
    let titleHref = ref("");
    let thisTimeSelectKey = ref("");
    let newsListInChild = ref([]);
    let cloneNewsListInChild = [];
    let cloneClickInputItem = {};
    /**
     * @description 點擊新聞網名稱，打API
     */
    const selectNewsNameToList = async function (inputItem) {
      try {
        const { apiRoute } = inputItem;
        const { data } = await proxy.axios.post(
          `${import.meta.env.VITE_BASE_URL}/stock/news/${apiRoute}`
        );
        titleName.value = inputItem.name;
        titleHref.value = inputItem.link;
        thisTimeSelectKey.value = inputItem.apiRoute;
        newsListInChild.value = data;
        cloneNewsListInChild = data;
        cloneClickInputItem = inputItem;
      } catch (e) {
        console.error(e.message);
      } finally {
        loadingStatus.value = false;
      }
    };
    const debounceSelectNewsNameToList = debounce((data) => {
      loadingStatus.value = true;
      selectNewsNameToList(data);
    }, 500);
    /**
     * @description 更新newList
     */
    const updateNewsList = async function () {
      try {
        loadingStatus.value = true;
        const { status } = await proxy.axios.post(
          `${import.meta.env.VITE_BASE_URL}/stock/news/`
        );
        if (status === 200) {
          loadingStatus.value = false;
          await selectNewsNameToList(cloneClickInputItem);
        }
      } catch (e) {
        console.error(e.message);
      } finally {
        loadingStatus.value = false;
      }
    };
    /**
     * @description 開啟關閉新聞網
     */
    let toggleNewsWeb = ref(window.innerWidth < 1200 ? true : false);
    /**
     * @description 要給子component的顏色
     */
    const rectangleColor = inject("rectangleColor");
    /**
     * @description filter ptt熱度文章
     */
    let filterScale = ref("");
    const filterPttList = function (ele) {
      try {
        const cloneList = JSON.parse(JSON.stringify(cloneNewsListInChild));
        const filterStatus = pushFilterList[ele];
        const filterList = cloneList.filter(
          (item) => parseInt(item.pushCount) > filterStatus.pushCount
        );
        newsListInChild.value = filterList;
      } catch (e) {
        console.error(e.message);
      }
    };
    return {
      pushFilterList, //filter Ptt熱門文章的列表
      filterPttList, // 給client點選的function
      filterScale, // 點選到的篩選級別
      titleName, // 點完之後要顯示在畫面上的名稱
      titleHref, // 點完之後要顯示在畫面左上角的連結
      webType, // 所有的新聞網站
      newsListInChild, // 要送給子component的資料
      thisTimeSelectKey, // 這次點選到的網站
      toggleNewsWeb, // 切換開啟關閉的參數
      loadingStatus, // loading 視窗
      rectangleColor, // 給左上角方形title的顏色
      selectNewsNameToList, // 選到的新聞網名稱標題
      debounceSelectNewsNameToList, // 選到的新聞網名稱標題(debounce版本)
      updateNewsList, // 更新newsList資料庫
    };
  },
};
</script>
<style scope>
.v-enter-active,
.v-leave-active {
  transition: opacity 1s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
