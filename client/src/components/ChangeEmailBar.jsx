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
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={user.email}
            />
            <button
                onClick={handleChange}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={loading}
            >
                {loading ? "Changing..." : "Change"}
            </button>
        </div>
    );
}
