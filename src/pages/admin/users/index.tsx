import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import AdminLayout from 'layouts/AdminLayout'
import { deleteUser, getUsers } from 'services/users'
import { Button, Table } from 'react-bootstrap'

const AdminUsers: React.FC = () => {
  const { data: users } = useQuery(['users'], () => getUsers())

  const queryClient = useQueryClient()
  const deleteMutation = useMutation((id: string) => deleteUser(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    },
  })
  return (
    <AdminLayout>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Actions</th>
            <th>username</th>
            <th>Queue IDs</th>
            <th>Roles</th>
            <th>Owned</th>
          </tr>
        </thead>
        <tbody>
          {users?.data.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>
                <Button size='sm' variant='warning'>
                  Edit
                </Button>
                <Button
                  size='sm'
                  variant='danger'
                  onClick={() => deleteMutation.mutate(user.id)}
                >
                  Delete!
                </Button>
              </td>
              <td>{user.username}</td>
              <td>{user.roles.join()}</td>
              <td>{user.ownedRestaurantIDs.join()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  )
}

export default AdminUsers
