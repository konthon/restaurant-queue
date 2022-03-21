export type RoleType = 'admin' | 'user' | 'owner'

export interface IUser {
  id: string
  username: string
  password: string
  roles: RoleType[]
  ownedRestaurantIDs: string[]
}
