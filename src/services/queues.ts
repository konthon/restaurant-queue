import axios from 'axios'
import { QUEUES } from './_base'

export const getQueues = () => axios.get(QUEUES)
export const getQueuesOfRestaurant = () => axios.get(QUEUES)

export const createQueueOfRestaurant = (data: any) => axios.post(QUEUES, data)

export const deleteQueue = (id: string) => axios.delete(`${QUEUES}/${id}`)
