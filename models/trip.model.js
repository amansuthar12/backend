import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Trip = sequelize.define("Trip", {
    startLocation: DataTypes.STRING,
    endLocation: DataTypes.STRING,
    distance: DataTypes.FLOAT,
    fuelUsed: DataTypes.FLOAT,
    startedAt: DataTypes.DATE,
    endedAt: DataTypes.DATE,
});

export default Trip;
