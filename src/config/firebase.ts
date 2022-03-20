import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyCwVWM8SxsyaXV2KUhz3EGCYgMdZYbOeeM',
  authDomain: 'restaurant-queue-test.firebaseapp.com',
  databaseURL:
    'https://restaurant-queue-test-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'restaurant-queue-test',
  storageBucket: 'restaurant-queue-test.appspot.com',
  messagingSenderId: '709055582589',
  appId: '1:709055582589:web:6b77a5d64ac267b3a23c14',
}

const firebaseApp = initializeApp(firebaseConfig)
const database = getDatabase(firebaseApp)

export { firebaseConfig, firebaseApp, database }
