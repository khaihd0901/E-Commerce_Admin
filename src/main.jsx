import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>,
)

console.log(document.getElementById('root'))
console.log('main.jsx loaded')