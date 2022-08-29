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
   await queryInterface.bulkInsert("Images", [
     {
       url: "https://news.airbnb.com/wp-content/uploads/sites/4/2019/06/PJM020719Q202_Luxe_WanakaNZ_LivingRoom_0264-LightOn_R1.jpg?fit=2500%2C1666",
       previewImage: true,
       spotId: 1,
       reviewId: null,
       userId: 1,
     },
     {
       url: "https://www.fodors.com/wp-content/uploads/2019/08/airbnb-hero-.jpg",
       previewImage: true,
       spotId: 2,
       reviewId: null,
       userId: 2,
     },
     {
       url: "https://www.protocol.com/media-library/as-ever-the-challenge-for-airbnb-is-to-balance-the-needs-of-hosts-and-guests.jpg?id=26433106&width=1245&height=700&quality=85&coordinates=0%2C299%2C0%2C300",
       previewImage: true,
       spotId: 3,
       reviewId: null,
       userId: 3,
     },
   ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Images", {
      userId: { [Op.in]: [1, 2, 3] },
    });
  }
};
