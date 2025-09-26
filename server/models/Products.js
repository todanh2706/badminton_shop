import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Products = sequelize.define("Product", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // password_hash: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    // },
    // email: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     unique: true,
    // },
    // address: {
    //     type: DataTypes.STRING,
    // },
    // phone: {
    //     type: DataTypes.STRING,
    // },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: { // Dollar by default
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default Products;