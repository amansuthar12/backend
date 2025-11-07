import { Server } from "socket.io";
import Truck from "../models/truck.model.js"; // to save updates in DB

let io;

export const initSocket = (server) => {
    io = new Server(server, { cors: { origin: "*" } });

    io.on("connection", (socket) => {
        console.log("🟢 Client connected:", socket.id);

        // 1️⃣ When client subscribes to a specific truck
        socket.on("joinTruck", (truckId) => {
            socket.join(`truck_${truckId}`);
            console.log(`📡 Client ${socket.id} joined truck_${truckId}`);
        });

        // 2️⃣ Real-time update from dashboard
        socket.on("updateTruck", async (data) => {
            const { id, ...updateFields } = data;
            console.log(`🚛 Update from Truck ${id}:`, updateFields);

            // Update database (optional)
            await Truck.update(updateFields, { where: { id } });

            // Broadcast only to that truck room
            io.to(`truck_${id}`).emit("truckRealtime", { id, ...updateFields });
        });

        // 3️⃣ When client leaves or disconnects
        socket.on("leaveTruck", (truckId) => {
            socket.leave(`truck_${truckId}`);
            console.log(`🚫 Client ${socket.id} left truck_${truckId}`);
        });

        socket.on("disconnect", () => {
            console.log("🔴 Disconnected:", socket.id);
        });
    });

    return io;
};

export { io };
