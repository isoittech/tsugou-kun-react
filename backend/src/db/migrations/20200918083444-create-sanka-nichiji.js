"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("sanka_nichijis", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            sanka_kahi: {
                allowNull: false,
                type: Sequelize.ENUM("mikaitou", "maru", "sankaku", "batsu"),
            },
            moyooshi_kouho_nichiji_id: {
                allowNull: false,
                type: Sequelize.BIGINT,
                references: {
                    model: "moyooshi_kouho_nichijis",
                    key: "id",
                },
            },
            sankasha_id: {
                allowNull: false,
                type: Sequelize.BIGINT,
                references: {
                    model: "sankashas",
                    key: "id",
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("sanka_nichijis");
    },
};
