'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('moyooshi_kouho_nichijis', {
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
      moyooshi_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'moyooshis',
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
    await queryInterface.dropTable('moyooshi_kouho_nichijis');
  }
};