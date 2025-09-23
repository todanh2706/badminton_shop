import { useCallback } from "react";
import useAuthContext from "../context/useAuthContext";

export default function useUserApi() {
    const { api, accessToken, setUser } = useAuthContext();

    const getUser = useCallback(async () => {
        const res = await api.get("/api/userdata/me", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        setUser(res.data.user);
        return res.data.user;
    }, [api, accessToken, setUser]);

    const changeEmail = useCallback(async (email) => {
        const res = await api.post(
            "/api/userdata/change-email",
            { email },
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (res.data.email) setUser((prev) => ({ ...prev, email: res.data.email }));
        return res.data;
    }, [api, accessToken, setUser]);

    const changePhone = useCallback(async (phone) => {
        const res = await api.post(
            "/api/userdata/change-phone",
            { phone },
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (res.data.phone) setUser((prev) => ({ ...prev, phone: res.data.phone }));

        return res.data;
    }, [api, accessToken, setUser]);

    return { getUser, changeEmail, changePhone };
}