import { useNavigate } from "react-router-dom";
import useAuthContext from "../context/useAuthContext";
import LoadingGrid from "./LoadingGrid";

export default function AdminRoute({ children }) {
    const { user, loading } = useAuthContext();
    const navigate = useNavigate();

    if (loading) return <LoadingGrid />

    if (!user || user.role !== "admin") {
        alert("Admin only!!!");
        navigate("/home");
    }
    return children;
}
