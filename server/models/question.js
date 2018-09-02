'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    questionId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    response: DataTypes.STRING
  }, {});
  Question.associate = function(models) {
    Question.belongsTo(models.Activity, {
      foreignKey: 'questionId',
    });
  };
  return Question;
};