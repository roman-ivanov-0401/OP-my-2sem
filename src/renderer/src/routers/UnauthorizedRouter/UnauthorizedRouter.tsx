import { FC } from "react"
import { Route, Routes } from "react-router-dom"
import { UnauthorizedRouterProps } from "./unauthorizedRouter.types"
import { UnauthorizedLayout } from "../../layouts/UnauthorizedLayout"
import { LogIn } from "../../pages/Auth/LogIn"
import { Register } from "../../pages/Auth/Register"

const UnauthorizedRouter: FC<UnauthorizedRouterProps> = () => {
    return(
        <Routes>
            <Route path="/" element={<UnauthorizedLayout/>}>
                <Route index element={<LogIn/>}/>
                <Route path="login" element={<LogIn/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="*" element={<LogIn/>}/>
            </Route>
        </Routes>
    )
}

export { UnauthorizedRouter }