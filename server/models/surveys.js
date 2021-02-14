const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Surveys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Surveys.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    content: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'Surveys',
  });
  return Surveys;
};
