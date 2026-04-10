import { Outlet } from "react-router-dom"
import { NavBar } from "../../components/NavBar"

export default function AppLayout() {
    return (
        <div className="appLayout">
            <NavBar />
            <Outlet />
        </div>
    )
}