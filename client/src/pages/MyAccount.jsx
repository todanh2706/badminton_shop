import { useState, useEffect } from "react";
import useUserApi from "../hooks/userApi";
import useAuthContext from "../context/useAuthContext";
import Sidebar from "../components/MyAccount/Sidebar";
import ProfileTab from "../components/MyAccount/ProfileTab";
import SecurityTab from "../components/MyAccount/SecurityTab";
import AddressesTab from "../components/MyAccount/AddressesTab";
import PaymentsTab from "../components/MyAccount/PaymentsTab";
import OrdersTab from "../components/MyAccount/OrdersTab";
import LoadingGrid from "../components/LoadingGrid";

export default function MyAccount() {
    const { getUser, changeEmail, changePhone, changePassword, changeFullName, changeDateOfBirth } = useUserApi();
    const { user } = useAuthContext();

    const [activeTab, setActiveTab] = useState("profile");
    const [email, setEmail] = useState(user.email);
    const [fullName, setFullName] = useState(user.full_name);
    const [dateOfBirth, setDateOfBirth] = useState(user.date_of_birth);
    const [phone, setPhone] = useState(user.phone);
    const [showForm, setShowForm] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
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
        fetchUser();
    }, []);

    if (!user) return <LoadingGrid />;

    function validate() {
        if (!email) return "Please enter your new email!";
        const emailRe = /\S+@\S+\.\S+/;
        if (!emailRe.test(email)) return "Please enter a valid email address.";
        if (!phone) return "Please enter your phone number!";
        const phoneRe = /^[0-9]{9,15}$/;
        if (!phoneRe.test(phone)) return "Please enter a valid phone number.";
        // if (!address) return "Please enter your address!"; 
        // // if (address.length < 5) return "Address must be at least 5 characters long."; 
        return null;
    }

    const handleChangeButton = async () => {
        setError("");
        const v = validate();
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
            // if (address !== user.address) {
            //     try {
            //         setLoading(true);
            //         const res = await changeAddress(address);
            //         alert(res.message || "Address updated successfully");
            //     } catch (err) {
            //         alert(err.response?.data?.message || "Failed to change address!");
            //     } finally {
            //         setLoading(false);
            //     }
            // }
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
        } catch (err) {
            alert(err.response?.data?.message || "Failed to update information!");
        } finally {
            setLoading(false);
        }
    }

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

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="flex-1 p-6">
                {activeTab === "profile" && (
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
                )}
                {activeTab === "security" && (
                    <SecurityTab
                        showForm={showForm}
                        setShowForm={setShowForm}
                        oldPassword={oldPassword}
                        newPassword={newPassword}
                        confirmPassword={confirmPassword}
                        setOldPassword={setOldPassword}
                        setNewPassword={setNewPassword}
                        setConfirmPassword={setConfirmPassword}
                        handleChangePassword={handleChangePassword}
                        loading={loading}
                        error={error}
                    />
                )}
                {activeTab === "addresses" && <AddressesTab />}
                {activeTab === "payments" && <PaymentsTab />}
                {activeTab === "orders" && <OrdersTab />}
            </main>
        </div>
    );
}
