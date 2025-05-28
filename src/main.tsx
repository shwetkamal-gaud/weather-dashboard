import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import QueryProviders from './QueryProvider.tsx'
import { UserProvider } from './context/UserContext.tsx'
import { WeatherProvider } from './context/WeatherContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProviders>
      <UserProvider>
        <WeatherProvider>
          <App />
        </WeatherProvider>
      </UserProvider>
    </QueryProviders>
  </StrictMode>,
)
