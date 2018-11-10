'use strict';
module.exports = (sequelize, DataTypes) => {
  const session = sequelize.define('session', {
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  session.associate = function(models) {
    session.hasMany(models.activity, {
      foreignKey: 'sessionId',
    })
  };
  return session;
};