'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('eventkouho_nichijis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kouho_nichiji: {
        allowNull: false,
        type: Sequelize.STRING
      },
      event_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'events',
          key: 'id'
        },
      },
      schedule_update_id: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('eventkouho_nichijis');
  }
};