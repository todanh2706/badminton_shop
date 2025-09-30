import { useState, useEffect, useRef } from "react";
import axios from "axios";
import AuthContext from "./authContext";

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const refreshing = useRef(false);
    const [loading, setLoading] = useState(true);

    const api = axios.create({
        baseURL: "https://badminton-shop-sjaa.onrender.com",
        withCredentials: true,
    });

    // Interceptor: auto refresh nếu gặp 401
    api.interceptors.response.use(
        res => res,
        async (err) => {
            const originalRequest = err.config;
            if (originalRequest.url.includes("/api/auth/refresh")) {
                return Promise.reject(err);
            }

            if (err.response?.status === 401 && !originalRequest._retry) {
                if (refreshing.current) {
                    await new Promise(r => setTimeout(r, 500));
                    originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                    return api.request(originalRequest);
                }

                originalRequest._retry = true;
                refreshing.current = true;

                try {
                    const refreshRes = await api.get("/api/auth/refresh");
                    const newToken = refreshRes.data.accessToken;
                    setAccessToken(newToken);
                    originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                    return api.request(originalRequest);
                } catch (refreshErr) {
                    setUser(null);
                    setAccessToken(null);
                    return Promise.reject(refreshErr);
                } finally {
                    refreshing.current = false;
                }
            }
            return Promise.reject(err);
        }
    );

    // Hàm gọi refresh thủ công
    async function doRefresh() {
        if (refreshing.current) return accessToken;
        refreshing.current = true;
        try {
            const res = await api.get("/api/auth/refresh");
            const newToken = res.data.accessToken;
            setAccessToken(newToken);
            return newToken;
        } finally {
            refreshing.current = false;
        }
    }

    useEffect(() => {
        async function initAuth() {
            try {
                const newToken = await doRefresh(); // luôn thử refresh khi reload
                if (!newToken) throw new Error("No access token");
                const me = await api.get("/api/userdata/me", {
                    headers: { Authorization: `Bearer ${newToken}` },
                });
                setUser(me.data.user);
            } catch (e) {
                console.warn("No valid session", e);
                setUser(null);
                setAccessToken(null);
            } finally {
                setLoading(false);
            }
        }
        initAuth();

        // Tự refresh định kỳ mỗi 12 phút
        const interval = setInterval(doRefresh, 12 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const value = { user, setUser, accessToken, api, loading };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
