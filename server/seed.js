import bcrypt from "bcryptjs";
import Users from "./models/Users.js";
import sequelize from "./config/database.js"; // adjust path if needed

const seedAdmin = async () => {
    try {
        await sequelize.sync(); // ensure DB schema is ready

        const hashedPassword = await bcrypt.hash("admin123", 10);

        const [admin, created] = await Users.findOrCreate({
            where: { email: "todanh2706@gmail.com" },
            defaults: {
                password_hash: hashedPassword,
                email: "todanh2706@gmail.com",
                address: "Admin HQ",
                phone: "0913689550",
            },
        });

        if (created) {
            console.log("Admin user created:", admin.email);
        } else {
            console.log("Admin user already exists:", admin.email);
        }

        process.exit();
    } catch (err) {
        console.error("Error seeding admin:", err);
        process.exit(1);
    }
};

seedAdmin();
