import React from 'react'
import { Ratio, Table } from 'react-bootstrap'
import { useQuery } from 'react-query'

import AdminLayout from 'layouts/AdminLayout'
import { getRestaurants } from 'services/restaurants'

interface IImageItem {
  src: string
  alt?: string
}
const ImageItem: React.FC<IImageItem> = (props) => {
  const { src, alt } = props
  return (
    <Ratio>
      <img src={src} alt={alt} />
    </Ratio>
  )
}

const AdminRestaurants: React.FC = () => {
  const { data: restaurants } = useQuery(['restaurants'], () =>
    getRestaurants()
  )

  return (
    <AdminLayout>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Edit</th>
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
              <td></td>
              <td>{restaurant.name}</td>
              <td>{restaurant.description}</td>
              <td>{restaurant.queueIndex}</td>
              <td>{restaurant.ownerUserIDs.map((id) => id)}</td>
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
  )
}

export default AdminRestaurants
