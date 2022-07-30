<template >
  <div class="mt-10">
    <button @click="downloadImg()">download /</button>
    <button @click="TitleDownloadImg()">TitleDownloadImg</button>
    <div class="m-5 flex flex-col justify-center items-center" id="titleImg">
      <img src="https://picsum.photos/1000/800?random=100" />
      <div class="absolute rounded-lg bg-slate-200 opacity-80">
        <p class="p-16 text-center text-9xl">0728 量增</p>
        <p class="p-16 text-center text-9xl">站上月線</p>
      </div>
    </div>
    <div
      v-for="(data, index) in list"
      :key="index"
      class="flex flex-col justify-center items-center m-2"
    >
      <div
        class="m-5 flex flex-col justify-center items-center w-1000px h-800px"
        :id="'igImg' + index"
      >
        <img :src="'https://picsum.photos/1000/800?random=' + index" />
        <div class="absolute rounded-lg bg-slate-200 opacity-80">
          <p class="p-16 text-center text-9xl">{{ data[0] }}</p>
          <p class="p-16 text-center text-9xl">{{ data[1] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import html2canvas from 'html2canvas'
import Canvas2Image from 'canvas2image-2'
import { isTemplateNode } from '@vue/compiler-core'
export default {
  setup() {
    const list = reactive([
      ['1513.TW', '中興電'],
      ['1605.TW', '華新'],
      ['2882.TW', '國泰金'],
      ['2891.TW', '中信金'],
      ['4114.TW', '健喬']
      ]
    )
    function parseCookie() {
      var cookieObj = {}
      var cookieAry = document.cookie.split(';')
      var cookie

      for (let i = 0, l = cookieAry.length; i < l; ++i) {
        cookie = cookieAry[i].trim()
        cookie = cookie.split('=')
        cookieObj[cookie[0]] = cookie[1]
      }

      return cookieObj
    }

    function getCookieByName(name) {
      var value = parseCookie()[name]
      if (value) {
        value = decodeURIComponent(value)
      }

      return value
    }
    const downloadImg = async function () {
      for (let i = 0; i <= list.length; i++) {
        const el = document.querySelector(`#igImg${i}`)

        const options = {
          width: 1000,
          height: 800,
          type: 'dataURL',
          useCORS: true,
        }
        html2canvas(el, options).then(function (canvas) {
          return Canvas2Image.saveAsJPEG(canvas, 1000, 800)
        })
      }
    }

    const TitleDownloadImg = async function () {
      const el = document.querySelector(`#titleImg`)

      const options = {
        width: 1000,
        height: 800,
        type: 'dataURL',
        useCORS: true,
      }
      html2canvas(el, options).then(function (canvas) {
        return Canvas2Image.saveAsJPEG(canvas, 1000, 800)
      })
    }
    return {
      list,
      downloadImg,
      TitleDownloadImg,
    }
  },
}
</script>



