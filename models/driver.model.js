import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Driver = sequelize.define("Driver", {
    name: DataTypes.STRING,
    licenseNumber: DataTypes.STRING,
    phone: DataTypes.STRING,
});

export default Driver;
