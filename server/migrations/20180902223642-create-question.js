'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING
      },
      index: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      response: {
        type: Sequelize.TEXT
      },
      notes: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      activityId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'activities',
          key: 'id',
          as: 'activityId',
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('questions');
  }
};