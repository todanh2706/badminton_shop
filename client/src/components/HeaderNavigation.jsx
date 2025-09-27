import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { useNavigate, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion as Motion } from "framer-motion";
import UserButton from "./UserButton";
import LogoutButton from "./LogoutButton";
import useAuthContext from "../context/useAuthContext";

export default function HeaderNavigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState("");
    const { accessToken } = useAuthContext();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const navLinks = [
        { name: "Accessories", href: "/home/accessories" },
        { name: "Apparels", href: "/home/apparels" },
        { name: "Bags", href: "/home/bags" },
        { name: "Racquets", href: "/home/racquets" },
        { name: "Shoes", href: "/home/shoes" },
        { name: "Shuttlecocks", href: "/home/shuttlecocks" },
        { name: "Strings", href: "/home/strings" },
    ];

    const handleNavigate = (link) => {
        setActive(link.name);
        setIsOpen(false);
        navigate(link.href);
    }

    return (
        <header className="w-full shadow-md">
            {/* Top bar */}
            <div className="bg-gray-100 text-sm text-gray-600">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-2">
                    <div className="flex gap-4">
                        {accessToken ? (
                            <>
                                <UserButton />
                                <LogoutButton />
                            </>
                        ) : <button className="hover:text-black" onClick={() => navigate("/signin")}>{t("SignIn")}</button>}
                        <button className="hover:text-black flex items-center gap-1">
                            <Search size={16} /> {t("Search")}
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => i18n.changeLanguage("en")}
                            className={`px-2 py-1 rounded ${i18n.language === "en" ? "bg-green-500 text-white" : "hover:bg-gray-200"}`}
                        >
                            EN
                        </button>
                        <button
                            onClick={() => i18n.changeLanguage("vi")}
                            className={`px-2 py-1 rounded ${i18n.language === "vi" ? "bg-green-500 text-white" : "hover:bg-gray-200"}`}
                        >
                            VI
                        </button>
                    </div>
                </div>
            </div>

            {/* Main menu */}
            <nav className="w-full bg-gradient-to-r from-blue-500 via-black-500 to-green-500 p-4 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-3">
                    {/* Logo */}
                    <a href="/" className="text-2xl font-bold tracking-wide">
                        <img src="/yonex_logo.svg" width="100" />
                    </a>

                    {/* Desktop menu */}
                    <ul className="hidden md:flex justify-center space-x-8 relative">
                        {navLinks.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <li key={item.name} className="relative">
                                    <NavLink
                                        to={item.href}
                                        className={`relative px-4 py-2 text-lg font-semibold transition-colors duration-300 ${isActive
                                            ? "text-white"
                                            : "text-gray-200 hover:text-yellow-300"
                                            }`}
                                    >
                                        {t(item.name)}
                                        {isActive && (
                                            <Motion.div
                                                layoutId="underline"
                                                className="absolute left-0 right-0 -bottom-1 h-1 rounded-full bg-yellow-300"
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 400,
                                                    damping: 30,
                                                }}
                                            />
                                        )}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Mobile menu toggle */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile menu dropdown */}
                {isOpen && (
                    <div className="md:hidden bg-white border-t shadow-lg">
                        <ul className="flex flex-col gap-2 px-4 py-4 font-medium">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <button
                                        onClick={() => handleNavigate(link)}
                                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${active === link.name
                                            ? "bg-gray-200 text-black"
                                            : "hover:bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {t(link.name)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>
        </header >
    );
}
