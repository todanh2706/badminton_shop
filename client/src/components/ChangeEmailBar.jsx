import { useState } from "react";
import useUserApi from "../hooks/userApi";
import useAuthContext from "../context/useAuthContext";


export default function ChangeEmailBar() {
    const { user } = useAuthContext();
    const { changeEmail } = useUserApi();
    const [email, setEmail] = useState("");


    const handleChange = async () => {
        try {
            const res = await changeEmail(email);
            console.log(res.message || "Email updated successfully");
        } catch (err) {
            alert(err.response?.data?.message || "Failed to change email!");
        }
    }

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
            >
                Change
            </button>
        </div>
    )
}