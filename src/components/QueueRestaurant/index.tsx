import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { createQueueOfRestaurant, getQueuesOfRestaurant } from 'services/queues'
import { v4 as uuid } from 'uuid'

import { IQueue } from 'interfaces/queue'
import { getRestaurantByID, updateRestaurant } from 'services/restaurants'
import { useUser } from 'contexts/userContext'
import { IRestaurant } from 'interfaces/restaurant'

interface IProps {
  selectedID: string | null
}

const QueueRestaurant: React.FC<IProps> = (props) => {
  const { selectedID } = props
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false)
  const { user } = useUser()

  const { data: restaurant } = useQuery(
    ['restaurant', selectedID],
    () => getRestaurantByID(selectedID || ''),
    { enabled: selectedID !== null }
  )
  const { data: queues } = useQuery(
    ['queues', 'in-queue', selectedID],
    () => getQueuesOfRestaurant(selectedID || '', 'in-queue'),
    { enabled: selectedID !== null }
  )

  const queryClient = useQueryClient()
  const updateRestaurantMutation = useMutation(
    ({ id, data }: { id: string; data: Partial<IRestaurant> }) =>
      updateRestaurant(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['restaurant', selectedID])
        setIsOpenConfirmModal(false)
      },
    }
  )
  const createQueueMutation = useMutation(
    (data: IQueue) => createQueueOfRestaurant(data),
    {
      onSuccess: () => {
        updateRestaurantMutation.mutate({
          id: selectedID || '',
          data: { queueIndex: (restaurant?.data.queueIndex || 0) + 1 },
        })
        queryClient.invalidateQueries(['queues', 'in-queue', selectedID])
      },
    }
  )

  const onCancel = () => setIsOpenConfirmModal(false)
  const onConfirm = async () => {
    if (selectedID && restaurant?.data.queueIndex !== undefined) {
      const now = +new Date()
      const nextQueue = restaurant.data.queueIndex + 1
      const data: IQueue = {
        id: uuid(),
        queueNumber: nextQueue,
        userID: user?.id || '',
        restaurantID: selectedID || '',
        createAt: now,
        updateAt: now,
        status: 'in-queue',
      }
      // TODO: done task
      createQueueMutation.mutate(data)
    }
  }

  if (!selectedID) {
    return null
  }
  return (
    <>
      <hr />
      <section className='slots'>
        <h3>Queue</h3>
        <div>In queue now: {queues?.data.length}</div>
        <Button onClick={() => setIsOpenConfirmModal(true)}>Get queue!</Button>
      </section>
      <Modal
        show={isOpenConfirmModal}
        onHide={onCancel}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header>Confirm your choice?</Modal.Header>
        <Modal.Body>
          Get the queue of <b>{restaurant?.data.name}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='light' onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default QueueRestaurant
