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
       previewImage: false,
       spotId: 3,
       reviewId: null,
       userId: 3,
     },
     {
       url: "https://media.architecturaldigest.com/photos/62bdb5fda47d113b36863416/16:9/w_1738,h_977,c_limit/Mod%20Tree%202.jpeg",
       previewImage: false,
       spotId: null,
       reviewId: 1,
       userId: 1,
     },
     {
       url: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iUAZY8gOcp5U/v0/1200x-1.jpg",
       previewImage: false,
       spotId: null,
       reviewId: 1,
       userId: 1,
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
