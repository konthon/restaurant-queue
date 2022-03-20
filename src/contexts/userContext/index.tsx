import { createContext, useContext, useReducer } from 'react'
import { initialState, reducer } from './reducer'
import type { IUserContext } from './type'

export const initialUserContext: IUserContext = {
  user: initialState,
  dispatch: () => {},
}
export const UserContext = createContext<IUserContext>(initialUserContext)

export const useUser = () => useContext(UserContext)

export const useUserReducer = () => {
  const [user, dispatch] = useReducer(reducer, initialState)
  return { user, dispatch }
}
