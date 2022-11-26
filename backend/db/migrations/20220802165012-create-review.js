'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

let indexOptions = {}
indexOptions.tableName = 'Reviews'
if (process.env.NODE_ENV === "production") {
  indexOptions.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Reviews", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: "Users" },
        onDelete: "CASCADE",
        allowNull: false,
      },
      spotId: {
        type: Sequelize.INTEGER,
        references: { model: "Spots" },
        onDelete: "CASCADE",
        allowNull: false,
      },
      review: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      stars: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    }, options);
    await queryInterface.addIndex(indexOptions, 'Reviews',
    ['spotId', 'userId'],
    {unique: true})
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Reviews", options);
    await queryInterface.removeIndex(indexOptions, "Reviews", ["spotId", "userId"]);
  }
};