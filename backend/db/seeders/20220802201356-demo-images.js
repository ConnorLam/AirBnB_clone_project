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
       url: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.thisbigadventure.com%2Fwp-content%2Fuploads%2F2017%2F09%2F11-Tips-For-Visiting-Universal-Studios-Hollywood-2.jpg&imgrefurl=https%3A%2F%2Fwww.thisbigadventure.com%2F11-tips-for-visiting-universal-studios-hollywood%2F&tbnid=fOwx6shEPLe49M&vet=12ahUKEwinwaah_Kj5AhXYHzQIHWC5B2EQMygHegUIARDoAQ..i&docid=ieT0OnlYgZyEGM&w=1352&h=1352&q=universal%20studios&ved=2ahUKEwinwaah_Kj5AhXYHzQIHWC5B2EQMygHegUIARDoAQ",
       previewImage: true,
       spotId: 1,
       reviewId: null,
       userId: 1,
     },
     {
       url: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.wikia.nocookie.net%2Fharrypotter%2Fimages%2Fe%2Fe1%2FHogwarts_Castle_DHF2.jpg%2Frevision%2Flatest%3Fcb%3D20120128145344&imgrefurl=https%3A%2F%2Fharrypotter.fandom.com%2Fwiki%2FHogwarts_Castle&tbnid=yiaos5HQZ52V2M&vet=12ahUKEwiOp_3d_Kj5AhVPHDQIHVzPDVEQMygBegUIARDkAQ..i&docid=eE925qnvvG4aKM&w=794&h=768&q=hogwarts&ved=2ahUKEwiOp_3d_Kj5AhVPHDQIHVzPDVEQMygBegUIARDkAQ",
       previewImage: true,
       spotId: 2,
       reviewId: null,
       userId: 2,
     },
     {
       url: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.bayshorehomesales.com%2Fcm%2Fdpl%2Fimages%2Flocations%2F82%2Fmain%2F82.jpg&imgrefurl=https%3A%2F%2Fwww.bayshorehomesales.com%2Fcommunities%2FTheVillageatSixFlags&tbnid=RGlF07f3gfU2uM&vet=12ahUKEwj6lZqM_aj5AhV5AjQIHRQ-CBcQMygAegUIARC7AQ..i&docid=5eQHINtyyXXxwM&w=2000&h=1000&q=sixflags%20home&ved=2ahUKEwj6lZqM_aj5AhV5AjQIHRQ-CBcQMygAegUIARC7AQ",
       previewImage: false,
       spotId: 3,
       reviewId: null,
       userId: 3
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
