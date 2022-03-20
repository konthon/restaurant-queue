export interface IPhoto {
  src: string
  alt?: string
}

export interface IRestaurant {
  id: string
  name: string
  description: string
  cover: IPhoto
  photos: IPhoto[]
  queueIndex: number
  ownerUserIDs: string[]
}
