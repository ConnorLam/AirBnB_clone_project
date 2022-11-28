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
   options.tableName = 'Reviews'
   await queryInterface.bulkInsert(options, [
    {
      review: 'this place was really cool!',
      stars: 5,
      userId: 1,
      spotId: 3
    },
    {
      review: 'wow this place was amazing',
      stars: 5,
      userId: 3,
      spotId: 2
    },
    {
      review: 'this place was really big!',
      stars: 4,
      userId: 2,
      spotId: 1
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
    options.tableName = "Reviews";
    await queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] },
    });
  }
};
