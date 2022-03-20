import axios from 'axios'
import { USERS } from './_base'

export const getUsers = () => axios.get(USERS)
export const getUserByID = (id: string) => axios.get(`${USERS}/${id}`)
export const getUserByUsername = (username: string) =>
  axios.get(USERS, { params: { username } })

export const createUser = (data: any) => axios.post(USERS, data)

export const updateUser = (id: string, data: any) =>
  axios.patch(`${USERS}/${id}`, data)
