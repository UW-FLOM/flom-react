'use strict';
module.exports = (sequelize, DataTypes) => {
  const activity = sequelize.define('activity', {
    title: DataTypes.STRING,
    index: DataTypes.INTEGER,
    type: DataTypes.ENUM('survey', 'map'),
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
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