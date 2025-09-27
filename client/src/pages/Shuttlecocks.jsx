import { useEffect, useState } from "react";
// import HeaderNavigation from "../components/HeaderNavigation";
import useProductApi from "../hooks/productApi";
import ProductList from "../components/ProductList";
import LoadingGrid from "../components/LoadingGrid";

export default function Shuttlecocks() {
    const { getProductByCategory } = useProductApi();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const p = await getProductByCategory("Shuttlecocks");
                setProducts(p);
            } catch (err) {
                alert(err.response?.data?.message || "Failed to fetch product data!");
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [getProductByCategory]);

    if (loading) return <LoadingGrid />

    return (
        <>
            {/* <HeaderNavigation /> */}
            <ProductList products={products} />
        </>
    );
}