import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { connectDB } from "./db.js";
import { syncDB } from "./models/index.js";
import { initSocket } from "./realtime/socket.js";

import authRoutes from "./routes/auth.js";
import driverRoutes from "./routes/driver.js";
import truckRoutes from "./routes/truck.js";
import tripRoutes from "./routes/trip.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/trucks", truckRoutes);
app.use("/api/trips", tripRoutes);

app.get("/", (req, res) => res.send("🚀 Smart Truck PostgreSQL Backend Running"));

const server = http.createServer(app);
initSocket(server);

syncDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
