import { useCallback } from "react";
import useAuthContext from "../context/useAuthContext";

export default function useAuthApi() {
    const { api, setUser, setAccessToken } = useAuthContext();

    const login = useCallback(async (email, password, remember) => {
        try {
            const res = await api.post("/api/auth/signin", { email, password, remember });
            setAccessToken(res.data.accessToken);
            setUser(res.data.user);
            return res.data.user;
        } catch (err) {
            console.error("Failed to log in: ", err);
            const msg = err.response?.data?.message || err.message || "Sign in failed!";
            throw new Error(msg);
        }
    }, [api, setAccessToken, setUser]);

    const logout = useCallback(async () => {
        try {
            await api.post("/api/auth/logout");
            setUser(null);
        } catch (err) {
            console.error("Failed to log out: ", err);
            const msg = err.response?.data?.message || err.message || "Sign in failed!";
            throw new Error(msg);
        }
    }, [api, setUser]);

    const signup = useCallback(async (email, password, fullName, dateOfBirth, phone) => {
        try {
            const res = await api.post("/api/auth/signup", { email, password, fullName, dateOfBirth, phone });
            return res.data.user;
        } catch (err) {
            console.error("Failed to sign up: ", err);
            const msg = err.response?.data?.message || err.message || "Sign up failed!";
            throw new Error(msg);
        }
    }, [api]);

    return { login, logout, signup };
}