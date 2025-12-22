import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { Toaster } from '@/components/ui/sonner'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      closeButton
      richColors
      toastOptions={{
        duration: 2000,
        className: 'bg-background border border-border shadow-lg rounded-xl',
        descriptionClassName: 'text-muted-foreground',
      }}
    />
  </StrictMode>,
)
