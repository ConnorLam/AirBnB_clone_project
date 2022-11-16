'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {foreignKey: 'ownerId'})
      Spot.belongsToMany(models.User, {through: models.Booking, foreignKey: 'spotId'})
      Spot.hasMany(models.Image, {foreignKey: 'spotId'})
      Spot.hasMany(models.Review, {foreignKey: 'spotId'})
      Spot.hasMany(models.Like, {foreignKey: 'spotId'})
    }
  }
  Spot.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          // min: -90,
          // max: 90,
          invalidLatitude(){
            if (this.lat > 90 || this.lat < -90){
              throw new Error('Latitude must be between -90 and 90')
            }
          }
        }
      },
      lng: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          // min: -180,
          // max: 180,
          invalidLongitude(){
            if (this.lng > 180 || this.lng < -180){
              throw new Error('Longitude must be between 180 and -180')
            }
          }
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [10, 500],
            msg: "Description must be between 10 and 500 characters"
          }
        }
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );
  return Spot;
};