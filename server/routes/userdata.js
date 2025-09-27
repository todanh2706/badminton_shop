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
        if (!user) return res.status(404).json({ message: "User not found!" });

        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.post("/change-email", authenticateToken, async (req, res) => {
    try {
        const user = await Users.findByPk(req.user.id, {
            attributes: ["id", "email"]
        });
        if (!user) return res.status(404).json({ message: "User not found!" });

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Invalid email!" });
        }

        const existing = await Users.findOne({ where: { email } });
        if (existing) {
            return res.status(400).json({ message: "Email already in use!" });
        }

        user.email = email;
        await user.save();

        return res.json({ message: "Email updated successfully", email: user.email });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.post("/change-phone", authenticateToken, async (req, res) => {
    try {
        const user = await Users.findByPk(req.user.id, {
            attributes: ["id", "phone"]
        });
        if (!user) return res.status(404).json({ message: "User not found!" });

        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({ message: "Invalid phone number!" });
        }

        user.phone = phone;
        await user.save();

        return res.json({ message: "Phone number updated successfully", phone: user.phone });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
})

router.post("/change-address", authenticateToken, async (req, res) => {
    try {
        const user = await Users.findByPk(req.user.id, {
            attributes: ["id", "address"]
        });
        if (!user) return res.status(404).json({ message: "User not found!" });

        const { address } = req.body;

        if (!address) {
            return res.status(400).json({ message: "Invalid address!" });
        }


        user.address = address;
        await user.save();

        return res.json({ message: "Address updated successfully", address: user.address });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
})

export default router;