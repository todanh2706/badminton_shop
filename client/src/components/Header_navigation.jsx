import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserButton from "./UserButton";
import LogoutButton from "./LogoutButton";
import useAuthContext from "../context/useAuthContext";
import { useTranslation } from "react-i18next";

export default function Header_navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const { accessToken } = useAuthContext();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const navLinks = [
        { name: "Accessories", href: "/accessories" },
        { name: "Apparel", href: "/apparel" },
        { name: "Bags", href: "/bags" },
        { name: "Racquets", href: "/racquets" },
        { name: "Shoes", href: "/shoes" },
        { name: "Shuttlecocks", href: "/shuttle_cocks" },
        { name: "Strings", href: "/strings" },
    ];

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

            {/* Main navbar */}
            <nav className="bg-white">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-3">
                    {/* Logo */}
                    <a href="/" className="text-2xl font-bold tracking-wide">
                        YonexShop
                    </a>

                    {/* Desktop menu */}
                    <ul className="hidden md:flex gap-8 font-semibold text-gray-700">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    className="hover:text-green-600 transition-colors"
                                >
                                    {t(link.name)}
                                </a>
                            </li>
                        ))}
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
                    <div className="md:hidden bg-white border-t">
                        <ul className="flex flex-col gap-4 px-4 py-4 font-medium">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="block hover:text-green-600"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {t(link.name)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>
        </header >
    );
}
