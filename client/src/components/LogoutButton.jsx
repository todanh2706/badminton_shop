import { useNavigate } from "react-router-dom";
import useAuthApi from "../hooks/authApi";

export default function LogoutButton() {
    const navigate = useNavigate();
    const { logout } = useAuthApi();

    async function handleClick() {
        // Call to logout api
        await logout();
        // Navigate to sign in page
        navigate("/signin");
    }

    return (
        <button
            className="hover:text-black flex items-center gap-1"
            onClick={handleClick}
        >
            Log out
        </button>
    );
}