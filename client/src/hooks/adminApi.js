import { useCallback } from "react";
import useAuthContext from "../context/useAuthContext";

export default function useAdminApi() {
    const { api, accessToken } = useAuthContext();

    const getUsers = useCallback(async () => {
        try {
            const res = await api.get("/api/admin/users", {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            return res.data.users;
        } catch (err) {
            console.error("Can not get all users information: ", err);
            const msg = err.response?.data?.message || err.message || "Get all users failed!";
            throw new Error(msg);
        }
    }, [api]);

    const getProducts = useCallback(async () => {
        try {
            const res = await api.get("/api/admin/products");

            return res.data.products;
        } catch (err) {
            console.error("Can not get all products information: ", err);
            const msg = err.response?.data?.message || err.message || "Get products failed!";
            throw new Error(msg);
        }
    }, [api]);

    return { getUsers, getProducts };
}