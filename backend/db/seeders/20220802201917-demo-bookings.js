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
   options.tableName = 'Bookings'
   await queryInterface.bulkInsert(options, [
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
    options.tableName = 'Bookings'
    await queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] },
    });
  }
};
