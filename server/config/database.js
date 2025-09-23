import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.DB_NAME,     // database name
    process.env.DB_USER,     // username
    process.env.DB_PASSWORD, // password
    {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        dialect: "postgres",
        logging: false,
    }
);

export default sequelize;