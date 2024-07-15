import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'

import global_en from './locales/en/global.json'
import global_pt from './locales/pt/global.json'

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'auto',
  fallbackLng: 'en',
  resources: {
    en: {
      global: global_en,
    },
    pt: {
      global: global_pt,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>,
)
