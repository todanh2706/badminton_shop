import { useState } from "react";
import { motion as Motion } from "framer-motion";

const navItems = ["Home", "About", "Account"];

export default function Navbar() {
    const [active, setActive] = useState("Home");

    return (
        <nav className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-4 shadow-lg">
            <ul className="flex justify-center space-x-8 relative">
                {navItems.map((item) => (
                    <li key={item} className="relative">
                        <button
                            onClick={() => setActive(item)}
                            className={`relative px-4 py-2 text-lg font-semibold transition-colors duration-300 
                ${active === item ? "text-white" : "text-gray-200 hover:text-yellow-300"}`}
                        >
                            {item}
                            {active === item && (
                                <Motion.div
                                    layoutId="underline"
                                    className="absolute left-0 right-0 -bottom-1 h-1 rounded-full bg-yellow-300"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
