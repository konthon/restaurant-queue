import axios from 'axios'
import { IQueue, StatusType } from 'interfaces/queue'

import { QUEUES } from './_base'

export const getQueues = () => axios.get<IQueue[]>(QUEUES)
export const getQueuesOfRestaurant = (id: string, status?: StatusType) =>
  axios.get<IQueue[]>(QUEUES, { params: { restaurantID: id, status } })

export const createQueueOfRestaurant = (data: IQueue) =>
  axios.post<IQueue>(QUEUES, data)
export const updateQueue = (id: string, data: Partial<IQueue>) =>
  axios.patch<IQueue>(`${QUEUES}/${id}`, data)
export const deleteQueue = (id: string) => axios.delete(`${QUEUES}/${id}`)

export const getQueueByUserID = (id: string) =>
  axios.get<IQueue[]>(QUEUES, { params: { userID: id } })

export const getInQueue = (
  restaurantID: string,
  maxTime: number,
  userID: string
) =>
  axios.get<IQueue[]>(QUEUES, {
    params: {
      status: 'in-queue',
      restaurantID,
      userID,
      updateAt_lte: maxTime,
    },
  })
