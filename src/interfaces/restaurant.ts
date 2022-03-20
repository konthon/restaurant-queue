export interface ISlot {
  id?: string
  label?: string
  start: Date
  end: Date
}

export interface IImage {
  id?: string
  url: string
  alt?: string
}

export interface IRestaurant {
  name: string
  description?: string
  slots?: ISlot[]
  cover?: IImage
  images?: IImage[]
}
