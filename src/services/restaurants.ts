import axios from 'axios'

import { IRestaurant } from 'interfaces/restaurant'

import { RESTAURANTS } from './_base'

export const getRestaurants = (q?: string) => {
  if (q) {
    return axios.get<IRestaurant[]>(RESTAURANTS, { params: { name_like: q } })
  }
  return axios.get<IRestaurant[]>(RESTAURANTS)
}
export const getRestaurantByID = (id: string) =>
  axios.get<IRestaurant>(`${RESTAURANTS}/${id}`)

export const createRestaurant = (data: IRestaurant) =>
  axios.post(RESTAURANTS, data)
export const updateRestaurant = (id: string, data: Partial<IRestaurant>) =>
  axios.patch(`${RESTAURANTS}/${id}`, data)
export const deleteRestaurant = (id: string) =>
  axios.delete(`${RESTAURANTS}/${id}`)
