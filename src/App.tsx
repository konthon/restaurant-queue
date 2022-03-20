import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import 'bootstrap/dist/css/bootstrap.min.css'

import Home from 'pages/home'
import { API_URL } from 'services/_base'
import AdminRoutes from 'routes/AdminRoutes'
import AuthenModal from 'components/AuthenModal'
import { UserContext, useUserReducer } from 'contexts/userContext'

axios.defaults.baseURL = API_URL

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  const [isOpenAuthen, setIsOpenAuthen] = useState<boolean>(false)

  const userReducer = useUserReducer()

  useEffect(() => {
    if (!userReducer.user?.username) {
      setIsOpenAuthen(true)
    } else {
      setIsOpenAuthen(false)
    }
  }, [userReducer.user])

  return (
    <UserContext.Provider value={userReducer}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin/*' element={<AdminRoutes />} />
        </Routes>
        <ReactQueryDevtools />
        <AuthenModal show={isOpenAuthen} setShow={setIsOpenAuthen} />
      </QueryClientProvider>
    </UserContext.Provider>
  )
}

export default App
