import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import "./i18n"
import '@fortawesome/fontawesome-free/css/all.min.css';

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
