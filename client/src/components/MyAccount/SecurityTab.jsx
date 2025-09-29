import { motion as Motion } from "framer-motion";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SecurityTab({
    showForm,
    setShowForm,
    oldPassword,
    newPassword,
    confirmPassword,
    setOldPassword,
    setNewPassword,
    setConfirmPassword,
    handleChangePassword,
    loading,
    error,
}) {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <section>
            <h3 className="text-xl font-semibold mb-4">Security</h3>

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
                        className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-green-600 text-white px-4 py-2 font-semibold shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
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
                        <div className="relative">
                            <input
                                type={showOldPassword ? "text" : "password"}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="border p-2 rounded w-full"
                                placeholder="Enter your old password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                                className="absolute inset-y-0 end-0 flex items-center z-20 px-2.5 cursor-pointer text-gray-400 rounded-e-md"
                            >
                                {showOldPassword ? (
                                    <EyeOff size={20} aria-hidden="true" />
                                ) : (
                                    <Eye size={20} aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">New Password</label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="border p-2 rounded w-full"
                                placeholder="Enter your new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute inset-y-0 end-0 flex items-center z-20 px-2.5 cursor-pointer text-gray-400 rounded-e-md"
                            >
                                {showNewPassword ? (
                                    <EyeOff size={20} aria-hidden="true" />
                                ) : (
                                    <Eye size={20} aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="border p-2 rounded w-full"
                                placeholder="Confirm your new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 end-0 flex items-center z-20 px-2.5 cursor-pointer text-gray-400 rounded-e-md"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={20} aria-hidden="true" />
                                ) : (
                                    <Eye size={20} aria-hidden="true" />
                                )}
                            </button>
                        </div>
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
        </section>
    );
}
