import { useCallback } from "react";
import useAuthContext from "../context/useAuthContext";

export default function useProductApi() {
    const { api } = useAuthContext();

    const getProductByCategory = useCallback(async (category) => {
        try {
            const res = await api.get(`/api/productdata/category/${category}`);
            console.log(res.data)
            return res.data;
        } catch (err) {
            console.error("Can not get products list with category: ", err);
            const msg = err.response?.data?.message || err.message || "Get producst failed!";
            throw new Error(msg);
        }
    }, [api]);

    return { getProductByCategory };
}