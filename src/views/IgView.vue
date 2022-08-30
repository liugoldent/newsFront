<template >
  <div class="mt-10">
    <button @click="downloadImg()">download /</button>
    <button @click="TitleDownloadImg()">TitleDownloadImg</button>
    <div class="m-5 flex flex-col justify-center items-center" id="titleImg">
      <img src="https://picsum.photos/1000/800?random=100" />
      <div class="absolute rounded-lg bg-slate-200 opacity-80">
        <p class="p-16 text-center text-9xl">0803</p>
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
export default {
  setup() {
    const list = reactive([
      ['4114.TW', '健喬'],
      ['6116.TW', '彩晶'],
    ])
    const downloadImg = async function () {
      for (let i = 1; i <= 1; i++) {
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



