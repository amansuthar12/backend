import Driver from "../models/driver.model.js";

export const getAllDrivers = async (req, res) => {
    const drivers = await Driver.findAll();
    res.json(drivers);
};

export const createDriver = async (req, res) => {
    const driver = await Driver.create(req.body);
    res.json(driver);
};

export const updateDriver = async (req, res) => {
    const driver = await Driver.update(req.body, { where: { id: req.params.id } });
    res.json(driver);
};

export const deleteDriver = async (req, res) => {
    await Driver.destroy({ where: { id: req.params.id } });
    res.json({ message: "Driver deleted" });
};
