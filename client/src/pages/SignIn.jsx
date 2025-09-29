import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthApi from "../hooks/authApi";

export default function SignIn() {
    const { login } = useAuthApi();
    const [emailInput, setEmailInput] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [current, setCurrent] = useState(0);
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

    // useEffect(() => {
    //     if (email) { navigate("/") }
    // }, [email, navigate]);


    function validate() {
        if (!emailInput) return "Please enter your email.";
        // simple email regex
        const re = /\S+@\S+\.\S+/;
        if (!re.test(emailInput)) return "Please enter a valid email address.";
        if (!password) return "Please enter your password.";
        if (password.length < 6) return "Password must be at least 6 characters.";
        return null;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        const v = validate();
        if (v) {
            setError(v);
            return;
        }

        try {
            setLoading(true);

            await login(emailInput, password, remember);

            // const data = await res.json();
            // console.log("Signed in: ", user.email);
            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleSocial(provider) {
        // for demo: call your backend /oauth/:provider or open popup
        window.alert(`Social sign in: ${provider} (implement on backend)`);
    }

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Left part: background */}
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

            {/* Right part: form */}
            <div className="p-8 md:p-10">
                <div className="max-w-md mx-auto">
                    {/* <h1 className="text-2xl font-bold text-slate-900">Sign in</h1>
                     */}
                    <img src="/yonex_logo.svg"></img>
                    {/* <p className="mt-2 text-sm text-slate-500">
                        Sign in to your account with email and password.
                    </p> */}

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
                                value={emailInput}
                                onChange={(e) => {
                                    setEmailInput(e.target.value);
                                }}
                                required
                                aria-required="true"
                                className="mt-1 block w-full rounded-md border border-slate-200 px-3 py-2 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
                                placeholder="Enter your email"
                            />
                        </label>

                        <label className="block">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-700">Password</span>
                                <a
                                    href="/forgot-password"
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Forgot?
                                </a>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                aria-required="true"
                                className="mt-1 block w-full rounded-md border border-slate-200 px-3 py-2 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
                                placeholder="Enter your password"
                            />
                        </label>

                        <div className="flex items-center justify-between">
                            <label className="inline-flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-slate-600">Remember me</span>
                            </label>

                            <a href="/signup" className="text-sm text-slate-600 hover:underline">
                                Create account
                            </a>
                        </div>

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
                                    Signing in...
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </form>

                    <div className="mt-6 flex items-center gap-3">
                        <div className="flex-1 h-px bg-slate-200" />
                        <div className="text-sm text-slate-400">Or continue with</div>
                        <div className="flex-1 h-px bg-slate-200" />
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <button
                            onClick={() => {
                                window.location.href = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/google`;
                            }}
                            className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 px-3 py-2 bg-white text-slate-700 hover:bg-slate-50"
                            aria-label="Sign in with Google"
                        >
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 533.5 544.3"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path fill="#4285F4" d="M533.5 278.4c0-17.5-1.4-34.3-4.1-50.6H272v95.7h146.9c-6.3 34-25.4 62.9-54.4 82.2v68.1h87.8c51.3-47.3 81.2-116.8 81.2-195.4z" />
                                <path fill="#34A853" d="M272 544.3c73.6 0 135.4-24.4 180.5-66.1l-87.8-68.1c-24.5 16.5-56 26-92.7 26-71 0-131-47.9-152.4-112.2H29.5v70.3C73.8 487.2 168 544.3 272 544.3z" />
                                <path fill="#FBBC05" d="M119.6 322.8c-10.5-31.6-10.5-65.6 0-97.2V155.3H29.5c-39.6 78.9-39.6 172.2 0 251.1l90.1-83.6z" />
                                <path fill="#EA4335" d="M272 107.6c38.9 0 73.9 13.4 101.4 39l76-76C407.4 25.1 344.7 0 272 0 168 0 73.8 57.1 29.5 155.3l90.1 70.3C141 155.5 201 107.6 272 107.6z" />
                            </svg>
                            Google
                        </button>

                        <button
                            onClick={() => handleSocial("facebook")}
                            className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 px-3 py-2 bg-white text-slate-700 hover:bg-slate-50"
                            aria-label="Sign in with Facebook"
                        >
                            <svg className="h-4 w-4" viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#1877F2" d="M279.14 288l14.22-92.66h-88.91V129.33c0-25.35 12.42-50.06 52.24-50.06H293V6.26S259.44 0 225.36 0C141.09 0 89.09 54.42 89.09 154.7v40.64H0v92.66h89.09V512h107.36V288z" />
                            </svg>
                            Facebook
                        </button>
                    </div>

                    <p className="mt-6 text-center text-sm text-slate-500">
                        By signing in you agree to our{" "}
                        <a className="text-blue-600 hover:underline" href="/terms">
                            Terms
                        </a>
                        {" "}and{" "}
                        <a className="text-blue-600 hover:underline" href="/privacy">
                            Privacy Policy
                        </a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
