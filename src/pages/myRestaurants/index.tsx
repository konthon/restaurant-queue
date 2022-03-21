import React from 'react'
import { Container } from 'react-bootstrap'
import { useQueries } from 'react-query'

import MainLayout from 'layouts/MainLayout'
import { useUser } from 'contexts/userContext'
import { getRestaurantByID } from 'services/restaurants'
import MyRestaurantItem from 'components/MyRestaurantItem'

const MyRestaurants: React.FC = () => {
  const { user } = useUser()
  const restaurants = useQueries(
    (user?.ownedRestaurantIDs || []).map((rID) => ({
      queryKey: ['restaurant', rID],
      queryFn: () => getRestaurantByID(rID),
    }))
  )
  console.log(restaurants.map((re) => re.data?.data))
  return (
    <MainLayout>
      <Container>
        <section>
          <h2>My Restaurants</h2>
          {restaurants.map((restaurant) => (
            <MyRestaurantItem
              key={restaurant.data?.data.id}
              restaurant={restaurant.data?.data}
            />
          ))}
        </section>
      </Container>
    </MainLayout>
  )
}

export default MyRestaurants
