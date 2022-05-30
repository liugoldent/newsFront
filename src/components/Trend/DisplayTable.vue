<template>
  <div class="flex flex-row justify-center items-center flex-wrap">
    <div
      class="flex flex-col justify-center items-center m-10"
      v-for="keyName in Object.keys(webList)"
      :key="keyName"
    >
      <!-- 上層色塊 -->
      <div
        class="h-20 w-72 z-10 rounded-lg relative top-12"
        :class="webList[keyName].classColor"
      ></div>
      <!-- title層 -->
      <div
        class="
          h-10
          w-44
          bg-slate-200
          shadow-md shadow-slate-400
          rounded-lg
          border
          z-30
          flex flex-col
          justify-center
          items-center
        "
      >
        <p>{{ webList[keyName].title }}</p>
      </div>
      <!-- 列表層 -->
      <div
        class="
          h-96
          w-96
          bg-slate-300
          shadow-2xl shadow-slate-400
          relative
          -top-5
          border
          rounded-lg
          z-20
          flex flex-col
          justify-center
          flex-wrap
          items-start
        "
      >
        <div
          class="ml-10"
          v-for="product in webList[keyName].product"
          :key="product.productName"
        >
          <li v-if="product.productHref.length > 0" class="m-1 text-blue-600	underline underline-offset-2">
            <a :href="product.productHref"> {{ product.productName }}</a>
          </li>
          <li v-else class="m-1">{{ product.productName }}</li>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: ['webList'],
  setup(props) {
    let keyOfWeb = Object.keys(props.webList)
    return {
      keyOfWeb,
    }
  },
}
</script>
