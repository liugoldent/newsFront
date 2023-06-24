import{_ as B,o as x,a as _,b as t,t as l,n as k,l as I,h as z,u as K,j as W,k as v,m as E,x as H,c as M,d as w,e as p,F as N,r as R,y as U,z as A,A as q,B as G,C as J,g as P}from"./index.26bbc54e.js";import{S as Q,R as X}from"./ScrollTopButton.90706007.js";const Y={props:["signalData","shadowColor"],setup(r){}},Z={class:"flex flex-row justify-start items-center w-full h-24 border-gray-600 border-double border-b-4"},tt={class:"text-slate-800 text-2xl ml-8 mr-4"},et={class:"text-slate-800 text-2xl"},st={class:"flex flex-col justify-start items-start w-full h-72"},ot={class:"text-slate-800 ml-4 mt-1 text-xl"},lt={class:"text-slate-800 ml-4 mt-2 text-xl"},at={class:"text-slate-800 ml-4 mt-2 text-xl"},nt={class:"text-slate-800 ml-4 mt-2 text-xl"},rt={class:"text-slate-800 ml-4 mt-2 text-xl"},ct={class:"text-slate-800 ml-4 mt-2 text-xl"},it={class:"text-slate-800 ml-4 mt-2 text-xl"},dt={class:"text-slate-800 ml-4 mt-2 text-xl"};function mt(r,c,e,s,f,S){return x(),_("div",{class:k(["h-96 w-96 bg-slate-200 flex flex-col justify-start items-center border rounded-lg shadow-md drop-shadow-lg",e.shadowColor])},[t("div",Z,[t("h1",tt,l(e.signalData.code),1),t("h1",et,l(e.signalData.name),1)]),t("div",st,[t("p",ot," \u6210\u4EA4\u50F9\uFF1A"+l(e.signalData.dealprice),1),t("p",lt," \u6210\u4EA4\u91CF\uFF1A"+l(e.signalData.dealVolume),1),t("p",at," \u6F32 / \u8DCC\uFF08%\uFF09\uFF1A"+l(e.signalData.gain),1),t("p",nt," \u5916\u8CC7\u8CB7\u8CE3\u8D85\uFF1A"+l(e.signalData.foreignbuy),1),t("p",rt," \u6295\u4FE1\u8CB7\u8CE3\u8D85\uFF1A"+l(e.signalData.localbuy),1),t("p",ct," \u4E3B\u529B\u8CB7\u8CE3\u8D85\uFF1A"+l(e.signalData.main),1),t("p",it," \u878D\u8CC7\u589E\u6E1B\u5F35\u6578\uFF1A"+l(e.signalData.lending),1),t("p",dt," \u878D\u5238\u589E\u6E1B\u5F35\u6578\uFF1A"+l(e.signalData.borrowing),1)])],2)}var xt=B(Y,[["render",mt]]);I.add(z,K);const ut={components:{RecommendStockVue:xt,ScrollTopButton:Q,RectangleNameVue:X},setup(){const{proxy:r}=W(),c=r.axios.get("http://127.0.0.1:8000/stockApi/sheetData/filterStock");let e={},s=[],f=v(!0);E(async()=>{f.value=!0;const o=await c;o.status===200&&(e=o.data,s=Object.keys(e.listKey)),f.value=!1});let S=["\u521D\u51FA\u8305\u5EEC\uFF0C\u8DA8\u52E2\u672A\u5B9A","\u4E8C\u6B21\u8A0A\u865F\uFF0C\u78BA\u8A8D\u7C4C\u78BC","\u591A\u591A\u89C0\u5BDF\uFF0C\u8DA8\u52E2\u5DF2\u6210","\u7B49\u5019\u6642\u6A5F\uFF0C\u5C0F\u5FC3\u64CD\u4F5C","\u4E0D\u75BE\u4E0D\u5F90\uFF0C\u975C\u5F85\u8A0A\u865F"],i=H({signal1:[],signal2:[],signal3:[],signal4:[],signal5:[]}),u=Object.keys(i),h=v("");const D=function(o){h.value=o,j(),L(o);const a=Object.keys(i);for(let n=0,g=u.length;n<g;n++)i[`${a[n]}`]=C(`${o}_${a[n]}`)},C=function(o){const a=e[o].code;let n=[];for(let g=0,T=a.length;g<T;g++){let F=s.reduce(function(V,$){const O=e[o][`${$}`];return V[`${$}`]=O[g],V},{});n.push(F)}return n},d=M(()=>h.value.length===0?"sm:translate-y-20 md:translate-y-10 translate-y-44":"");let m=v([]);const j=function(){m.value=[];const o=U(1,A.shadowColor.length-u.length);for(let a=0,n=u.length;a<n;a++)m.value.push(A.shadowColor[o+a])},y=v(""),L=function(o){const a={bear:"\u505A\u7A7A",bull:"\u505A\u591A"};y.value=`${a[o]}\u9078\u80A1\uFF1A${e.updateDay}\u66F4\u65B0`};return{stockShow:D,titleCss:d,titleName:y,shadowColorArray:m,stockList:i,stockListKey:u,correspondWord:S,loadingStatus:f,marketType:h}}},b=r=>(q("data-v-0f2cb582"),r=r(),G(),r),_t={class:"flex flex-col justify-center items-center w-full"},ft=b(()=>t("div",{class:"flex flex-row justify-start items-center md:flex-col sm:flex-col md:items-start sm:items-start"},[t("h1",{class:"text-6xl md:text-5xl sm:text-3xl sm:mt-5"},"\u9078\u64C7\u3002"),t("h1",{class:"text-6xl text-slate-500 md:text-5xl sm:text-3xl md:mt-5"}," \u4F60\u6240\u559C\u6B61\u7684\u64CD\u4F5C\u65B9\u5F0F\u3002 ")],-1)),ht=b(()=>t("p",{class:"text-sm self-end text-end mt-4 text-slate-600 underline"}," \u672C\u7DB2\u7AD9\u8207\u6240\u63A8\u4ECB\u5206\u6790\u4E4B\u500B\u5225\u6709\u50F9\u8B49\u5238\u7121\u4E0D\u7576\u4E4B\u8CA1\u52D9\u5229\u76CA\u95DC\u4FC2\uFF0C\u672C\u7DB2\u7AD9\u8CC7\u6599\u50C5\u4F9B\u53C3\u8003\uFF0C\u6295\u8CC7\u4EBA\u61C9\u7368\u7ACB\u5224\u65B7\uFF0C\u5BE9\u614E\u8A55\u4F30\u4E26\u81EA\u8CA0\u6295\u8CC7\u98A8\u96AA\u3002 ",-1)),gt={class:"flex flex-row justify-center items-center mt-8 self-end w-auto"},wt=b(()=>t("p",{class:"text-4xl m-2 sm:text-2xl"},"\u591A",-1)),pt=b(()=>t("p",{class:"text-5xl sm:text-2xl"},"/",-1)),bt=b(()=>t("p",{class:"text-4xl m-2 sm:text-2xl"},"\u7A7A",-1)),yt={key:0,class:"flex flex-col justify-start items-start overflow-auto w-full snap-x scrollbar-hide h-auto"},vt={class:"flex flex-row justify-center items-center w-auto appleCenter mx-4"},kt={class:"border-none text-4xl mx-1 my-2 sm:text-2xl"},St={class:"w-auto my-4 mx-2 text-5xl sm:text-2xl"},Dt={class:"flex flex-row justify-start items-center overflow-auto w-full snap-x scrollbar-hide h-auto"},Ct={class:"visible"};function jt(r,c,e,s,f,S){const i=w("font-awesome-icon"),u=w("RecommendStockVue"),h=w("RectangleNameVue"),D=w("ScrollTopButton"),C=w("loading-view");return x(),_(N,null,[t("main",_t,[t("div",{class:k(["flex flex-col justify-start items-start h-64 md:h-72 sm:h-72 duration-500 m-28 -ml-6 md:m-20 sm:m-6 border-b-4",[s.titleCss]])},[ft,ht,t("div",gt,[t("button",{onClick:c[0]||(c[0]=d=>s.stockShow("bull"))},[t("div",{class:k(["h-auto w-auto rounded-lg flex flex-row justify-center items-center mx-8 cursor-pointer",{"border-double border-4 duration-500 border-red-400":s.marketType==="bull"}])},[p(i,{icon:"arrow-trend-up",class:"border-none text-4xl text-red-700 m-2 sm:text-2xl"}),wt],2)]),pt,t("button",{onClick:c[1]||(c[1]=d=>s.stockShow("bear"))},[t("div",{class:k(["h-auto w-auto rounded-lg flex flex-row justify-center items-center mx-8 cursor-pointer",{"border-double border-4 duration-500 border-green-400":s.marketType==="bear"}])},[bt,p(i,{icon:"arrow-trend-down",class:"border-none text-4xl text-green-700 m-2 sm:text-2xl"})],2)])])],2),(x(!0),_(N,null,R(s.stockListKey,(d,m)=>(x(),_("div",{key:d,class:"w-full duration-500"},[s.stockList[d].length>0?(x(),_("div",yt,[t("div",vt,[t("p",kt,l(m+1),1),t("p",St,l(s.correspondWord[m]),1)]),t("div",Dt,[(x(!0),_(N,null,R(s.stockList[d],(j,y)=>(x(),J(u,{key:y,class:"m-4 shrink-0 appleCenter",signalData:j,shadowColor:s.shadowColorArray[m]},null,8,["signalData","shadowColor"]))),128))])])):P("",!0)]))),128))]),t("div",Ct,[p(h,{titleName:s.titleName,titleHref:""},null,8,["titleName"])]),p(D),p(C,{loadingStatus:s.loadingStatus},null,8,["loadingStatus"])],64)}var $t=B(ut,[["render",jt],["__scopeId","data-v-0f2cb582"]]);export{$t as default};