import React from 'react'

import AdminLayout from 'layouts/AdminLayout'
import { useQuery } from 'react-query'
import { getQueues } from 'services/queues'

const AdminQueues: React.FC = () => {
  const { data: queues } = useQuery(['queues'], () => getQueues())
  console.log(queues?.data)
  return <AdminLayout>AdminQueues</AdminLayout>
}

export default AdminQueues
