import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import useUserApi from "../hooks/userApi";
import useAuthContext from "../context/useAuthContext";
import { User, Lock, MapPin, CreditCard, ShoppingBag, Globe, ArrowLeft } from "lucide-react";

export default function MyAccount() {
    const { getUser, changeEmail, changePhone, changeAddress } = useUserApi();
    const { user } = useAuthContext();
    const [activeTab, setActiveTab] = useState("profile");
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [address, setAddress] = useState(user.address);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const isChanged = email !== user.email || phone !== user.phone || address !== user.address

    const tabs = [
        { id: "profile", label: "Profile", icon: <User size={18} /> },
        { id: "security", label: "Security", icon: <Lock size={18} /> },
        { id: "addresses", label: "Addresses", icon: <MapPin size={18} /> },
        { id: "payments", label: "Payments", icon: <CreditCard size={18} /> },
        { id: "orders", label: "Orders", icon: <ShoppingBag size={18} /> },
    ];

    async function reloadUser() {
        try {
            await getUser();
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        reloadUser();
    }, [user]);

    if (!user) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

    const handleChangeButton = async () => {
        if (email !== user.email) {
            try {
                setLoading(true);
                const res = await changeEmail(email);
                console.log(res.message || "Email updated successfully");
            } catch (err) {
                alert(err.response?.data?.message || "Failed to change email!");
            } finally {
                setLoading(false);
            }
        }
        if (phone !== user.phone) {
            try {
                setLoading(true);
                const res = await changePhone(phone);
                console.log(res.message || "Phone updated successfully");
            } catch (err) {
                alert(err.response?.data?.message || "Failed to change phone!");
            } finally {
                setLoading(false);
            }
        }
        if (address !== user.address) {
            try {
                setLoading(true);
                const res = await changeAddress(address);
                console.log(res.message || "Address updated successfully");
            } catch (err) {
                alert(err.response?.data?.message || "Failed to change address!");
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
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
                            <span className={`relative z-10 flex items-center gap-2 text-left ${activeTab === tab.id ? "text-white" : "text-gray-700"
                                }`}>
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

            {/* Content */}
            <main className="flex-1 p-6">
                {activeTab === "profile" && (
                    <section>
                        <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
                        {/* Profile form */}
                        <div className="bg-white shadow rounded-lg p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Email</label>
                                <input
                                    className="w-full border rounded-md px-3 py-2 mt-1 text-gray-400 focus:text-black"
                                    type="email"
                                    value={email}
                                    defaultValue={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Phone</label>
                                <input
                                    className="w-full border rounded-md px-3 py-2 mt-1 text-gray-400 focus:text-black"
                                    type="text"
                                    value={phone}
                                    defaultValue={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Address</label>
                                <input
                                    className="w-full border rounded-md px-3 py-2 mt-1 text-gray-400 focus:text-black"
                                    type="text"
                                    value={address}
                                    defaultValue={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <Motion.button
                                className={`px-4 py-2 rounded-md ${isChanged
                                    ? "bg-blue-500 text-white hover:bg-blue-600"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                onClick={handleChangeButton}
                                disabled={loading}
                            >
                                {loading ? "Changing..." : "Save change"}
                            </Motion.button>
                        </div>
                    </section>
                )}

                {activeTab === "security" && (
                    <section>
                        <h3 className="text-xl font-semibold mb-4">Security</h3>
                        <div className="bg-white shadow rounded-lg p-4 flex gap-4">
                            <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md">
                                Change Password
                            </button>
                            <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md">
                                Enable 2FA
                            </button>
                        </div>

                    </section>
                )}

                {activeTab === "addresses" && (
                    <section>
                        <h3 className="text-xl font-semibold mb-4">Addresses</h3>
                        <div className="bg-white shadow rounded-lg p-4">
                            <p>No saved addresses.</p>
                            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">
                                Add New Address
                            </button>
                        </div>
                    </section>
                )}

                {activeTab === "payments" && (
                    <section>
                        <h3 className="text-xl font-semibold mb-4">Payment Methods</h3>
                        <div className="bg-white shadow rounded-lg p-4">
                            <p>No payment methods saved.</p>
                        </div>
                    </section>
                )}

                {activeTab === "orders" && (
                    <section>
                        <h3 className="text-xl font-semibold mb-4">Order History</h3>
                        <div className="bg-white shadow rounded-lg p-4">
                            <p>You have no orders yet.</p>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
