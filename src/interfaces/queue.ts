export type StatusType = 'in-queue' | 'done' | 'skip' | 'canceled'

export interface IQueue {
  id: string
  queueNumber: number
  userID: string
  restaurantID: string
  createAt: number
  updateAt: number
  status: StatusType
}
