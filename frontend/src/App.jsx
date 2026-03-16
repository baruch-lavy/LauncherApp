import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

//pages
import { HomePage } from './pages/HomePage'
import {}

//components


function App() {

  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div className="main-container">
      <BrowserRouter>
        <Routes>
          <Route path='/'  element={ <HomePage />}/>
        </Routes>
      </BrowserRouter>
      </div>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  )
}

export default App
