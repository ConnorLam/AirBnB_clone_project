'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   options.tableName = 'Spots'
   await queryInterface.bulkInsert(options, [
    {
    ownerId: 1,
    address: '123 Universal Ave',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    lat: 80,
    lng: 80,
    name: 'Home1',
    description: 'This is a big place',
    price: 111
    },
    {
    ownerId: 2,
    address: '123 Coolplace Ave',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    lat: 70,
    lng: 70,
    name: 'Home2',
    description: 'This is a magical place',
    price: 112
    },
    {
    ownerId: 3,
    address: '123 Six Flags Ave',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    lat: 50,
    lng: 50,
    name: 'Home3',
    description: 'This is a cool place',
    price: 100
    },
    {
    ownerId: 1,
    address: '725 S SPRING ST',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    lat: 49,
    lng: 49,
    name: 'Home4',
    description: 'Spring street house',
    price: 100
    },
    {
    ownerId: 1,
    address: '425 SHATTO PL',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    lat: 48,
    lng: 50,
    name: 'Home5',
    description: 'Place in Shatto Place',
    price: 100
    },
    {
    ownerId: 1,
    address: '800 MCGARRY ST',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    lat: 47,
    lng: 50,
    name: 'Home6',
    description: 'McGarry Street home',
    price: 100
    },
    {
    ownerId: 2,
    address: '1801 BARNETT RD',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    lat: 51,
    lng: 50,
    name: 'Home7',
    description: 'Barnett road house',
    price: 100
    },
    {
    ownerId: 2,
    address: '6126 ROMAINE ST',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    lat: 52,
    lng: 50,
    name: 'Home8',
    description: 'Romaine Home',
    price: 100
    },
    {
    ownerId: 2,
    address: '685 S CATALINA ST',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    lat: 53,
    lng: 50,
    name: 'Home9',
    description: 'Catalina Home',
    price: 100
    },
    {
    ownerId: 2,
    address: '900 DEXTER ST',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    lat: 54,
    lng: 50,
    name: 'Home10',
    description: 'Dexter Street home',
    price: 100
    },
    {
    ownerId: 2,
    address: '12505 W JEFFERSON BLVD',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    lat: 55,
    lng: 50,
    name: 'Home11',
    description: 'Jefferson Boulevard home',
    price: 100
    },
    {
    ownerId: 2,
    address: '1243 S OLIVE ST',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    lat: 56,
    lng: 50,
    name: 'Home12',
    description: 'Olive Street home',
    price: 100
    },
    {
    ownerId: 2,
    address: '320 W 4TH ST',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    lat: 57,
    lng: 50,
    name: 'Home13',
    description: '4th Street home',
    price: 100
    },
    {
    ownerId: 2,
    address: '10880 WILSHIRE BLVD',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    lat: 58,
    lng: 50,
    name: 'Home14',
    description: 'Willshire Boulevard home',
    price: 100
    },
    {
    ownerId: 3,
    address: '2445 E 12TH ST',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    lat: 59,
    lng: 50,
    name: 'Home15',
    description: '12th Street home',
    price: 100
    },
    {
    ownerId: 3,
    address: '4433 EAGLE ROCK BLVD',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    lat: 60,
    lng: 50,
    name: 'Home16',
    description: 'Eagle Rock home',
    price: 100
    },
    {
    ownerId: 3,
    address: '7235 HOLLYWOOD BLVD',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    lat: 61,
    lng: 50,
    name: 'Home17',
    description: 'Hollywood home',
    price: 100
    },
    {
    ownerId: 3,
    address: '3636 BARHAM BLVD',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    lat: 62,
    lng: 50,
    name: 'Home18',
    description: 'Barham Home',
    price: 100
    },
    {
    ownerId: 3,
    address: '1 W CENTURY DR',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    lat: 63,
    lng: 50,
    name: 'Home19',
    description: 'Century Drive home',
    price: 100
    },
    {
    ownerId: 3,
    address: '110 E 9TH ST',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    lat: 64,
    lng: 50,
    name: 'Home20',
    description: '9th street home',
    price: 100
    },
  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op
    options.tableName = "Spots";
    await queryInterface.bulkDelete(options, {
      ownerId: {[Op.in]: [1, 2, 3]}
    });
  }
};
