import { sequelize } from "../db.js";
import User from "./user.model.js";
import Driver from "./driver.model.js";
import Truck from "./truck.model.js";
import Trip from "./trip.model.js";

// Relationships
Driver.hasOne(Truck, { foreignKey: "driverId", onDelete: "SET NULL" });
Truck.belongsTo(Driver, { foreignKey: "driverId" });

Truck.hasMany(Trip, { foreignKey: "truckId", onDelete: "CASCADE" });
Trip.belongsTo(Truck, { foreignKey: "truckId" });

Driver.hasMany(Trip, { foreignKey: "driverId", onDelete: "CASCADE" });
Trip.belongsTo(Driver, { foreignKey: "driverId" });

const syncDB = async () => {
    await sequelize.sync({ alter: true }); // use { force: true } to reset tables
    console.log("🗄️ All models synced with database");
};

export { User, Driver, Truck, Trip, syncDB };
