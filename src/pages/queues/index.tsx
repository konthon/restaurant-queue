import React, { useMemo } from 'react'
import { Container } from 'react-bootstrap'
import { useQueries, useQuery } from 'react-query'

import MainLayout from 'layouts/MainLayout'
import { useUser } from 'contexts/userContext'
import { getQueueByUserID } from 'services/queues'
import { getRestaurantByID } from 'services/restaurants'
import CardQueue from 'components/CardQueue'

const Queues: React.FC = () => {
  const { user } = useUser()
  const { data: queues } = useQuery(
    ['queues', user?.id],
    () => getQueueByUserID(user?.id || ''),
    { enabled: !!user?.id }
  )
  const restaurants = useQueries(
    (queues?.data || []).map((queue) => ({
      queryKey: ['restaurant', queue.restaurantID],
      queryFn: () => getRestaurantByID(queue.restaurantID),
    }))
  )

  const queueInQueue = useMemo(
    () => queues?.data.filter((q) => q.status === 'in-queue') || [],
    [queues]
  )
  const queueDone = useMemo(
    () => queues?.data.filter((q) => q.status === 'done') || [],
    [queues]
  )

  return (
    <MainLayout>
      <Container>
        <h2>My Queues</h2>
        <hr />
        <section className='mb-5'>
          <h3>In Queue</h3>
          <div className='d-flex flex-wrap gap-3'>
            {queueInQueue.length > 0 ? (
              queueInQueue.map((queue) => {
                const thisRestaurant = restaurants.find(
                  (r) => r.data?.data.id === queue.restaurantID
                )?.data?.data
                return (
                  <CardQueue
                    key={queue.id}
                    queueNumber={queue.queueNumber}
                    restaurant={thisRestaurant}
                    timeStamp={queue.updateAt}
                    status={queue.status}
                  />
                )
              })
            ) : (
              <div className='text-muted'>No data</div>
            )}
          </div>
        </section>
        <section className='mb-5'>
          <h3>Done</h3>
          <div className='d-flex flex-wrap gap-3'>
            {queueDone.length > 0 ? (
              queueDone.map((queue) => {
                const thisRestaurant = restaurants.find(
                  (r) => r.data?.data.id === queue.restaurantID
                )?.data?.data
                return (
                  <CardQueue
                    key={queue.id}
                    queueNumber={queue.queueNumber}
                    restaurant={thisRestaurant}
                    timeStamp={queue.updateAt}
                    status={queue.status}
                  />
                )
              })
            ) : (
              <div className='text-muted'>No data</div>
            )}
          </div>
        </section>
      </Container>
    </MainLayout>
  )
}

export default Queues
