'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sanka_nichijis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sanka_kahi: {
        allowNull: false,
        type: Sequelize.ENUM('mikaitou','maru','sankaku','batsu')
      },
      event_kouho_nichiji_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'eventkouho_nichijis',
          key: 'id'
        },
      },
      sankasha_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'sankashas',
          key: 'id'
        },
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
    await queryInterface.dropTable('sanka_nichijis');
  }
};