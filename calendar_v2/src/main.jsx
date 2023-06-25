import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {SlotsProvider} from '@/context/slotsContext';

import './assets/index.css'

import App from './App.jsx'
import { AuthProvider } from '@/context/authenticationContext'

//language
import { I18nextProvider } from 'react-i18next';
import { initTranslation } from './locales/_initTranslation'

const translations = initTranslation();
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <AuthProvider>
        <SlotsProvider>
          <BrowserRouter>
            <I18nextProvider i18n={translations}>
              <App />
            </I18nextProvider>
         </BrowserRouter>
      </SlotsProvider>
    </AuthProvider>
  </React.StrictMode>,
)
