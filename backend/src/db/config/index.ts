import { Sequelize } from "sequelize-typescript";

const env = process.env.NODE_ENV || "development";
const config = require("./config.json")[env];

export const sequelize: Sequelize = new Sequelize(config.database, config.username, config.password, config);
sequelize.addModels([__dirname + "/../../models/*.ts"]);

// Test the connection
sequelize
    .authenticate()
    .then(() => {
        console.log("Config:", config);
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });
