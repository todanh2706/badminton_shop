// ChangePhoneBar.jsx
import { useState } from "react";
import useAuthContext from "../context/useAuthContext";
import useUserApi from "../hooks/userApi";

export default function ChangePhoneBar({ onChanged }) {
    const { user } = useAuthContext();
    const { changePhone } = useUserApi();
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = async () => {
        try {
            setLoading(true);
            const res = await changePhone(phone);
            console.log(res.message || "Phone updated successfully");
            setPhone("");
            if (onChanged) onChanged();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to change phone!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={user.phone}
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
