import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom';
import {Toster} from 'react-hot-toast';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toster position="bottom-right" />
    </BrowserRouter>
  </StrictMode>,
)
