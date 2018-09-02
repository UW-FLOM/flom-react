'use strict';
module.exports = (sequelize, DataTypes) => {
  const activity = sequelize.define('activity', {
    type: DataTypes.ENUM('survey', 'map')
  }, {});
  activity.associate = function(models) {
    activity.belongsTo(models.session)
    activity.hasMany(models.question)
  };
  return activity;
};