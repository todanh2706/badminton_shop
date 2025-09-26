import express from "express";
import Products from "../models/Products.js";

const router = express.Router();

router.get("/category/:category", async (req, res) => {
    try {
        const products = await Products.findAll({
            where: { category: req.params.category },
        });

        res.json(products);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

export default router