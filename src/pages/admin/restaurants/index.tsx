import React from 'react'
import { Button, Ratio, Table } from 'react-bootstrap'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import AdminLayout from 'layouts/AdminLayout'
import { deleteRestaurant, getRestaurants } from 'services/restaurants'

interface IImageItem {
  src: string
  alt?: string
}
const ImageItem: React.FC<IImageItem> = (props) => {
  const { src, alt } = props
  return (
    <Ratio>
      <img src={src} alt={alt} style={{ objectFit: 'cover' }} />
    </Ratio>
  )
}

const AdminRestaurants: React.FC = () => {
  const { data: restaurants } = useQuery(['restaurants'], () =>
    getRestaurants()
  )

  const queryClient = useQueryClient()
  const deleteMutation = useMutation((id: string) => deleteRestaurant(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['restaurants'])
    },
  })

  return (
    <>
      <AdminLayout>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Actions</th>
              <th>Name</th>
              <th>Description</th>
              <th>Queue Index</th>
              <th>Owners</th>
              <th>Cover</th>
              <th>Photos</th>
            </tr>
          </thead>
          <tbody>
            {restaurants?.data.map((restaurant, index) => (
              <tr key={restaurant.id}>
                <td>{index + 1}</td>
                <td>
                  <Button size='sm' variant='warning'>
                    Edit
                  </Button>
                  <Button
                    size='sm'
                    variant='danger'
                    onClick={() => deleteMutation.mutate(restaurant.id)}
                  >
                    Delete!
                  </Button>
                </td>
                <td>{restaurant.name}</td>
                <td>{restaurant.description}</td>
                <td>{restaurant.queueIndex}</td>
                <td>{restaurant.ownerUserIDs.join()}</td>
                <td>
                  <ImageItem
                    src={restaurant.cover.src}
                    alt={restaurant.cover.alt}
                  />
                </td>
                <td>
                  {restaurant.photos.map((photo, index) => (
                    <ImageItem key={index} src={photo.src} alt={photo.alt} />
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </AdminLayout>
    </>
  )
}

export default AdminRestaurants
