import { useState } from "react";
import useAuthContext from "../context/useAuthContext";
import LoadingGrid from "../components/LoadingGrid";

export default function AdminDashboard() {
    const [showUsers, setShowUsers] = useState(false);
    const [showProducts, setShowProducts] = useState(false);
    const [showAddresses, setShowAddresses] = useState(false);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);

    const { api } = useAuthContext();

    const handleShowProducts = async () => {
        try {
            if (!showProducts) {
                setLoading(true);
                const res = await api.get("/api/admin/products");
                setProducts(res.data.products || []);
            }
            setShowProducts(!showProducts);
        } catch (err) {
            alert(err.response?.data?.message || "Failed to fetch all products!");
        } finally {
            setLoading(false);
        }
    }

    const handleShowUsers = async () => {
        try {
            if (!showUsers) {
                setLoading(true);
                const res = await api.get("/api/admin/users");
                setUsers(res.data.users || []);
            }
            setShowUsers(!showUsers);
        } catch (err) {
            alert(err.response?.data?.message || "Failed to fetch all users!");
        } finally {
            setLoading(false);
        }
    };

    const handleShowAddresses = async () => {
        try {
            if (!showAddresses) {
                setLoading(true);
                const res = await api.get("/api/admin/addresses");
                setAddresses(res.data.addresses || []);
            }
            setShowAddresses(!showAddresses);
        } catch (err) {
            alert(err.response?.data?.message || "Failed to fetch all addresses!");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingGrid />

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            <div className="grid grid-cols-3 gap-4">
                <button
                    onClick={handleShowUsers}
                    className="bg-blue-500 text-white p-4 rounded-lg"
                >
                    {showUsers ? "Hide Users" : "Show All Users"}
                </button>

                <button
                    onClick={handleShowProducts}
                    className="bg-green-500 text-white p-4 rounded-lg"
                >
                    {showProducts ? "Hide Products" : "Show All Products"}
                </button>

                <button
                    onClick={handleShowAddresses}
                    className="bg-yellow-500 text-white p-4 rounded-lg"
                >
                    {showAddresses ? "Hide Addresses" : "Show All Addresses"}
                </button>
            </div>

            {/* Conditionally render the Users Table */}
            {showUsers && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">Users</h2>
                    <table className="w-full border">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 border">Email</th>
                                <th className="p-2 border">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id} className="border-t">
                                    <td className="p-2 border">{u.email}</td>
                                    <td className="p-2 border">{u.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Conditionally render the Products Table */}
            {showProducts && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">Products</h2>
                    <table className="w-full border">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 border">Name</th>
                                <th className="p-2 border">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((u) => (
                                <tr key={u.id} className="border-t">
                                    <td className="p-2 border">{u.name}</td>
                                    <td className="p-2 border">{u.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Conditionally render the Addresses_Users Table */}
            {showAddresses && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">Addresses</h2>
                    <table className="w-full border">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 border">Street address</th>
                                <th className="p-2 border">Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addresses.map((u) => (
                                <tr key={u.id} className="border-t">
                                    <td className="p-2 border">{u.street_address}</td>
                                    <td className="p-2 border">{u.country}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}