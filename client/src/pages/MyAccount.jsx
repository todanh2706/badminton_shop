import { useState, useEffect } from "react";
import useUserApi from "../hooks/userApi";
import useAuthContext from "../context/useAuthContext";
import Sidebar from "../components/MyAccount/Sidebar.jsx";
import ProfileTab from "../components/MyAccount/ProfileTab.jsx";
import SecurityTab from "../components/MyAccount/SecurityTab.jsx";
import AddressesTab from "../components/MyAccount/AddressesTab.jsx";
import PaymentsTab from "../components/MyAccount/PaymentsTab.jsx";
import OrdersTab from "../components/MyAccount/OrdersTab.jsx";
import LoadingGrid from "../components/LoadingGrid.jsx";
import PageWrapper from "../components/PageWrapper.jsx";

export default function MyAccount() {
    const { getUser, changeEmail, changePhone, changePassword, changeFullName, changeDateOfBirth, getAddresses, addAddress, changeAddress } = useUserApi();
    const { user } = useAuthContext();

    // For Profile tab ----------------
    const [email, setEmail] = useState(user.email);
    const [fullName, setFullName] = useState(user.full_name);
    const [dateOfBirth, setDateOfBirth] = useState(user.date_of_birth);
    const [phone, setPhone] = useState(user.phone);


    async function fetchUser() {
        try {
            const data = await getUser();
            if (data) {
                setEmail(data.email);
                setFullName(data.full_name);
                setDateOfBirth(data.date_of_birth);
                setPhone(data.phone);
            }
        } catch (err) {
            console.error(err);
        }
    };

    function validateProfile() {
        if (!email) return "Please enter your new email!";
        const emailRe = /\S+@\S+\.\S+/;
        if (!emailRe.test(email)) return "Please enter a valid email address.";
        if (!phone) return "Please enter your phone number!";
        const phoneRe = /^[0-9]{9,15}$/;
        if (!phoneRe.test(phone)) return "Please enter a valid phone number.";
        return null;
    }

    const handleChangeButton = async () => {
        setError("");
        const v = validateProfile();
        if (v) {
            setError(v);
            return;
        }

        try {
            if (email !== user.email) {
                try {
                    setLoading(true);
                    const res = await changeEmail(email);
                    alert(res.message || "Email updated successfully");
                } catch (err) {
                    alert(err.response?.data?.message || "Failed to change email!");
                } finally {
                    setLoading(false);
                }
            }
            if (phone !== user.phone) {
                try {
                    setLoading(true);
                    const res = await changePhone(phone);
                    alert(res.message || "Phone updated successfully");
                } catch (err) {
                    alert(err.response?.data?.message || "Failed to change phone!");
                } finally {
                    setLoading(false);
                }
            }
            if (fullName !== user.full_name) {
                try {
                    setLoading(true);
                    const res = await changeFullName(fullName);
                    alert(res.message || "Full name updated successfully");
                } catch (err) {
                    alert(err.response?.data?.message || "Failed to change full name!");
                } finally {
                    setLoading(false);
                }
            }
            if (dateOfBirth !== user.date_of_birth) {
                try {
                    setLoading(true);
                    const res = await changeDateOfBirth(dateOfBirth);
                    alert(res.message || "Date of birth updated successfully");
                } catch (err) {
                    alert(err.response?.data?.message || "Failed to change date of birth!");
                } finally {
                    setLoading(false);
                }
            }

            fetchUser();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to update information!");
        } finally {
            setLoading(false);
        }
    }
    // --------------------------------

    // For Security tab ---------------
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleChangePassword(e) {
        e.preventDefault();
        setError("");

        if (!oldPassword || !newPassword || !confirmPassword) {
            setError("All fields are required!");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match!");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters long!");
            return;
        }

        try {
            setLoading(true);
            const res = await changePassword(oldPassword, newPassword);
            alert(res.message || "Changed password successfully");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to change password!");
        } finally {
            setLoading(false);
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
    }
    // --------------------------------

    // For Addresses tab --------------
    const [addresses, setAddresses] = useState([]);
    const [country, setCountry] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [editingAddress, setEditingAddress] = useState(null);

    const validateAddresses = () => {
        if (!country) return "Country is required!";
        if (!city) return "City is required!";
        if (!streetAddress) return "Street address is required!";
        if (postalCode && !/^[0-9]{3,10}$/.test(postalCode)) {
            return "Postal code must be 3-10 digits!";
        }
        return null;
    }

    async function fetchAddresses() {
        try {
            setLoading(true);
            setError(null);
            const res = await getAddresses();
            setAddresses(res.addresses || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddAddresses = async (e) => {
        e.preventDefault();
        setError("");

        const v = validateAddresses();
        if (v) {
            setError(v);
            return;
        }

        try {
            if (editingAddress) {
                const res = await changeAddress(editingAddress.id, country, postalCode, city, streetAddress);
                alert(res.message || "Address updated successfully");
            } else {
                setLoading(true);
                const res = await addAddress(country, postalCode, city, streetAddress);
                alert(res.message || "Added new address successfully");
            }

            await fetchAddresses();
            setCountry("");
            setPostalCode("");
            setCity("");
            setStreetAddress("");
            setShowForm(false);
        } catch (err) {
            alert(err.response?.data?.message || "Failed to save address!")
        } finally {
            setLoading(false);
        }
    }

    const handleEditAddress = (addr) => {
        setEditingAddress(addr);
        setCountry(addr.country || "");
        setPostalCode(addr.postal_code || "");
        setCity(addr.city || "");
        setStreetAddress(addr.street_address || "");
        setShowForm(true);
    };
    // --------------------------------

    // In common properties -----------
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");
    // --------------------------------

    useEffect(() => {
        fetchAddresses();
        fetchUser();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="flex-1 p-6">
                {!user ? (
                    <LoadingGrid />
                ) : (
                    <>
                        {activeTab === "profile" && (
                            <PageWrapper>
                                <ProfileTab
                                    user={user}
                                    email={email}
                                    setEmail={setEmail}
                                    fullName={fullName}
                                    setFullName={setFullName}
                                    dateOfBirth={dateOfBirth}
                                    setDateOfBirth={setDateOfBirth}
                                    phone={phone}
                                    setPhone={setPhone}
                                    error={error}
                                    loading={loading}
                                    // isChanged={isChanged}
                                    handleChangeButton={handleChangeButton}
                                />
                            </PageWrapper>
                        )}
                        {activeTab === "security" && (
                            <PageWrapper>
                                <SecurityTab
                                    oldPassword={oldPassword}
                                    newPassword={newPassword}
                                    confirmPassword={confirmPassword}
                                    setOldPassword={setOldPassword}
                                    setNewPassword={setNewPassword}
                                    setConfirmPassword={setConfirmPassword}
                                    handleChangePassword={handleChangePassword}
                                    showForm={showForm}
                                    setShowForm={setShowForm}
                                    loading={loading}
                                    error={error}
                                />
                            </PageWrapper>
                        )}
                        {activeTab === "addresses" && (
                            <PageWrapper>
                                <AddressesTab
                                    addresses={addresses}
                                    country={country}
                                    setCountry={setCountry}
                                    postalCode={postalCode}
                                    setPostalCode={setPostalCode}
                                    city={city}
                                    setCity={setCity}
                                    streetAddress={streetAddress}
                                    setStreetAddress={setStreetAddress}
                                    loading={loading}
                                    error={error}
                                    handleEditAddress={handleEditAddress}
                                    handleAddAddresses={handleAddAddresses}
                                    showForm={showForm}
                                    setShowForm={setShowForm}
                                />
                            </PageWrapper>
                        )}
                        {activeTab === "payments" && <PageWrapper><PaymentsTab /></PageWrapper>}
                        {activeTab === "orders" && <PageWrapper><OrdersTab /></PageWrapper>}
                    </>
                )}

            </main >
        </div >
    );
}
