import { FC } from "react"
import { Route, Routes } from "react-router-dom"
import { AdminRouterProps } from "./adminRouter.types"
import { AdminLayout } from "../../layouts/AdminLayout"
import { UserManagmentPage } from "@renderer/pages/Admin/UserManagment"
import { ProductManagmentPage } from "@renderer/pages/Admin/ProductManagment"
import { PledgeManagmentPage } from "@renderer/pages/Admin/PredgeManagment"
import { ProfilePage } from "@renderer/pages/User/Profile"
import { PledgeByIdManagment } from "@renderer/pages/Admin/PledgeByIdManagment"

const AdminRouter: FC<AdminRouterProps> = () => {
    return(
        <Routes>
            <Route path="/" element={<AdminLayout/>}>
                <Route index element={<UserManagmentPage/>}/>
                <Route path="users" element={<UserManagmentPage/>}/>
                <Route path="products" element={<ProductManagmentPage/>}/>
                <Route path="pledges" element={<PledgeManagmentPage/>}/>
                <Route path="pledges/:id" element={<PledgeByIdManagment/>}/>
                <Route path="profile" element={<ProfilePage/>}/>
                <Route path="*" element={<UserManagmentPage/>}/>
            </Route>
        </Routes>
    )
}

export { AdminRouter }
