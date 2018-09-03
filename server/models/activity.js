'use strict';
module.exports = (sequelize, DataTypes) => {
  const activity = sequelize.define('activity', {
    type: DataTypes.ENUM('survey', 'map')
  }, {});
  activity.associate = function(models) {
    activity.belongsTo(models.session, {
      foreignKey: 'sessionId',
      onDelete: 'CASCADE',
    })
    activity.hasMany(models.question, {
      foreignKey: 'activityId',
    })
  };
  return activity;
};