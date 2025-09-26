import { useEffect, useState } from "react";
import HeaderNavigation from "../components/HeaderNavigation";
import useProductApi from "../hooks/productApi";
import ProductList from "../components/ProductList";

export default function Accessories() {
    const { getProductByCategory } = useProductApi();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const p = await getProductByCategory("Accessories");
            setProducts(p);
        }
        fetchProducts();
    }, [getProductByCategory])

    return (
        <>
            <HeaderNavigation />
            <ProductList products={products} />
        </>
    );
}