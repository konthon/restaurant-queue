export enum RoleType {
  ADMIN = 'admin',
  USER = 'user',
  OWNER = 'owner',
}

export interface IUser {
  id: string
  username: string
  password: string
  queueIDs: string[]
  roles: RoleType[]
  ownedRestaurantIDs: string[]
}
