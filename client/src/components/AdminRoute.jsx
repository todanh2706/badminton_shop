import { Navigate } from "react-router-dom";
import useAuthContext from "../context/useAuthContext";
import LoadingGrid from "./LoadingGrid";

export default function AdminRoute({ children }) {
    const { user, loading } = useAuthContext();

    if (loading) return <LoadingGrid />

    if (!user || user.role !== "admin") {
        alert("Admin only!!!");
        <Navigate to="/home" />
    }
    return children;
}
