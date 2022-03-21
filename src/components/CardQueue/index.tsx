import React from 'react'
import styled from 'styled-components'

import { IRestaurant } from 'interfaces/restaurant'
import { StatusType } from 'interfaces/queue'
import { Badge } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { getInQueue } from 'services/queues'
import { useUser } from 'contexts/userContext'

const formatQueueNumber = (num: number) =>
  num.toLocaleString('th', { minimumIntegerDigits: 3 })

interface IProps {
  queueNumber: number
  timeStamp: number
  status: StatusType
  restaurant?: IRestaurant
}

const CardWrapper = styled.div`
  background-color: var(--bs-light);
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #dee2e6;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  width: 280px;
  .restaurant-name {
    font-size: 1.25rem;
    font-weight: 600;
  }
  .queue-number {
    font-weight: 400;
    font-size: 3rem;
  }
`

const CardQueue: React.FC<IProps> = (props) => {
  const { queueNumber, timeStamp, status, restaurant } = props
  const time = new Date(timeStamp)

  const { user } = useUser()

  const { data: inQueue } = useQuery(
    ['queue', 'in-queue', restaurant?.id, timeStamp, user?.id],
    () => getInQueue(restaurant?.id || '', timeStamp, user?.id || ''),
    { enabled: !!restaurant?.id && !!user?.id }
  )

  return (
    <CardWrapper>
      <Badge>{status}</Badge>
      <div className='restaurant-name'>{restaurant?.name}</div>
      <div>Your queue number:</div>
      <div className='queue-number'>{formatQueueNumber(queueNumber)}</div>
      <div>Before you: {(inQueue?.data.length || 1) - 1}</div>
      <hr className='my-2' />
      <div className='d-flex justify-content-between'>
        <div>{time.toLocaleDateString('th')}</div>
        <div>{time.toLocaleTimeString('th')}</div>
      </div>
    </CardWrapper>
  )
}

export default CardQueue
