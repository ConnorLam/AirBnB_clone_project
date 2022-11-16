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
   await queryInterface.bulkInsert('Likes', [
    {
      userId: 1,
      spotId: 3,
    },
    {
      userId: 3,
      spotId: 2,
    },
    {
      userId: 2,
      spotId: 1
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Likes", {
      userId: {[Op.in]: [1, 2, 3]}
    })
  }
};
