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
       userId: 3,
     },
     {
       url: "https://www.google.com/search?q=google+images+house&rlz=1C5CHFA_enUS968US973&sxsrf=ALiCzsYlWCIbzhKD_xEZ8kZ0ZOnLYNXskg:1659629175534&tbm=isch&source=iu&ictx=1&vet=1&fir=PCj5VWGURIThbM%252Cw_edFuvJNI2ApM%252C_%253BcjQOiJJH3Z4yZM%252CT55zsjz2ITUg7M%252C_%253BGVcXzOd3_TQV2M%252C6inABsBslRZ-VM%252C_%253BGclkGao6tuZgDM%252C2uNKdPs1uKjSCM%252C_%253Bq6Jp0Ta9mOhtJM%252CnDO3u3UfKpV1AM%252C_%253BIoVF-e5xUTzZMM%252C_T57MqD5osSFMM%252C_%253BBMn_TiKksH5oXM%252CU1fuiZE5efZUEM%252C_%253B3YtEHtoM2Hma4M%252C9_OLnaPpz1kR3M%252C_%253B7YbLuGBb_o-56M%252CbO7Qudyz-02aqM%252C_%253BZnn8pC4J6QFc1M%252CqMwDAJDX8iPIOM%252C_%253B_7vXHpIgoxUYkM%252CmyxG20UTKcewIM%252C_%253Br_CaE0ZtM0dByM%252C61CG1-By7LdgQM%252C_&usg=AI4_-kSFX0SkLv-oD7lwlg7rUbZNSMzmTQ&sa=X&ved=2ahUKEwjJt927yK35AhXAD0QIHexiDsMQ9QF6BAgDEAE#imgrc=PCj5VWGURIThbM",
       previewImage: false,
       spotId: null,
       reviewId: 1,
       userId: 1,
     },
     {
       url: "this is a fake link",
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
