<template>
  <div
    class="
      h-96
      w-96
      bg-slate-200
      flex flex-col
      justify-start
      items-center
      border
      rounded-lg
      shadow-md drop-shadow-lg
    "
    :class="shadowColor"
  >
    <div
      class="
        flex flex-row
        justify-start
        items-center
        w-full
        h-24
        border-gray-600 border-double border-b-4
      "
    >
      <h1 class="text-slate-800 text-2xl ml-8 mr-4">{{ signalData.code }}</h1>
      <h1 class="text-slate-800 text-2xl">{{ signalData.name }}</h1>
    </div>
    <div class="flex flex-col justify-start items-start w-full h-72">
      <p class="text-slate-800 ml-4 mt-1 text-xl">
        成交價：{{ signalData.dealprice }}
      </p>
      <p class="text-slate-800 ml-4 mt-2 text-xl">
        成交量：{{ signalData.dealVolume }}
      </p>
      <p class="text-slate-800 ml-4 mt-2 text-xl">
        漲 / 跌（%）：{{ signalData.gain }}
      </p>
      <p class="text-slate-800 ml-4 mt-2 text-xl">
        外資買賣超：{{ signalData.foreignbuy }}
      </p>
      <p class="text-slate-800 ml-4 mt-2 text-xl">
        投信買賣超：{{ signalData.localbuy }}
      </p>
      <p class="text-slate-800 ml-4 mt-2 text-xl">
        主力買賣超：{{ signalData.main }}
      </p>
      <p class="text-slate-800 ml-4 mt-2 text-xl">
        融資增減張數：{{ signalData.lending }}
      </p>
      <p class="text-slate-800 ml-4 mt-2 text-xl">
        融券增減張數：{{ signalData.borrowing }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['signalData', 'shadowColor'],
  setup(props) {
    console.log(props.shadowColor)
  },
}
</script>
