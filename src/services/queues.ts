import axios from 'axios'
import { IQueue, StatusType } from 'interfaces/queue'

import { QUEUES } from './_base'

export const getQueues = () => axios.get(QUEUES)
export const getQueuesOfRestaurant = (id: string, status?: StatusType) =>
  axios.get<IQueue[]>(QUEUES, { params: { restaurantID: id, status } })

export const createQueueOfRestaurant = (data: IQueue) =>
  axios.post<IQueue>(QUEUES, data)

export const deleteQueue = (id: string) => axios.delete(`${QUEUES}/${id}`)
