import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import useUserApi from "../hooks/userApi";
import useAuthContext from "../context/useAuthContext";
import { User, Lock, MapPin, CreditCard, ShoppingBag, Globe, ArrowLeft } from "lucide-react";

export default function MyAccount() {
    const { getUser, changeEmail, changePhone, changeAddress, changePassword } = useUserApi();
    const { user } = useAuthContext();
    const [activeTab, setActiveTab] = useState("profile");
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [address, setAddress] = useState(user.address);
    const [showForm, setShowForm] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
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

    function validate() {
        if (!email) return "Please enter your new email!";
        const emailRe = /\S+@\S+\.\S+/;
        if (!emailRe.test(email)) return "Please enter a valid email address.";

        if (!phone) return "Please enter your phone number!";
        const phoneRe = /^[0-9]{9,15}$/;
        if (!phoneRe.test(phone)) return "Please enter a valid phone number.";

        if (!address) return "Please enter your address!";
        if (address.length < 5) return "Address must be at least 5 characters long.";

        return null;
    }

    const handleChangeButton = async () => {
        setError("");
        const v = validate();
        if (v) {
            setError(v);
            return;
        }

        try {
            if (email !== user.email) {
                try {
                    setLoading(true);
                    const res = await changeEmail(email);
                    alert(res.message || "Email updated successfully");
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
                    alert(res.message || "Phone updated successfully");
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
                    alert(res.message || "Address updated successfully");
                } catch (err) {
                    alert(err.response?.data?.message || "Failed to change address!");
                } finally {
                    setLoading(false);
                }
            }
        } catch (err) {
            alert(err.response?.data?.message || "Failed to update information!");
        } finally {
            setLoading(false);
        }
    }

    async function handleChangePassword(e) {
        e.preventDefault();
        setError("");

        if (!oldPassword || !newPassword || !confirmPassword) {
            setError("All fields are required!");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match!");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters long!");
            return;
        }

        try {
            setLoading(true);
            const res = await changePassword(oldPassword, newPassword);
            alert(res.message || "Changed password successfully");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to change password!");
        } finally {
            setLoading(false);
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
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

                        {error && (
                            <div
                                role="alert"
                                className="mt-4 border border-red-200 bg-red-50 text-red-700 px-4 py-2 rounded"
                            >
                                {error}
                            </div>
                        )}

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
                                type="submit"
                                disabled={loading}
                                className={`w-full inline-flex justify-center items-center gap-2 rounded-md px-4 py-2 ${isChanged
                                    ? "bg-blue-500 text-white hover:bg-blue-600"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }}`}
                                aria-busy={loading}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                onClick={handleChangeButton}
                            >
                                {loading ? (
                                    <>
                                        <svg
                                            className="animate-spin h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v8z"
                                            ></path>
                                        </svg>
                                        Loading...
                                    </>
                                ) : (
                                    "Save change"
                                )}
                            </Motion.button>
                        </div>
                    </section>
                )}

                {activeTab === "security" && (
                    <section>
                        <h3 className="text-xl font-semibold mb-4">Security</h3>
                        {/* <div className="bg-white shadow rounded-lg p-4 flex gap-4"> */}
                        {!showForm ? (
                            <div className="bg-white shadow rounded-lg p-4 flex gap-4">
                                <Motion.button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-blue-600 text-white px-4 py-2 font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
                                    aria-busy={loading}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.15 }}
                                    onClick={() => setShowForm(true)}
                                >
                                    {loading ? (
                                        <>
                                            <svg
                                                className="animate-spin h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v8z"
                                                ></path>
                                            </svg>
                                            Loading...
                                        </>
                                    ) : (
                                        "Change Password"
                                    )}
                                </Motion.button>

                                <Motion.button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-green-600 text-white px-4 py-2 font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
                                    aria-busy={loading}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.15 }}
                                // onClick={handleChangeButton}
                                >
                                    {loading ? (
                                        <>
                                            <svg
                                                className="animate-spin h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v8z"
                                                ></path>
                                            </svg>
                                            Loading...
                                        </>
                                    ) : (
                                        "Enable 2FA"
                                    )}
                                </Motion.button>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleChangePassword}
                                className="bg-white shadow rounded-lg p-6 flex flex-col gap-4 max-w-md"
                            >
                                <div>
                                    <label className="block text-sm font-medium mb-1">Current Password</label>
                                    <input
                                        type="password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className="border p-2 rounded w-full"
                                        placeholder="Enter current password"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">New Password</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="border p-2 rounded w-full"
                                        placeholder="Enter new password"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Confirm Your New Password</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="border p-2 rounded w-full"
                                        placeholder="Enter new password again"
                                    />
                                </div>

                                {error && <p className="text-red-500 text-sm">{error}</p>}

                                <div className="flex gap-2">
                                    <Motion.button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-blue-600 text-white px-4 py-2 font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
                                        aria-busy={loading}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        {loading ? (
                                            <>
                                                <svg
                                                    className="animate-spin h-5 w-5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v8z"
                                                    ></path>
                                                </svg>
                                                Loading...
                                            </>
                                        ) : (
                                            "Save"
                                        )}
                                    </Motion.button>

                                    <Motion.button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-yellow-600 text-white px-4 py-2 font-semibold shadow hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
                                        aria-busy={loading}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                        onClick={() => setShowForm(false)}
                                    >
                                        {loading ? (
                                            <>
                                                <svg
                                                    className="animate-spin h-5 w-5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v8z"
                                                    ></path>
                                                </svg>
                                                Loading...
                                            </>
                                        ) : (
                                            "Cancle"
                                        )}
                                    </Motion.button>
                                </div>
                            </form>
                        )}
                        {/* </div> */}
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
