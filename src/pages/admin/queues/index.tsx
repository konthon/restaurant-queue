import React from 'react'
import { useQuery } from 'react-query'
import { Table } from 'react-bootstrap'

import AdminLayout from 'layouts/AdminLayout'
import { getQueues } from 'services/queues'
import { IQueue } from 'interfaces/queue'
import { getUserByID } from 'services/users'
import { getRestaurantByID } from 'services/restaurants'

interface ITableRowData {
  queue: IQueue
  index: number
}
const TableRowData: React.FC<ITableRowData> = (props) => {
  const { queue, index } = props
  const { data: user } = useQuery(['user', queue.userID], () =>
    getUserByID(queue.userID)
  )
  const { data: restaurant } = useQuery(
    ['restaurant', queue.restaurantID],
    () => getRestaurantByID(queue.restaurantID)
  )
  return (
    <tr key={queue.id}>
      <td>{index + 1}</td>
      <td>{restaurant?.data.name}</td>
      <td>{queue.status}</td>
      <td>{user?.data.username}</td>
      <td>{new Date(queue.createAt).toLocaleString('th')}</td>
      <td>{new Date(queue.updateAt).toLocaleString('th')}</td>
    </tr>
  )
}

const AdminQueues: React.FC = () => {
  const { data: queues } = useQuery(['queues'], () => getQueues())
  return (
    <AdminLayout>
      <Table>
        <thead>
          <tr>
            <th>No</th>
            <th>Restaurant</th>
            <th>Status</th>
            <th>Username</th>
            <th>Create At</th>
            <th>Update At</th>
          </tr>
        </thead>
        <tbody>
          {queues?.data.map((queue, index) => (
            <TableRowData key={queue.id} queue={queue} index={index} />
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  )
}

export default AdminQueues
