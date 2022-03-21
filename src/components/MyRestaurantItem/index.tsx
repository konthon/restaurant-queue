import React from 'react'
import styled from 'styled-components'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { IRestaurant } from 'interfaces/restaurant'
import { getQueuesOfRestaurant, updateQueue } from 'services/queues'
import { Badge, Button } from 'react-bootstrap'
import { IQueue } from 'interfaces/queue'

const formatQueueNumber = (num: number) =>
  num.toLocaleString('th', { minimumIntegerDigits: 3 })

interface IProps {
  restaurant?: IRestaurant
}

const CardWrapper = styled.div`
  background-color: var(--bs-light);
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #dee2e6;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  width: 280px;
`

const MyRestaurantItem: React.FC<IProps> = (props) => {
  const { restaurant } = props
  const { data: queues } = useQuery(
    ['queues', 'in-queue', restaurant?.id],
    () => getQueuesOfRestaurant(restaurant?.id || '', 'in-queue'),
    { enabled: !!restaurant?.id }
  )

  const queryClient = useQueryClient()
  const updateQueueMutation = useMutation(
    ({ id, data }: { id: string; data: Partial<IQueue> }) =>
      updateQueue(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['queues', 'in-queue', restaurant?.id])
      },
    }
  )

  return (
    <div>
      <div className='mb-3'>{restaurant?.name}</div>
      <div className='d-flex gap-3'>
        {queues?.data.map((queue, index) => (
          <CardWrapper key={queue.id}>
            {index === 0 && <Badge bg='success'>now</Badge>}
            <div>
              Queue number:
              <div className='h3'>{formatQueueNumber(queue.queueNumber)}</div>
            </div>
            {index === 0 && (
              <>
                <hr />
                <div className='d-flex justify-content-end'>
                  <Button
                    variant='outline-primary'
                    className='me-2'
                    onClick={() =>
                      updateQueueMutation.mutate({
                        id: queue.id,
                        data: { status: 'skip' },
                      })
                    }
                  >
                    Skip
                  </Button>
                  <Button
                    onClick={() =>
                      updateQueueMutation.mutate({
                        id: queue.id,
                        data: { status: 'done' },
                      })
                    }
                  >
                    Done
                  </Button>
                </div>
              </>
            )}
          </CardWrapper>
        ))}
      </div>
    </div>
  )
}

export default MyRestaurantItem
