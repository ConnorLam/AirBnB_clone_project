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
     {
       url: "https://images.contentstack.io/v3/assets/bltec2ed8e3c4b1e16d/blt1a805240919340d9/getting-started-with-airbnb-for-work-optimized.jpg",
       previewImage: true,
       spotId: 4,
       reviewId: null,
       userId: 1,
     },
     {
       url: "https://miro.medium.com/max/1400/1*FyZktqFMhrQD3swFaNun2g.jpeg",
       previewImage: true,
       spotId: 5,
       reviewId: null,
       userId: 1,
     },
     {
       url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/top-airbnb-alternatives-2021-1613057911.jpg",
       previewImage: true,
       spotId: 6,
       reviewId: null,
       userId: 1,
     },
     {
       url: "https://imageio.forbes.com/specials-images/imageserve/5e05ae84e961e1000739fd8f/A-beautiful-luxury-Airbnb-bedroom-with-a-balcony-in-Punta-Mita--Mexico-/960x0.jpg?format=jpg&width=960",
       previewImage: true,
       spotId: 7,
       reviewId: null,
       userId: 2,
     },
     {
       url: "https://media.npr.org/assets/img/2021/12/02/home-alone-airbnb-01-exterior-credit-sarah-crowley-356844a7e42bbe5d720e0cd77c4aaeb8b5edc6aa-s1100-c50.jpg",
       previewImage: true,
       spotId: 8,
       reviewId: null,
       userId: 2,
     },
     {
       url: "https://a0.muscache.com/airbnb/static/select_host_landing/select_meta_image-db297d851c66d5ac0a0198147c9dc074.png",
       previewImage: true,
       spotId: 9,
       reviewId: null,
       userId: 2,
     },
     {
       url: "https://imageio.forbes.com/specials-images/imageserve//62b2f5b1344d85edc17a1f0b/0x0.jpg?format=jpg&width=1200",
       previewImage: true,
       spotId: 10,
       reviewId: null,
       userId: 2,
     },
     {
       url: "https://media.gq.com/photos/610c4ce498a5407e27d48f91/master/w_2000,h_1333,c_limit/Private-and-Secluded-Large-House-01.jpg",
       previewImage: true,
       spotId: 11,
       reviewId: null,
       userId: 2,
     },
     {
       url: "https://www.strategyzer.com/hubfs/Business_Model_Examples-airBnB.jpg",
       previewImage: true,
       spotId: 12,
       reviewId: null,
       userId: 2,
     },
     {
       url: "https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2022/10/10-90795952-airbnb-omg-houses.jpg",
       previewImage: true,
       spotId: 13,
       reviewId: null,
       userId: 2,
     },
     {
       url: "https://empire-s3-production.bobvila.com/articles/wp-content/uploads/2022/06/offbeat_airbnb-2.jpg",
       previewImage: true,
       spotId: 14,
       reviewId: null,
       userId: 2,
     },
     {
       url: "https://dmn-dallas-news-prod.cdn.arcpublishing.com/resizer/-hp_VNfMSR3Bp-q0qXedJ9JXE0w=/1660x0/smart/filters:no_upscale()/cloudfront-us-east-1.images.arcpublishing.com/dmn/ZFAVP3V4OVBAJIYWATM27XR4Z4.jpg",
       previewImage: true,
       spotId: 15,
       reviewId: null,
       userId: 3,
     },
     {
       url: "https://media.gq.com/photos/610c4ce0539f373b4ca1bd6d/master/w_2000,h_1333,c_limit/The-best-view-in-Asheville.jpg",
       previewImage: true,
       spotId: 16,
       reviewId: null,
       userId: 3,
     },
     {
       url: "https://media.11alive.com/assets/WXIA/images/769ccc7d-30dc-4905-901b-6a5d467e4733/769ccc7d-30dc-4905-901b-6a5d467e4733_1920x1080.jpg",
       previewImage: true,
       spotId: 17,
       reviewId: null,
       userId: 3,
     },
     {
       url: "https://people.com/thmb/UdsJw2ixRMOed3x8m3aFpv_2aDs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(599x0:601x2)/airbnb-8-833d6208c25240fa8febeb597037d903.jpg",
       previewImage: true,
       spotId: 18,
       reviewId: null,
       userId: 3,
     },
     {
       url: "https://i0.wp.com/files.tripstodiscover.com/files/2021/01/Game-of-Thrones-Downtown.jpg?resize=784%2C522",
       previewImage: true,
       spotId: 19,
       reviewId: null,
       userId: 3,
     },
     {
       url: "https://i.insider.com/5ce6a2ded1f7222f84645fec?width=700",
       previewImage: true,
       spotId: 20,
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
