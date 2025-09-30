import { useState, useEffect, useRef } from "react";
import axios from "axios";
import AuthContext from "./authContext";

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const refreshing = useRef(false);
    const [expiresAt, setExpiresAt] = useState(null);
    const [loading, setLoading] = useState(true);


    // Axios instance with cookies enabled
    const api = axios.create({
        baseURL: "https://badminton-shop-sjaa.onrender.com",
        withCredentials: true,
    });

    // Axios response interceptor for token refresh
    api.interceptors.response.use(
        res => res,
        async (err) => {
            const originalRequest = err.config;
            if (originalRequest.url.includes("/api/auth/refresh")) {
                return Promise.reject(err);
            }

            if (err.response?.status === 401 && !err.config._retry) {
                if (refreshing.current) {
                    await new Promise(r => setTimeout(r, 500));
                    err.config.headers["Authorization"] = `Bearer ${accessToken}`;
                    return api.request(err.config);
                }

                err.config._retry = true;
                refreshing.current = true;

                try {
                    const refreshRes = await api.get("/api/auth/refresh");
                    const newToken = refreshRes.data.accessToken;
                    setAccessToken(newToken);
                    err.config.headers["Authorization"] = `Bearer ${newToken}`;
                    return api.request(err.config);
                } catch (refreshErr) {
                    setAccessToken(null);
                    setUser(null);
                    return Promise.reject(refreshErr);
                } finally {
                    refreshing.current = false;
                }
            }
            return Promise.reject(err);
        }
    );

    async function doRefresh() {
        if (refreshing.current) return accessToken;
        refreshing.current = true;
        try {
            const res = await api.get("/api/auth/refresh");
            const newToken = res.data.accessToken;
            const exp = Date.now() + 15 * 60 * 1000;
            setAccessToken(newToken);
            setExpiresAt(exp);
            return newToken;
        } finally {
            refreshing.current = false;
        }
    }

    async function getValidToken() {
        if (accessToken && expiresAt && Date.now() < expiresAt - 30_000) {
            return accessToken;
        }
        return await doRefresh();
    }

    useEffect(() => {
        async function initAuth() {
            try {
                // const hasRefreshToken = document.cookie.includes("refreshToken");
                // if (!hasRefreshToken) return;

                const res = await api.get("/api/auth/refresh"); // backend sẽ dùng cookie HttpOnly
                const newToken = res.data.accessToken;
                setAccessToken(newToken)
                const me = await api.get("/api/userdata/me", {
                    headers: { Authorization: `Bearer ${newToken}` },
                });
                setUser(me.data.user);
            } catch (e) {
                console.warn("No valid session", e);
                setUser(null);
                setAccessToken(null);
                setExpiresAt(null);
            } finally {
                setLoading(false);
            }
        }
        initAuth();
    }, []);

    const value = { user, setUser, accessToken, setAccessToken, api, loading };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}