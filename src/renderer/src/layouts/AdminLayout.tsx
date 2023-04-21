import { FC } from "react"
import { Outlet } from "react-router-dom"
import { NavBar, adminPoints } from "../components/NavBar"

const AdminLayout: FC = () => {
    return (
        <>
            <NavBar navPoints={adminPoints}/>
            admin
            <Outlet/>
        </>
    )
}

export { AdminLayout }