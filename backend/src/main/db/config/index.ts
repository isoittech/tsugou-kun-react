import { Sequelize } from "sequelize-typescript";
import { logger } from "../../helper/logging";

const env = process.env.NODE_ENV || "development";
const config = require("./config.json")[env];

export const sequelize: Sequelize = new Sequelize(config.database, config.username, config.password, config);
sequelize.addModels([__dirname + "/../../models/*.ts"]);

// Test the connection
sequelize
    .authenticate()
    .then(() => {
        logger.info("Config:", config);
        logger.info("Connection has been established successfully.");
    })
    .catch((err) => {
        logger.error("Unable to connect to the database:", err);
    });
