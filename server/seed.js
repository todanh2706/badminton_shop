import bcrypt from "bcryptjs";
import Users from "./models/Users.js";
import Products from "./models/Products.js"
import sequelize from "./config/database.js"; // adjust path if needed

const seedAdmin = async () => {
    try {
        await sequelize.sync(); // ensure DB schema is ready

        const hashedPassword = await bcrypt.hash("123456", 10);

        const [admin, created] = await Users.findOrCreate({
            where: { email: "thdanh23@clc.fitus.edu.vn" },
            defaults: {
                password_hash: hashedPassword,
                email: "thdanh23@clc.fitus.edu.vn",
                address: "227 NVC",
                phone: "0913689550",
            },
        });

        const [product, check] = await Products.findOrCreate({
            where: { name: "Wristband" },
            defaults: {
                price: 2,
                image: "/wristband_product.webp",
                category: "Accessories",
                brand: "Yonex",
                stock: 100,
            },
        });

        if (created) {
            console.log("Admin user created:", admin.email);
        } else {
            console.log("Admin user already exists:", admin.email);
        }

        if (check) {
            console.log("Product created successfully:", product.name)
        } else {
            console.log("Product created failed:", product.name)
        }

        process.exit();
    } catch (err) {
        console.error("Error seeding:", err);
        process.exit(1);
    }
};

seedAdmin();
