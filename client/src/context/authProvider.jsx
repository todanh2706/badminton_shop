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
        baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
        withCredentials: true,
    });

    // Axios response interceptor for token refresh
    api.interceptors.response.use(
        res => res, // Success => just return the untouched response
        async (err) => { // Error handler
            const originalRequest = err.config; // Grab the original request
            if (originalRequest.url.includes("/api/auth/refresh")) { // If failed to refresh => don't retry -> avoid infinite loop
                return Promise.reject(err);
            }

            if (err.response?.status === 401 && !err.config._retry) { // 401 error handler
                if (refreshing.current) {  // If another request is already running -> wait and retry the original request with the latest accessToken
                    await new Promise(r => setTimeout(r, 500));
                    err.config.headers["Authorization"] = `Bearer ${accessToken}`;
                    return api.request(err.config);
                }

                err.config._retry = true; // retried request
                refreshing.current = true;

                try {
                    const refreshRes = await api.get("/api/auth/refresh"); // Get new token
                    const newToken = refreshRes.data.accessToken;
                    setAccessToken(newToken); // Save it

                    err.config.headers["Authorization"] = `Bearer ${newToken}`;
                    return api.request(err.config); // Retry
                } catch (refreshErr) { // Catch error from failed request
                    setAccessToken(null);
                    setUser(null);
                    return Promise.reject(refreshErr);
                } finally { // Clean up
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
                const newToken = await getValidToken();
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