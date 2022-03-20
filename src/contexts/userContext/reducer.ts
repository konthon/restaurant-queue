import { IUserAction, IUserContext, IUserDispatch } from './type'

export const initialState: IUserContext['user'] = undefined

export const reducer = (state: IUserContext['user'], action: IUserAction) => {
  switch (action.type) {
    case IUserDispatch.LOGIN:
      return action.payload.user
    case IUserDispatch.LOGOUT:
      return initialState
    default:
      throw new Error('No action type')
  }
}
