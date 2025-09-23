import { useEffect, useState } from "react";
import useAuthContext from "../context/useAuthContext";

export default function My_account() {
    const { getUser } = useAuthContext();
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const u = await getUser();
                setUser(u);
            } catch (err) {
                console.error(err);
            }
        }
        fetchUser();
    }, []);

    if (!user) return <p>Loading...</p>

    return (
        <div>
            <h1>Welcome {user.email}</h1>
            <p>Check: your email is {user.email}</p>
            <p>Check: your phone number is {user.phone}</p>
        </div>
    );
}