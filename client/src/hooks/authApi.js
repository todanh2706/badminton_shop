import { useCallback } from "react";
import useAuthContext from "../context/useAuthContext";

export default function useAuthApi() {
    const { api, setUser, setAccessToken } = useAuthContext();

    const login = useCallback(async (email, password, remember) => {
        const res = await api.post("/api/auth/signin", { email, password, remember });
        setAccessToken(res.data.accessToken);
        setUser(res.data.user);
        return res.data.user;
    }, [api, setAccessToken, setUser]);

    const logout = useCallback(async () => {
        await api.post("/api/auth/logout");
        setUser(null);
    }, [api, setUser]);

    return { login, logout };
}