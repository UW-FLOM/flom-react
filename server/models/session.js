'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    // Nothing
  }, {});
  Session.associate = function(models) {
    Session.hasMany(models.Activity, {
      foreignKey: 'activityId',
      as: 'activities',
    })
  };
  return Session;
};