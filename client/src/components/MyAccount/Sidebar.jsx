import { motion as Motion } from "framer-motion";
import { User, Lock, MapPin, CreditCard, ShoppingBag, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ activeTab, setActiveTab }) {
    const tabs = [
        { id: "profile", label: "Profile", icon: <User size={18} /> },
        { id: "security", label: "Security", icon: <Lock size={18} /> },
        { id: "addresses", label: "Addresses", icon: <MapPin size={18} /> },
        { id: "payments", label: "Payments", icon: <CreditCard size={18} /> },
        { id: "orders", label: "Orders", icon: <ShoppingBag size={18} /> },
    ];
    const navigate = useNavigate();

    return (
        <aside className="w-64 bg-white shadow-md p-4">
            <h2 className="text-lg font-semibold mb-6">My Account</h2>
            <nav className="space-y-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className="relative flex items-center gap-2 w-full px-3 py-2 rounded-md transition hover:bg-gray-100"
                    >
                        {activeTab === tab.id && (
                            <Motion.div
                                layoutId="activeTabIndicator"
                                className="absolute inset-0 rounded-md bg-blue-500"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                        <span
                            className={`relative z-10 flex items-center gap-2 text-left ${activeTab === tab.id ? "text-white" : "text-gray-700"
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </span>
                    </button>
                ))}

                <Motion.button
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-left text-yellow-500 hover:bg-yellow-50 mt-4"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => navigate("/")}
                >
                    <ArrowLeft size={18} />
                    Back to home
                </Motion.button>
            </nav>
        </aside>
    );
}
