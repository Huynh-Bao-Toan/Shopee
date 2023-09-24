import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
//en
import PRODUCT_LIST_EN from '~/locales/en/PRODUCT_LIST.json'
import MAIN_HEADER_EN from '~/locales/en/MAIN_HEADER.json'
//vi
import PRODUCT_LIST_VI from '~/locales/vi/PRODUCT_LIST.json'
import MAIN_HEADER_VI from '~/locales/vi/MAIN_HEADER.json'
export const allLanguage = {
  en: 'english',
  vi: 'tiếng việt'
}
export const resources = {
  en: {
    product_list: PRODUCT_LIST_EN,
    main_header: MAIN_HEADER_EN
  },
  vi: {
    product_list: PRODUCT_LIST_VI,
    main_header: MAIN_HEADER_VI
  }
}
export const defaultNS = 'product_list'
i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  fallbackLng: 'vi',
  defaultNS,
  ns: ['product_list', 'main_header'],
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})

export default i18n
