'use strict';
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    activityId: DataTypes.STRING
  }, {});
  Activity.associate = function(models) {
    Activity.belongsTo(models.Session, {
      foreignKey: 'activityId',
    });
    Activity.hasMany(models.Question, {
      foreignKey: 'questionId',
      as: 'questions',
    })
  };
  return Activity;
};