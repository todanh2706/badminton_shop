import { useState } from "react";

export default function VerifyOtp() {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const email = new URLSearchParams(window.location.search).get("email");

    async function handleVerify(e) {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.message || "Verification failed");
            }

            alert("Account verified successfully!");
            window.location.href = "/signin";
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/otp_bg.jpg')" }}
            ></div>
            <div className="absolute inset-0 bg-black/50"></div>
            <form
                onSubmit={handleVerify}
                className="relative z-10 p-8 max-w-md w-full text-white bg-black/40 backdrop-blur-md shadow-lg rounded-2xl flex flex-col items-center"
            >
                <img src="/yonex_logo.svg" className="w-60 h-auto" />
                <h2 className="text-xl font-semibold mb-4">Enter OTP sent to {email}</h2>
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="border p-2 w-full rounded"
                    placeholder="Enter OTP"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button className="bg-blue-600 text-white px-4 py-2 mt-3 rounded">Verify</button>
            </form>
        </div>
    );
}
