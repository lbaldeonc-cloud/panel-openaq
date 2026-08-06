import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Se usa HashRouter (URLs con "#") en lugar de BrowserRouter porque
// GitHub Pages es un hosting estático: no puede redirigir sub-rutas como
// /estaciones/1/sensores a index.html al recargar la página. Con HashRouter
// todo el enrutado ocurre en el navegador y siempre carga index.html primero.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
