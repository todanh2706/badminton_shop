// src/components/UserButton.jsx
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react"; // icon từ lucide-react

export default function UserButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/myaccount");
    };

    return (
        <button
            onClick={handleClick}
            className="hover:text-black flex items-center gap-1"
        >
            <User className="w-6 h-6" />
        </button>
    );
}