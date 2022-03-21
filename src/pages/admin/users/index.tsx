import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query'

import AdminLayout from 'layouts/AdminLayout'
import { deleteUser, getUsers } from 'services/users'
import { IUser } from 'interfaces/user'
import { getRestaurantByID } from 'services/restaurants'

interface IUserRow {
  index: number
  onDelete: (userID: string) => void
  user: IUser
}
const UserRow: React.FC<IUserRow> = (props) => {
  const { index, onDelete, user } = props
  const restaurants = useQueries(
    user.ownedRestaurantIDs.map((res) => ({
      queryKey: ['restaurant', res],
      queryFn: () => getRestaurantByID(res),
    }))
  )
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        {/* <Button size='sm' variant='warning'>
          Edit
        </Button> */}
        <Button size='sm' variant='danger' onClick={() => onDelete(user.id)}>
          Delete!
        </Button>
      </td>
      <td>{user.username}</td>
      <td>{user.roles.join()}</td>
      <td>{restaurants.map((r) => r.data?.data.name).join()}</td>
    </tr>
  )
}

const AdminUsers: React.FC = () => {
  const { data: users } = useQuery(['users'], () => getUsers())

  const queryClient = useQueryClient()
  const deleteMutation = useMutation((id: string) => deleteUser(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    },
  })

  const onDelete = (userID: string) => deleteMutation.mutate(userID)

  return (
    <AdminLayout>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Actions</th>
            <th>username</th>
            <th>Roles</th>
            <th>Owned</th>
          </tr>
        </thead>
        <tbody>
          {users?.data.map((user, index) => (
            <UserRow
              key={user.id}
              index={index}
              user={user}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  )
}

export default AdminUsers
