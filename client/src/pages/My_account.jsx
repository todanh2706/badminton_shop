// My_account.jsx
import { useEffect } from "react";
import useUserApi from "../hooks/userApi";
import ChangeEmailBar from "../components/ChangeEmailBar";
import ChangePhoneBar from "../components/ChangePhoneBar";
import useAuthContext from "../context/useAuthContext";

export default function My_account() {
    const { getUser } = useUserApi();
    const { user } = useAuthContext();

    async function reloadUser() {
        try {
            await getUser();
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        reloadUser(); // lần đầu load
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <h1>Welcome {user.email}</h1>
            <ChangeEmailBar onChanged={reloadUser} />
            <ChangePhoneBar onChanged={reloadUser} />
        </div>
    );
}
