import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Application'
// import './index.css'
import { BrowserRouter } from "react-router-dom"
import '../src/styles/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
