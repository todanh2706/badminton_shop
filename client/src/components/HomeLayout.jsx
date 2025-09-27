import { Outlet } from "react-router-dom";
import HeaderNavigation from "./HeaderNavigation";

export default function HomeLayout() {
    return (
        <div>
            <HeaderNavigation />
            <div>
                <Outlet />
            </div>
        </div>
    )
}