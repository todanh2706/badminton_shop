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
        <form onSubmit={handleVerify} className="p-8 max-w-md mx-auto">
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
    );
}
