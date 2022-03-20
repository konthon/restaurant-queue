import { set, get, push } from 'firebase/database'
import { IRestaurant } from 'interfaces/restaurant'
import { childRef, dbRef, RESTAURANT } from './_base'

class RestaurantService {
  getById(id?: string) {
    if (id) {
      return get(childRef(`${RESTAURANT}${id}`)).then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val()
        }
        return null
      })
    }
    return []
  }
  create(data: IRestaurant) {
    return push(dbRef(RESTAURANT), data)
  }
  update(id: string, data: IRestaurant) {
    return set(dbRef(`${RESTAURANT}${id}`), data)
  }
}

export default RestaurantService
