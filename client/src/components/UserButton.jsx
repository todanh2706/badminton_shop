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
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-md"
        >
            <User className="w-6 h-6" />
        </button>
    );
}