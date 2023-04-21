import { FC } from "react"
import { Outlet } from "react-router-dom"
import { NavBar, userPoints } from "../../components/NavBar"

const UserLayout: FC = () => {
    return (
        <>
            <NavBar navPoints={userPoints}/>
            User
            <Outlet/>
        </>
    )
}

export { UserLayout }