import express from "express";
import Users from "../models/Users.js";
import Products from "../models/Products.js"
import Addresses_Users from "../models/Addresses_Users.js";
import { authenticateToken } from "../middleware/auth.js";
import { isAdmin } from "../middleware/admin.js";

const router = express.Router();

router.get("/users", authenticateToken, isAdmin, async (req, res) => {
    try {
        const users = await Users.findAll();

        if (!users) {
            return res.status(400).json({ message: "Anonymous error to get all users!" });
        }

        return res.status(200).json({ message: "Fetch all users successfully!", users });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.get("/products", authenticateToken, isAdmin, async (req, res) => {
    try {
        const products = await Products.findAll();

        if (!products) {
            return res.status(400).json({ message: "Anonymous error to get all products!" });
        }

        return res.status(201).json({ message: "Fetch all products successfully!", products });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.get("/addresses", authenticateToken, isAdmin, async (req, res) => {
    try {
        const addresses = await Addresses_Users.findAll({
            attributes: ['id', 'street_address', 'city', 'postal_code', 'country'],
        });

        if (!addresses) {
            return res.status(400).json({ message: "Anonymous error to get all addresses!" });
        }

        return res.status(201).json({ message: "Fetch all addresses successfully!", addresses });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});


export default router;