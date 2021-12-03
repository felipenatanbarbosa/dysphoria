const sequelize = require('../database')
const { DataTypes, Model } = require('sequelize')

class Item extends Model {}

Item.init({
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Item',
  tableName: 'items'
})

module.exports = Item
