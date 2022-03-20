import React from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import 'bootstrap/dist/css/bootstrap.min.css'

import Home from 'pages/home'
import { API_URL } from 'services/_base'
import AdminRoutes from 'routes/AdminRoutes'

axios.defaults.baseURL = API_URL

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin/*' element={<AdminRoutes />} />
      </Routes>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
