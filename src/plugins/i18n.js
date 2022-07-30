import { createI18n } from 'vue-i18n'
// 載入語言
import tw from '@/locales/tw.json'
import en from '@/locales/en.json'

const datetimeFormats = {
  'en': {
    // 短格式
    short: {
      year: 'numeric', month: 'numeric', day: 'numeric'
    },
    // 長格式
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric'
    },
    dateNormal: {
      dateStyle: 'short'
    }
  },
  'tw': {
    short: {
      year: 'numeric', month: 'numeric', day: 'numeric'
    },
    long: {
      year: 'numeric',  day: 'numeric', month: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: true
    },
    dateNormal: {
      dateStyle: 'long'
    }
  }
}

const i18n = createI18n({
  legacy: false,          // in composition API use
  locale: 'tw',           // 設定語言
  fallbackLocale: 'tw',   // 若選擇的語言缺少翻譯則退回的語言
  messages: {
    tw,
    en
  },
  datetimeFormats
})
export default i18n
