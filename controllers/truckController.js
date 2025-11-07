import Truck from "../models/truck.model.js";
import { io } from "../realtime/socket.js"; // to emit live updates

export const getAllTrucks = async (req, res) => {
    const trucks = await Truck.findAll();
    res.json(trucks);
};

export const createTruck = async (req, res) => {
    const truck = await Truck.create(req.body);
    res.json(truck);
};

export const updateTruck = async (req, res) => {
    const truck = await Truck.findByPk(req.params.id);
    if (!truck) return res.status(404).json({ message: "Truck not found" });
    await truck.update(req.body);
    io.emit("truckRealtime", truck); // broadcast real-time
    res.json(truck);
};

export const deleteTruck = async (req, res) => {
    await Truck.destroy({ where: { id: req.params.id } });
    res.json({ message: "Truck deleted" });
};
