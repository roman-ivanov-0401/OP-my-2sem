import { FC } from "react"
import { Route, Routes } from "react-router-dom"
import { AdminRouterProps } from "./adminRouter.types"
import { AdminLayout } from "../../layouts/AdminLayout"
import { UserManagmentPage } from "@renderer/pages/Admin/UserManagment"
import { ProductManagmentPage } from "@renderer/pages/Admin/ProductManagment"
import { PredgeManagmentPage } from "@renderer/pages/Admin/PredgeManagment"
import { ProfilePage } from "@renderer/pages/User/Profile"

const AdminRouter: FC<AdminRouterProps> = () => {
    return(
        <Routes>
            <Route path="/" element={<AdminLayout/>}>
                <Route index element={<UserManagmentPage/>}/>
                <Route path="users" element={<UserManagmentPage/>}/>
                <Route path="products" element={<ProductManagmentPage/>}/>
                <Route path="predges" element={<PredgeManagmentPage/>}/>
                <Route path="profile" element={<ProfilePage/>}/>
                <Route path="*" element={<UserManagmentPage/>}/>
            </Route>
        </Routes>
    )
}

export { AdminRouter }