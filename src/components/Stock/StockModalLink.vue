<template>
  <div
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden w-full h-full"
  >
    <div class="relative p-4 w-full max-w-md h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          class="
            absolute
            top-3
            right-2.5
            text-gray-400
            bg-transparent
            hover:bg-gray-200 hover:text-gray-900
            rounded-lg
            text-sm
            p-1.5
            ml-auto
            inline-flex
            items-center
            dark:hover:bg-gray-800 dark:hover:text-white
          "
          @click="emit('closeModal', { no: '', code: '', name: '' })"
        >
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <!-- Modal header -->
        <div class="py-4 px-6 rounded-t border-b dark:border-gray-600">
          <h3
            class="
              text-base
              font-semibold
              text-gray-900
              lg:text-xl
              dark:text-white
            "
          >
            {{ propsToModal.code }} {{ propsToModal.name }}
          </h3>
        </div>
        <!-- Modal body -->
        <div class="p-6 sm:h-96 sm:overflow-y-scroll">
          <ul
            class="my-4 space-y-3 "
            v-for="eachWeb in linkWeb"
            :key="eachWeb.name"
          >
            <li>
              <a
                :href="eachWeb.frontHref + propsToModal.code + eachWeb.backHref"
                class="
                  flex
                  items-center
                  p-3
                  text-base
                  font-bold
                  text-gray-900
                  bg-gray-50
                  rounded-lg
                  hover:bg-gray-100
                  group
                  hover:shadow
                  dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white
                "
              >
                <span class="flex-1 ml-3 whitespace-nowrap">{{
                  eachWeb.name
                }}</span>
                <span
                  class="
                    inline-flex
                    items-center
                    justify-center
                    px-2
                    py-0.5
                    ml-3
                    text-xs
                    font-medium
                    text-gray-500
                    bg-gray-200
                    rounded
                    dark:bg-gray-700 dark:text-gray-400
                  "
                  ><font-awesome-icon icon="link" />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLink } from '@fortawesome/free-solid-svg-icons'

library.add(faLink)
export default {
  name: 'StockModalLink',
  props: ['propsToModal', 'linkWeb'],
  setup(props, { emit }) {
    return {
      emit,
    }
  },
}
</script>
