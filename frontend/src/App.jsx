import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

//pages
import { HomePage } from './pages/HomePage'
import { AddLauncherPage } from './pages/AddLauncherPage'
import { LauncherDetailesPage } from './pages/LauncherDetailsPage'

//components


export const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="main-container">
      <BrowserRouter>
        <Routes>
          <Route path='/'  element={ <HomePage />}/>
          <Route path='/add-launcher-page'  element={ <AddLauncherPage />}/>
          <Route path='/launcher-detailes/:id'  element={ <LauncherDetailesPage />}/>
        </Routes>
      </BrowserRouter>
      </div>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  )
}

export default App
