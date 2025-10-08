import express from "express";
import sequelize from "./config/database.js";
import authRoutes from "./routes/auth.js";
import userDataRoutes from "./routes/userdata.js";
import productDataRoutes from "./routes/productdata.js";
import adminRoutes from "./routes/admin.js";
import cors from "cors";
import session from "express-session";
import passport from "./config/passport.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.use(cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/userdata", userDataRoutes);
app.use("/api/productdata", productDataRoutes);
app.use("/api/admin", adminRoutes);

// Sync database
sequelize.sync().then(() => {
    console.log("Postgres DB synced ");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error", error: err.message });
});

export default app;
