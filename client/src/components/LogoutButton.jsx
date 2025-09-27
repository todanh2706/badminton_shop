import { useNavigate } from "react-router-dom";
import useAuthApi from "../hooks/authApi";
import { useTranslation } from "react-i18next";

export default function LogoutButton() {
    const navigate = useNavigate();
    const { logout } = useAuthApi();
    const { t } = useTranslation();

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
            {t("Logout")}
        </button>
    );
}