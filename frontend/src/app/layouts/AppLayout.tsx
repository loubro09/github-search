import { Outlet } from "react-router-dom"
import { NavBar } from "../../components/NavBar"

import './css/AppLayout.css'

export default function AppLayout() {
    return (
        <div className="appLayout">
            <NavBar />
            <Outlet />
        </div>
    )
}