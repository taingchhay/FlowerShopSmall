const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');
const Flower = require('./Flower');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  flowerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Flower,
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 },
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orderDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: { min: 0 },
  },
}, {
  tableName: 'orders',
  timestamps: true,
});

Order.belongsTo(Flower, { foreignKey: 'flowerId' });

module.exports = Order;
