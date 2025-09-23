import { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "./authContext";

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        async function initAuth() {
            try {
                // xin token mới trước
                const refreshRes = await api.get("/api/auth/refresh");
                const newToken = refreshRes.data.accessToken;
                setAccessToken(newToken);

                // dùng token mới để lấy user
                const meRes = await api.get("/api/userdata/me", {
                    headers: { Authorization: `Bearer ${newToken}` }
                });
                setUser(meRes.data.user);
            } catch (err) {
                console.error("Auth init failed:", err);
                setUser(null);
                setAccessToken(null);
            }
        }
        initAuth();
    }, []);

    // Axios instance with cookies enabled
    const api = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
        withCredentials: true,
    });

    // Axios response interceptor for token refresh
    api.interceptors.response.use(
        res => res,
        async (err) => {
            if (err.response?.status === 401 && !err.config._retry) {
                err.config._retry = true;

                try {
                    const refreshRes = await api.get("/api/auth/refresh");
                    const newToken = refreshRes.data.accessToken;
                    setAccessToken(newToken);
                    err.config.headers["Authorization"] = `Bearer ${newToken}`;
                    return api.request(err.config);
                } catch (refreshErr) {
                    setAccessToken(null);
                    return Promise.reject(refreshErr);
                }
            }
            return Promise.reject(err);
        }
    );

    const login = async (email, password, remember) => {
        const res = await api.post("/api/auth/signin", { email, password, remember });
        setAccessToken(res.data.accessToken);
        return res.data.user;
    }
    const logout = async () => {
        await api.post("/logout");
        setAccessToken(null);
    }

    // Fetch user data
    async function getUser() {
        try {
            const res = await api.get("/api/userdata/me", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return res.data.user;
        } catch (err) {
            console.error("Failed to fetch user:", err);
            throw err;
        }
    }

    const value = { user, setUser, accessToken, login, logout, api, getUser };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}