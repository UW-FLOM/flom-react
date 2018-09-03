'use strict';
module.exports = (sequelize, DataTypes) => {
  const question = sequelize.define('question', {
    type: DataTypes.ENUM('string', 'number', 'boolean', 'geo', 'time'),
    response: DataTypes.STRING
  }, {});
  question.associate = function(models) {
    question.belongsTo(models.activity, {
      foreignKey: 'activityId',
    })
  };
  return question;
};