import React, { useState } from 'react'
import { Container } from 'react-bootstrap'

import MainLayout from 'layouts/MainLayout'
import Sidebar from 'components/Sidebar'
import HeaderRestaurant from 'components/HeaderRestaurant'
import QueueRestaurant from 'components/QueueRestaurant'

const Home: React.FC = () => {
  const [selectedRestaurantID, setSelectedRestaurantID] = useState<
    string | null
  >(null)

  return (
    <MainLayout>
      <Container className='d-flex gap-3 pt-3'>
        <Sidebar setSelectedID={setSelectedRestaurantID} />
        <div className='main-content flex-grow-1'>
          <HeaderRestaurant selectedID={selectedRestaurantID} />
          <hr />
          <QueueRestaurant selectedID={selectedRestaurantID} />
        </div>
      </Container>
    </MainLayout>
  )
}

export default Home
