import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Truck = sequelize.define("Truck", {
    name: DataTypes.STRING,
    numberPlate: DataTypes.STRING,
    driverId: DataTypes.INTEGER,
    fuelLevel: { type: DataTypes.FLOAT, defaultValue: 100 },
    speed: { type: DataTypes.FLOAT, defaultValue: 0 },
    load: { type: DataTypes.FLOAT, defaultValue: 0 },
    engineOn: { type: DataTypes.BOOLEAN, defaultValue: false },
    temperature: { type: DataTypes.FLOAT, defaultValue: 30 },
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
});

export default Truck;
