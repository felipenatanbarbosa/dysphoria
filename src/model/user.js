const sequelize = require('../database')
const { DataTypes, Model } = require('sequelize')
const Item = require('./item')

class User extends Model {}

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users'
})

// User.hasMany(Item)
// Item.belongsTo(User)

module.exports = User
