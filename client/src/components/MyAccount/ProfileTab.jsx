import { motion as Motion } from "framer-motion";
import { useMemo } from "react";

export default function ProfileTab({
    user,
    email,
    setEmail,
    fullName,
    setFullName,
    dateOfBirth,
    setDateOfBirth,
    phone,
    setPhone,
    error,
    loading,
    handleChangeButton,
}) {
    const isChanged = useMemo(() => {
        if (!user) return false;
        const norm = (v) => (v ?? "").toString().trim();
        return (
            norm(email) !== norm(user.email) ||
            norm(phone) !== norm(user.phone) ||
            norm(fullName) !== norm(user.full_name) ||
            norm(dateOfBirth) !== norm(user.date_of_birth)
        );
    }, [email, phone, fullName, dateOfBirth, user]);

    return (
        <section>
            <h3 className="text-xl font-semibold mb-4">Profile Information</h3>

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
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Full name</label>
                    <input
                        className="w-full border rounded-md px-3 py-2 mt-1 text-gray-400 focus:text-black"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        autoComplete="name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Date of birth</label>
                    <input
                        className="w-full border rounded-md px-3 py-2 mt-1 text-gray-400 focus:text-black"
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        autoComplete="bday"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Phone</label>
                    <input
                        className="w-full border rounded-md px-3 py-2 mt-1 text-gray-400 focus:text-black"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="tel"
                    />
                </div>

                <Motion.button
                    type="button"
                    disabled={loading || !isChanged}
                    className={`w-full inline-flex justify-center items-center gap-2 rounded-md px-4 py-2 ${isChanged
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    aria-busy={loading}
                    whileHover={{ scale: isChanged ? 1.05 : 1 }}
                    whileTap={{ scale: isChanged ? 0.95 : 1 }}
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
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                            </svg>
                            Loading...
                        </>
                    ) : (
                        "Save change"
                    )}
                </Motion.button>
            </div>
        </section>
    );
}
