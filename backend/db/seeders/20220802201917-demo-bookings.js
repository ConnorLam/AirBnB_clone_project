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
   await queryInterface.bulkInsert('Bookings', [
    {
      spotId: 1,
      userId: 2,
      startDate: "2023-11-05",
      endDate: "2023-11-07"
    },
    {
      spotId: 2,
      userId: 3,
      startDate: "2023-11-05",
      endDate: "2023-11-07"
    },
    {
      spotId: 3,
      userId: 1,
      startDate: "2023-11-05",
      endDate: "2023-11-07"
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
    await queryInterface.bulkDelete("Bookings", {
      userId: { [Op.in]: [1, 2, 3] },
    });
  }
};
