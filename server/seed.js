import bcrypt from "bcryptjs";
import Users from "./models/Users.js";
import Products from "./models/Products.js"
import sequelize from "./config/database.js"; // adjust path if needed

const seedAdmin = async () => {
    try {
        await sequelize.sync(); // ensure DB schema is ready

        const hashedPassword = await bcrypt.hash("123456", 10);

        const [admin, created] = await Users.findOrCreate({
            where: { email: "hoabuoicuoi227@gmail.com" },
            defaults: {
                password_hash: hashedPassword,
                email: "hoabuoicuoi227@gmail.com",
                phone: "0913689550",
                full_name: "To Huu Danh",
                date_of_birth: "2005-06-27",
                role: "admin"
            },
        });

        const [product65z4, check65z4] = await Products.findOrCreate({
            where: { name: "SHB 65z4 2025" },
            defaults: {
                price: 96,
                image: "/65z4_product.webp",
                category: "Shoes",
                brand: "Yonex",
                stock: 100,
            },
        });

        const [product88dpro, check88dpro] = await Products.findOrCreate({
            where: { name: "Astrox 88D Pro 2024" },
            defaults: {
                price: 190,
                image: "/88d_pro_2024_product.webp",
                category: "Racquets",
                brand: "Yonex",
                stock: 40,
            },
        });

        const [product99pro, check99pro] = await Products.findOrCreate({
            where: { name: "Astrox 99 pro Gen-3 2025" },
            defaults: {
                price: 200,
                image: "/99pro_gen3_product.webp",
                category: "Racquets",
                brand: "Yonex",
                stock: 20,
            },
        });

        const [productex63, checkex63] = await Products.findOrCreate({
            where: { name: "BG Exbolt 63" },
            defaults: {
                price: 8,
                image: "/exbolt_63_product.webp",
                category: "Strings",
                brand: "Yonex",
                stock: 150,
            },
        });

        const [productjuniortshirt, checkjuniortshirt] = await Products.findOrCreate({
            where: { name: "Junior T-Shirt" },
            defaults: {
                price: 7,
                image: "/junior_tshirt_product.webp",
                category: "Apparels",
                brand: "Yonex",
                stock: 1500,
            },
        });

        const [productmavis350, checkmavis350] = await Products.findOrCreate({
            where: { name: "Mavis 350 - pipe of 6" },
            defaults: {
                price: 12,
                image: "/mavis350_product.webp",
                category: "Shuttlecocks",
                brand: "Yonex",
                stock: 1500,
            },
        });

        const [productbag, checkbag] = await Products.findOrCreate({
            where: { name: "Pro Racquet Bag 2022 - 92229" },
            defaults: {
                price: 100,
                image: "/pro_bag_92229_product.webp",
                category: "Bags",
                brand: "Yonex",
                stock: 25,
            },
        });

        const [productwristband, checkwristband] = await Products.findOrCreate({
            where: { name: "Wrist band" },
            defaults: {
                price: 2,
                image: "/wristband_product.webp",
                category: "Accessories",
                brand: "Yonex",
                stock: 1500,
            },
        });

        if (created) {
            console.log("Admin user created:", admin.email);
        } else {
            console.log("Admin user already exists:", admin.email);
        }

        process.exit();
    } catch (err) {
        console.error("Error seeding:", err);
        process.exit(1);
    }
};

seedAdmin();
