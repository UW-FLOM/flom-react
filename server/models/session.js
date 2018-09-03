'use strict';
module.exports = (sequelize, DataTypes) => {
  const session = sequelize.define('session', {
    // Nothing
  }, {});
  session.associate = function(models) {
    session.hasMany(models.activity, {
      foreignKey: 'sessionId',
    })
  };
  return session;
};