const { faker } = require('@faker-js/faker')
const { v4: uuid } = require('uuid')

module.exports = () => {
  const data = {
    restaurants: [],
    queues: [],
    users: [],
  }
  for (let index = 0; index < 20; index++) {
    const restaurantName = faker.company.companyName()
    data.restaurants.push({
      id: uuid(),
      name: restaurantName,
      description: faker.lorem.text(),
      cover: { src: faker.image.food(640, 480, true), alt: 'cover' },
      photos: Array.from({ length: 5 }, (_, index) => ({
        src: faker.image.food(),
        alt: `${restaurantName}-${index + 1}`,
      })),
      queueIndex: 0,
      ownerUserIDs: [],
    })
  }
  return data
}
