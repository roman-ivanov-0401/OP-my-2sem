import { FC } from "react"
import { Outlet } from "react-router-dom"
import { NavBar, unauthorizedPoints } from "../components/NavBar"

const UnauthorizedLayout: FC = () => {
    return (
        <>
            <NavBar navPoints={unauthorizedPoints}/>
            <Outlet/>
        </>
    )
}

export { UnauthorizedLayout }