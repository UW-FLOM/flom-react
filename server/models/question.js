'use strict';
module.exports = (sequelize, DataTypes) => {
  const question = sequelize.define('question', {
    text: DataTypes.STRING,
    index: DataTypes.INTEGER,
    type: DataTypes.STRING,
    response: DataTypes.TEXT
  }, {});
  question.associate = function(models) {
    question.belongsTo(models.activity, {
      foreignKey: 'activityId',
    })
  };
  return question;
};