import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existing = await User.findOne({ where: { email } });
        if (existing) return res.status(400).json({ message: "User already exists" });

        const user = await User.create({ name, email, password });
        res.json({ token: generateToken(user.id), user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await user.matchPassword(password)))
            return res.status(401).json({ message: "Invalid credentials" });

        res.json({ token: generateToken(user.id), user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
