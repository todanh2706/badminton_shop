import { useState, useEffect } from "react";
import useAuthApi from "../hooks/authApi";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(false);
    const { signup } = useAuthApi();
    const navigate = useNavigate();

    const images = [
        "/grpht_thrttl.webp",
        "/ax99_new.webp",
        "/ax100zz.webp",
        "/ax77_ax99.webp"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [images.length]);

    function validate() {
        if (!email) return "Please enter your email.";
        // simple email regex
        const re = /\S+@\S+\.\S+/;
        if (!re.test(email)) return "Please enter a valid email address.";
        if (!password) return "Please enter your password.";
        if (password.length < 6) return "Password must be at least 6 characters.";
        if (!fullName) return "Please enter your full name.";
        if (!dateOfBirth) return "Please enter your date of birth.";
        if (!phone) return "Please enter your phone number.";
        return null;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (password !== confirmpassword) {
            setError("Password do not match!");
            return;
        }
        setError("");

        const v = validate();
        if (v) {
            setError(v);
            return;
        }

        try {
            setLoading(true);
            await signup(email, password, fullName, dateOfBirth, phone);
            navigate("/signin");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Left part: form */}
            <div className="p-8 md:p-10">
                <div className="max-w-md mx-auto">
                    <img src="/yonex_logo.svg"></img>

                    {error && (
                        <div
                            role="alert"
                            className="mt-4 border border-red-200 bg-red-50 text-red-700 px-4 py-2 rounded"
                        >
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <label className="block">
                            <span className="text-sm font-medium text-slate-700">Email</span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                aria-required="true"
                                className="mt-1 block w-full rounded-md border border-slate-200 px-3 py-2 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
                                placeholder="Enter your email"
                            />
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium text-slate-700">Full name</span>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                aria-required="true"
                                className="mt-1 block w-full rounded-md border border-slate-200 px-3 py-2 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
                                placeholder="Enter your full name"
                            />
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium text-slate-700">Date of birth</span>
                            <input
                                type="date"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                required
                                aria-required="true"
                                className="mt-1 block w-full rounded-md border border-slate-200 px-3 py-2 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
                                placeholder="Enter your birthday"
                            />
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium text-slate-700">Phone number</span>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                aria-required="true"
                                className="mt-1 block w-full rounded-md border border-slate-200 px-3 py-2 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
                                placeholder="Enter your phone number"
                            />
                        </label>

                        <label className="block">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-700">Password</span>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    aria-required="true"
                                    className="mt-1 block w-full rounded-md border border-slate-200 px-3 py-2 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 end-0 flex items-center z-20 px-2.5 cursor-pointer text-gray-400 rounded-e-md"
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} aria-hidden="true" />
                                    ) : (
                                        <Eye size={20} aria-hidden="true" />
                                    )}
                                </button>
                            </div>
                        </label>

                        <label className="block">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-700">Confirm your password</span>
                            </div>
                            <input
                                type="password"
                                value={confirmpassword}
                                onChange={(e) => setConfirmpassword(e.target.value)}
                                required
                                aria-required="true"
                                className="mt-1 block w-full rounded-md border border-slate-200 px-3 py-2 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
                                placeholder="Enter your password again"
                            />
                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-blue-600 text-white px-4 py-2 font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
                            aria-busy={loading}
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
                                    Signing up...
                                </>
                            ) : (
                                "Sign up"
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Right part: background */}
            <div className="hidden md:block relative overflow-hidden">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100" : "opacity-0"}`}
                        style={{ backgroundImage: `url(${img})` }}
                    >
                        <div className="h-full w-full bg-black/40" />
                    </div>
                ))}
            </div>
        </div>
    );
}