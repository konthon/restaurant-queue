export enum StatusType {
  IN_QUEUE = 'in-queue',
  DONE = 'done',
  SKIP = 'skip',
  CANCELED = 'canceled',
}

export interface IQueue {
  id: string
  queueNumber: number
  userID: string
  restaurantID: string
  createAt: number
  updateAt: number
  status: StatusType
}
