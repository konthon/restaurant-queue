import axios from 'axios'
import { IUser } from 'interfaces/user'
import { USERS } from './_base'

export const getUsers = () => axios.get<IUser[]>(USERS)
export const getUserByID = (id: string) => axios.get<IUser>(`${USERS}/${id}`)
export const getUserByUsername = (username: string) =>
  axios.get<IUser[]>(USERS, { params: { username } })

export const createUser = (data: IUser) => axios.post<IUser>(USERS, data)

export const updateUser = (id: string, data: Partial<IUser>) =>
  axios.patch(`${USERS}/${id}`, data)
