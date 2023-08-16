import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './assets/index.css'

import App from './App.jsx'
import { AuthProvider } from '@/context/authenticationContext'
import { SocketProvider } from '@/context/socketContext';
//language
import { I18nextProvider } from 'react-i18next';
import { initTranslation } from './locales/_initTranslation'

const translations = initTranslation();
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <AuthProvider>
      <SocketProvider>
          <BrowserRouter>
            <I18nextProvider i18n={translations}>
              <App />
            </I18nextProvider>
         </BrowserRouter>
         </SocketProvider>
    </AuthProvider>
  </React.StrictMode>,
)
