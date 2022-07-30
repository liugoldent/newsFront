<template>
  <div class="hello">
    <h1>{{ $t('__hello_world', {'codeName': 'JAVA'}) }}</h1>
    <select @change="handleChangeLanguage">
      <option value="tw">中文</option>
      <option value="en">English</option>
    </select>
    <i18n-t keypath="intro" tag="p">
      <template #newline>
        <br />
      </template>
      <template #doc>
        <a href="https://cli.vuejs.org" target="_blank">
          {{ $t('vueCliDoc')}}
        </a>
      </template>
    </i18n-t>
    <p>{{ $d(new Date(), 'a') }}</p>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'
export default {
  props: {
    msg: String
  },
  setup(props, context) {
    const { locale } = useI18n()
    const handleChangeLanguage = (e) => {
      console.log(locale.value)
      locale.value = e.target.value;
    };
    return {
      handleChangeLanguage
    }
  },
}
</script>
