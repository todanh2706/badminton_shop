import { useContext } from "react";
import AuthContext from "./authContext";

export default function useAuthContext() {
    return useContext(AuthContext);
}