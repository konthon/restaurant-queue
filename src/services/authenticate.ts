import { v4 as uuid } from 'uuid'
import bcrypt from 'bcryptjs'

import { createUser, getUserByUsername } from './users'
import { IUser } from 'interfaces/user'
import { LS_USER } from 'config/constants'

export const login = async (username: string, password: string) => {
  const user = await getUserByUsername(username)
  if (user.data.length > 0) {
    const isCorrectPassword = bcrypt.compareSync(
      password,
      user.data[0].password
    )
    if (isCorrectPassword) {
      localStorage.setItem(LS_USER, user.data[0].id)
      return { user: user.data[0], isInvalid: false, isSuccess: true }
    }
    return { user: null, isInvalid: true, isSuccess: false }
  }
  return { user: null, isInvalid: true, isSuccess: false }
}

export const loginAsGuest = async () => {
  const now = new Date()
  const username = `Guest-${+now}`
  const guest: IUser = {
    id: uuid(),
    username,
    password: '',
    ownedRestaurantIDs: [],
    queueIDs: [],
    roles: ['user'],
  }
  const user = await createUser(guest)
  if (user.status === 201) {
    localStorage.setItem(LS_USER, user.data.id)
    return { user: user.data, isInvalid: false, isSuccess: true }
  }
  return { user: null, isInvalid: true, isSuccess: false }
}

export const signUp = async (username: string, password: string) => {
  const found = await getUserByUsername(username)
  if (found.data.length === 0) {
    const newUser: IUser = {
      id: uuid(),
      username,
      password: bcrypt.hashSync(password),
      ownedRestaurantIDs: [],
      queueIDs: [],
      roles: ['user'],
    }
    const user = await createUser(newUser)
    if (user.status === 201) {
      localStorage.setItem(LS_USER, user.data.id)
      return { user: user.data, isInvalid: false, isSuccess: true }
    }
    return { user: null, isInvalid: true, isSuccess: false }
  }
  return { user: null, isInvalid: true, isSuccess: false }
}

export const logout = () => {
  localStorage.removeItem(LS_USER)
  return { user: null, isInvalid: true, isSuccess: false }
}
