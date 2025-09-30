import express from "express";
import bcrypt from "bcryptjs";
import Users from "../models/Users.js";
import { Addresses_Users } from "../models/index.js"
import { authenticateToken } from "../middleware/auth.js";
import { where } from "sequelize";

const router = express.Router();

// Fetch user data
router.get("/me", authenticateToken, async (req, res) => {
    try {
        const user = await Users.findByPk(req.user.id, {
            attributes: ["id", "email", "password_hash", "phone", "full_name", "date_of_birth"]
        });
        if (!user) return res.status(404).json({ message: "User not found!" });

        res.status(201).json({ message: "Fetch user's data successfully", user: user });
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

        return res.status(201).json({ message: "Email updated successfully", email: user.email });
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

        return res.status(201).json({ message: "Phone number updated successfully", phone: user.phone });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.post("/change-full_name", authenticateToken, async (req, res) => {
    try {
        const user = await Users.findByPk(req.user.id, {
            attributes: ["id", "full_name"]
        });
        if (!user) return res.status(404).json({ message: "User not found!" });

        const { full_name } = req.body;

        if (!full_name) {
            return res.status(400).json({ message: "Invalid full name!" });
        }

        user.full_name = full_name;
        await user.save();

        return res.status(201).json({ message: "Full name updated successfully", full_name: user.full_name });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.post("/change-date_of_birth", authenticateToken, async (req, res) => {
    try {
        const user = await Users.findByPk(req.user.id, {
            attributes: ["id", "date_of_birth"]
        });
        if (!user) return res.status(404).json({ message: "User not found!" });

        const { date_of_birth } = req.body;

        if (!date_of_birth) {
            return res.status(400).json({ message: "Invalid date of birth!" });
        }

        user.date_of_birth = date_of_birth;
        await user.save();

        return res.status(201).json({ message: "Date of birth updated successfully", date_of_birth: user.date_of_birth });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.post("/change-password", authenticateToken, async (req, res) => {
    try {
        const user = await Users.findByPk(req.user.id, {
            attributes: ["id", "password_hash"]
        });
        if (!user) return res.status(404).json({ message: "User not found!" });

        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "Missing old or new password!" });
        }

        const match = await bcrypt.compare(oldPassword, user.password_hash);
        if (!match) {
            return res.status(401).json({ message: "Old password is incorrect!" });
        }

        const saltRounds = 10;
        const newHash = await bcrypt.hash(newPassword, saltRounds);

        user.password_hash = newHash;
        await user.save();

        return res.status(201).json({ message: "Password updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.get("/addresses", authenticateToken, async (req, res) => {
    try {
        const user = await Users.findOne({ where: { id: req.user.id } }, {
            attributes: ["id"]
        });

        if (!user) return res.status(404).json({ message: "User not found!" });

        const addresses = await Addresses_Users.findAll({ where: { user_id: req.user.id } }, {
            attributes: ["id", "street_address", "city", "postal_code", "country"]
        });
        if (!addresses) return res.json({ message: "No saved address." });

        return res.status(201).json({ message: "Get user's saved addresses successfully", addresses: addresses });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.post("/add-address", authenticateToken, async (req, res) => {
    try {
        const user = await Users.findOne({ where: { id: req.user.id } }, {
            attributes: ["id"]
        });

        if (!user) return res.status(404).json({ message: "User not found!" });

        const { country, postal_code, city, street_address } = req.body;

        const newAddress = await Addresses_Users.create({
            user_id: user.id,
            country,
            postal_code,
            city,
            street_address
        });

        return res.status(201).json({ messag: "Address added successfully", address: newAddress });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.post("/change-address", authenticateToken, async (req, res) => {
    try {

        const user = await Users.findOne({ where: { id: req.user.id } }, {
            attributes: ["id"]
        });

        if (!user) return res.status(404).json({ message: "User not found!" });

        const { id, country, postal_code, city, street_address } = req.body;

        const address = await Addresses_Users.findOne({
            where: { id, user_id: user.id },
        });

        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }

        await address.update({ country, postal_code, city, street_address });

        return res.status(200).json({ message: "Address updated successfully", address });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

export default router;