import{_ as a,q as n,o as c,a as d,b as s,n as l,t as m,l as C,s as _,d as b,e as x}from"./index.26bbc54e.js";const T={props:["titleName","titleHref"],setup(){const{rectangleTextColor:t,rectangleBorderColor:e,rectangleBgColor:r}=n("rectangleColor");return{borderColor:e,textColor:t,bgColor:r}}},h={class:"fixed left-1 top-18 sm:top-16 md:top-24"},g=["href"];function w(t,e,r,o,i,p){return c(),d("div",h,[s("span",{class:l(["absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 group-hover:-translate-x-0 group-hover:-translate-y-0",o.bgColor])},null,2),s("span",{class:l(["absolute inset-0 w-full h-full bg-white border-2",o.borderColor])},null,2),s("span",{class:l(["relative group-hover:text-red-100 p-5 text-md",o.textColor])},[s("a",{href:r.titleHref},m(r.titleName),9,g)],2)])}var y=a(T,[["render",w]]);C.add(_);const v={setup(){const t=function(){window.scrollTo({top:0,behavior:"smooth"})},{scrollToTopBorderColor:e,scrollToTopTextColor:r,scrollToTopShadowColor:o}=n("scrollToTopColor");return{scrollToTop:t,borderColor:e,textColor:r,shadowColor:o}}};function B(t,e,r,o,i,p){const f=b("font-awesome-icon");return c(),d("button",{onClick:e[0]||(e[0]=(...u)=>o.scrollToTop&&o.scrollToTop(...u)),class:l(["animate-bounce fixed sm:bottom-5 sm:left-5 bottom-10 left-10 border border-double rounded-full p-3 shadow-xl",[o.borderColor,o.shadowColor]])},[x(f,{icon:"angles-up",class:l(["fa-2xl text-rose-400",o.textColor])},null,8,["class"])],2)}var S=a(v,[["render",B]]);export{y as R,S};
