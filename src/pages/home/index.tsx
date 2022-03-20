import React from 'react'
import { Container } from 'react-bootstrap'

import MainLayout from 'layouts/MainLayout'
import Sidebar from 'components/Sidebar'
import HeaderRestaurant from 'components/HeaderRestaurant'
import QueueRestaurant from 'components/QueueRestaurant'

const Home: React.FC = () => {
  return (
    <MainLayout>
      <Container className='d-flex gap-3 pt-3'>
        <Sidebar />
        <div className='main-content flex-grow-1'>
          <HeaderRestaurant />
          <hr />
          <QueueRestaurant />
        </div>
      </Container>
    </MainLayout>
  )
}

export default Home
