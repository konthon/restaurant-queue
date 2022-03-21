import { useEffect, useState } from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import 'bootstrap/dist/css/bootstrap.min.css'

import AdminRoutes from 'routes/AdminRoutes'
import Home from 'pages/home'
import Queues from 'pages/queues'
import MyRestaurants from 'pages/myRestaurants'

import AuthenModal from 'components/AuthenModal'
import { API_URL } from 'services/_base'
import { getUserByID } from 'services/users'
import { UserContext, useUserReducer } from 'contexts/userContext'
import { IUserDispatch } from 'contexts/userContext/type'
import { LS_USER } from 'config/constants'

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
    const getUserData = async (id: string) => {
      const response = await getUserByID(id)
      if (response.data) {
        userReducer.dispatch({
          type: IUserDispatch.LOGIN,
          payload: { user: response.data },
        })
        setIsOpenAuthen(false)
      }
    }
    const userID = localStorage.getItem(LS_USER)
    if (userID) {
      getUserData(userID)
    }
  }, [])

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
          <Route path='/queues' element={<Queues />} />
          <Route path='/my-restaurants' element={<MyRestaurants />} />
          <Route path='/admin/*' element={<AdminRoutes />} />
        </Routes>
        <ReactQueryDevtools />
        <AuthenModal show={isOpenAuthen} setShow={setIsOpenAuthen} />
      </QueryClientProvider>
    </UserContext.Provider>
  )
}

export default App
