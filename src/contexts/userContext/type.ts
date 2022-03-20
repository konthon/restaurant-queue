import { IUser } from 'interfaces/user'
import { Dispatch } from 'react'

export enum IUserDispatch {
  LOGIN = 'login',
  LOGOUT = 'logout',
}

export type IUserAction =
  | { type: IUserDispatch.LOGIN; payload: { user: IUser } }
  | { type: IUserDispatch.LOGOUT }

export interface IUserContext {
  user?: IUser
  dispatch: Dispatch<IUserAction>
}
