import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import PartidoDetail from './components/PartidoDetail'
import LigaDetail from './components/LigaDetail'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/partido/:id" element={<PartidoDetail />} />
        <Route path="/liga/:id" element={<LigaDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
