import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/index.css'
import {BrowserRouter} from 'react-router-dom'

//language
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import translationPL from './locales/pl/translation.json';
import translationEN from './locales/en/translation.json';


i18n.init({
  interpolation: { escapeValue: false },
  lng: 'pl',
  resources: {
    en: {
      translation: translationEN
    },
    pl: {
      translation: translationPL
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
