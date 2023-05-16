const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Diets', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }    
  }, {
  timestamps: false
});
};
