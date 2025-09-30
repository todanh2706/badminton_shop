import { motion as Motion } from "framer-motion";
import { Pencil } from "lucide-react";
import LoadingGrid from "../LoadingGrid";

export default function AddressesTab({
    addresses,
    country,
    setCountry,
    postalCode,
    setPostalCode,
    city,
    setCity,
    streetAddress,
    setStreetAddress,
    loading,
    error,
    handleEditAddress,
    handleAddAddresses,
    showForm,
    setShowForm,
}) {


    return (
        <section>
            <h3 className="text-xl font-semibold mb-4">Addresses</h3>
            {!showForm ? (
                <div className="bg-white shadow rounded-lg p-4">
                    {loading && <LoadingGrid />}
                    {error && <p className="text-red-500">{error}</p>}

                    {!loading && !error && (
                        <ul className="space-y-3">
                            {addresses.length > 0 ? (
                                addresses.map((addr, index) => (
                                    <li
                                        key={addr.id || index}
                                        className="flex justify-between items-start p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition"
                                    >
                                        <div className="space-y-1">
                                            <p>
                                                <span className="font-semibold text-gray-700">Street:</span>{" "}
                                                <span className="text-gray-800">{addr.street_address}</span>
                                            </p>
                                            <p>
                                                <span className="font-semibold text-gray-700">City:</span>{" "}
                                                <span className="text-gray-800">{addr.city}</span>
                                            </p>
                                            <p>
                                                <span className="font-semibold text-gray-700">Country:</span>{" "}
                                                <span className="text-gray-800">{addr.country}</span>
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => handleEditAddress(addr)}
                                            className="p-2 rounded-full hover:bg-blue-100 text-blue-600 transition"
                                            title="Edit address"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-500 italic">No saved addresses.</p>
                            )}
                        </ul>

                    )}

                    <Motion.button
                        type="button"
                        disabled={loading}
                        className="mt-4 w-full inline-flex justify-center items-center gap-2 rounded-md px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
                        aria-busy={loading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        onClick={() => setShowForm(true)}

                    >
                        {loading ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                                Loading...
                            </>
                        ) : (
                            "Add another address"
                        )}
                    </Motion.button>
                </div>
            ) : (
                <form
                    onSubmit={handleAddAddresses}
                    className="bg-white shadow rounded-lg p-6 flex flex-col gap-4 w-full"
                >
                    <div>
                        <label className="block text-sm font-medium mb-1">Country</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="border p-2 rounded w-full"
                                placeholder="Country"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Postal Code</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                className="border p-2 rounded w-full"
                                placeholder="Postal Code in your location"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">City</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="border p-2 rounded w-full"
                                placeholder="City"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Street Address</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={streetAddress}
                                onChange={(e) => setStreetAddress(e.target.value)}
                                className="border p-2 rounded w-full"
                                placeholder="Your comprehensive address (street address)"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Motion.button
                            type="button"
                            disable={loading}
                            className="w-full inline-flex justify-center items-center gap-2 rounded-md px-4 py-2 bg-green-300 text-white hover:bg-green-400"
                            aria-busy={loading}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            onClick={handleAddAddresses}
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                    </svg>
                                    Loading...
                                </>
                            ) : (
                                "Save"
                            )}
                        </Motion.button>

                        <Motion.button
                            type="button"
                            disable={loading}
                            className="w-full inline-flex justify-center items-center gap-2 rounded-md px-4 py-2 bg-orange-300 text-white hover:bg-orange-400"
                            aria-busy={loading}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            onClick={() => setShowForm(false)}
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                    </svg>
                                    Loading...
                                </>
                            ) : (
                                "Cancel"
                            )}
                        </Motion.button>
                    </div>
                </form>
            )}
        </section>
    );
}