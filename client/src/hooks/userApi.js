import { useCallback } from "react";
import useAuthContext from "../context/useAuthContext";

export default function useUserApi() {
    const { api, accessToken, setUser } = useAuthContext();

    const getUser = useCallback(async () => {
        try {
            const res = await api.get("/api/userdata/me", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            setUser(res.data.user);
            return res.data.user;
        } catch (err) {
            console.error("Can not get user's information: ", err);
            const msg = err.response?.data?.message || err.message || "Sign in failed!";
            throw new Error(msg);
        }
    }, [api, accessToken, setUser]);

    const changeEmail = useCallback(async (email) => {
        try {
            const res = await api.post(
                "/api/userdata/change-email",
                { email },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            if (res.data.email) setUser((prev) => ({ ...prev, email: res.data.email }));
            return res.data;
        } catch (err) {
            console.error("Failed to change email: ", err);
            const msg = err.response?.data?.message || err.message || "Change email failed!";
            throw new Error(msg);
        }
    }, [api, accessToken, setUser]);

    const changePhone = useCallback(async (phone) => {
        try {
            const res = await api.post(
                "/api/userdata/change-phone",
                { phone },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            if (res.data.phone) setUser((prev) => ({ ...prev, phone: res.data.phone }));

            return res.data;
        } catch (err) {
            console.error("Failed to change phone number: ", err);
            const msg = err.response?.data?.message || err.message || "Change phone failed!";
            throw new Error(msg);
        }
    }, [api, accessToken, setUser]);

    const changeAddress = useCallback(async (address) => {
        try {
            const res = await api.post(
                "/api/userdata/change-address",
                { address },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            if (res.data.phone) setUser((prev) => ({ ...prev, address: res.data.address }));

            return res.data;
        } catch (err) {
            console.error("Failed to change address: ", err);
            const msg = err.response?.data?.message || err.message || "Change address failed!";
            throw new Error(msg);
        }
    }, [api, accessToken, setUser]);

    const changePassword = useCallback(async (oldPassword, newPassword) => {
        try {
            const res = await api.post(
                "/api/userdata/change-password",
                { oldPassword, newPassword },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );

            return res.data;
        } catch (err) {
            console.error("Failed to change password: ", err);
            const msg = err.response?.data?.message || err.message || "Change password failed!";
            throw new Error(msg);
        }
    }, [api, accessToken]);

    return { getUser, changeEmail, changePhone, changeAddress, changePassword };
}