import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/tokens.css'
import './styles/global.css'
import './admin/admin.css'
import './styles/register.css'
createRoot(document.getElementById('root')).render(<App />)
