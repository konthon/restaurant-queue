import { connectDatabaseEmulator, ref, child } from 'firebase/database'
import { database } from 'config/firebase'

// TODO: remove before take in
if (process.env.NODE_ENV === 'development') {
  connectDatabaseEmulator(database, 'localhost', 9000)
}

export const dbRef = (path?: string) => ref(database, path)
export const childRef = (path: string) => child(ref(database), path)

export const USER = 'users'
export const RESTAURANT = 'restaurants'
export const QUEUE = 'queues'
