import express from "express";
import Users from "../models/Users.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Fetch user data
router.get("/me", authenticateToken, async (req, res) => {
    try {
        const user = await Users.findByPk(req.user.id, {
            attributes: ["id", "email", "password_hash", "address", "phone"]
        });
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

export default router;