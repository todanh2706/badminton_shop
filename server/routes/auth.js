import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../models/Users.js";
import Otps from "../models/Otps.js";
import passport from "passport";
import nodemailer from "nodemailer"

const router = express.Router();

// Sign in route
router.post("/signin", async (req, res) => {
    const { email, password, remember } = req.body;

    try {
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Invalid email!" });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password!" });
        }

        const accessToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: remember ? "7d" : "1d" }
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });

        res.json({
            message: "Sign in successfully",
            accessToken,
            user: {
                id: user.id,
                email: user.email,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Sign up route
router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check valid information
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required!" });
        }

        // Check if user already exist
        const user = await Users.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ message: "Email already registered!" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        const expiresAt = new Date(Date.now() + 1 * 60 * 1000); // 1 minute
        const otpCode = ("" + Math.floor(100000 + Math.random() * 900000)); // 6 digits
        Otps.create({
            email,
            password_hash,
            otp: otpCode,
            expires_at: expiresAt,
        }).catch(err => console.error("Failed to save OTP:", err));

        // Send opt to email
        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_SENDER,
                pass: process.env.EMAIL_PASS
            },
        });

        await transporter.verify();

        await transporter.sendMail({
            from: `"Badminton shop" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify your email",
            text: `Your OTP code is: ${otpCode}`
        });
        console.log("check");

        res.json({ message: "OTP sent to your email" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;

    try {
        const record = await Otps.findOne({ where: { email, otp } });
        if (!record) return res.status(400).json({ message: "Invalid OTP" });

        if (record.expires_at < new Date()) {
            return res.status(400).json({ message: "OTP expired" });
        }

        // Create user
        const user = await Users.create({
            email: record.email,
            password_hash: record.password_hash
        });

        // Delete OTP
        await record.destroy();

        res.json({ message: "Account created successfully", user: { id: user.id, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Refresh token route
router.get("/refresh", (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid refresh token" });

        const accessToken = jwt.sign(
            { id: decoded.id, email: decoded.email },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        res.json({ accessToken });
    });
});

// Logout route
router.post("/logout", (req, res) => {
    res.clearCookie("refreshToken", { path: "/" });
    res.json({ message: "Logged out successfully" });
});

// For google sign in
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("/");
    }
);

export default router;