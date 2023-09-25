import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './i18n'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import ErrorBoundary from './components/ErrorBoundary'
import { HelmetProvider } from 'react-helmet-async'
// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    }
  }
})
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
            {/* The rest of your application */}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </Provider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
)
