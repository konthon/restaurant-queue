import React from 'react'
import { Route, Routes } from 'react-router-dom'

import AdminQueues from 'pages/admin/queues'
import AdminRestaurants from 'pages/admin/restaurants'
import AdminUsers from 'pages/admin/users'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='/queues' element={<AdminQueues />} />
      <Route path='/restaurants' element={<AdminRestaurants />} />
      <Route path='/users' element={<AdminUsers />} />
    </Routes>
  )
}

export default AdminRoutes
