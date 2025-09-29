import { useState, useEffect } from "react";
import useUserApi from "../../hooks/userApi";

export default function AddressesTab() {
    const [showForm, setShowForm] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { getAddresses } = useUserApi();

    useEffect(() => {
        if (showForm) {
            const fetchAddresses = async () => {
                try {
                    setLoading(true);
                    setError(null);
                    const res = await getAddresses();
                    setAddresses(res.data || []);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchAddresses();
        }
    }, [showForm]);

    return (
        <section>
            <h3 className="text-xl font-semibold mb-4">Addresses</h3>
            {!showForm ? (
                <div className="bg-white shadow rounded-lg p-4">
                    <button
                        onClick={() => setShowForm(true)}
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Show Saved Addresses
                    </button>
                </div>
            ) : (
                <div className="bg-white shadow rounded-lg p-4">
                    <button
                        onClick={() => setShowForm(false)}
                        className="mb-4 bg-gray-300 text-gray-800 px-3 py-1 rounded-md"
                    >
                        Back
                    </button>

                    {loading && <p>Loading addresses...</p>}
                    {error && <p className="text-red-500">{error}</p>}

                    {!loading && !error && (
                        <ul className="space-y-3">
                            {addresses.length > 0 ? (
                                addresses.map((addr, index) => (
                                    <li
                                        key={addr.id || index}
                                        className="p-3 border rounded-md"
                                    >
                                        <p>
                                            <span className="font-semibold">Street:</span>{" "}
                                            {addr.street}
                                        </p>
                                        <p>
                                            <span className="font-semibold">City:</span>{" "}
                                            {addr.city}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Country:</span>{" "}
                                            {addr.country}
                                        </p>
                                    </li>
                                ))
                            ) : (
                                <p>No saved addresses.</p>
                            )}
                        </ul>
                    )}
                </div>
            )}
        </section>
    );
}