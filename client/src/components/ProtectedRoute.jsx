import { Navigate } from "react-router-dom";
import useAuthContext from "../context/useAuthContext";

export default function ProtectedRoute({ children }) {
    const { accessToken } = useAuthContext();

    if (!accessToken) {
        return (<Navigate to="/signin" replace />);
    }

    return children;
}