'use strict';

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
   await queryInterface.bulkInsert('Spots', [
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
    // {
    // ownerId: ,
    // address: ,
    // city: 'Los Angeles',
    // state: 'California',
    // country: 'United States',
    // lat: 50,
    // lng: 50,
    // name: '',
    // description: '',
    // price: 
    // },
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
    await queryInterface.bulkDelete("Spots", {
      ownerId: {[Op.in]: [1, 2, 3]}
    });
  }
};
