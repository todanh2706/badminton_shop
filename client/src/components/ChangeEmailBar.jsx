import { useState } from "react";
import useAuthContext from "../context/useAuthContext";
import useUserApi from "../hooks/userApi";

export default function ChangeEmailBar({ onChanged }) {
    const { user } = useAuthContext();
    const { changeEmail } = useUserApi();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = async () => {
        try {
            setLoading(true);
            const res = await changeEmail(email);
            console.log(res.message || "Email updated successfully");
            setEmail("");
            if (onChanged) onChanged();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to change email!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="inline-flex w-full gap-2">
            <input
                className="flex-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-200"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={user.email}
            />
            <button
                onClick={handleChange}
                className="bg-blue-500 text-white px-4 py-2 rounded-md whitespace-nowrap"
                disabled={loading}
            >
                {loading ? "Changing..." : "Change"}
            </button>
        </div>
    );
}
