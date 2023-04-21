import { FC } from "react"
import { Route, Routes } from "react-router-dom"
import { UserRouterProps } from "./userRouter.types"
import { UserLayout } from "@renderer/layouts/UserLayout/UserLayout"
import { CatalogPage } from "../../pages/User/Catalog"
import { CartPage } from "../../pages/User/Cart"
import { CalculatorPage } from "../../pages/User/Calculator"
import { PledgePage } from "../../pages/User/Pledge"
import { ProductPage } from "../../pages/User/Product"
import { ProfilePage } from "@renderer/pages/User/Profile"


const UserRouter: FC<UserRouterProps> = () => {
    return(
        <Routes>
            <Route path="/" element={<UserLayout/>}>
                <Route index element={<CatalogPage/>}/>
                <Route path="catalog" element={<CatalogPage/>}/>
                <Route path="calculator" element={<CalculatorPage/>}/>
                <Route path="cart" element={<CartPage/>}/>
                <Route path="pledge" element={<PledgePage/>}/>
                <Route path="product/:id" element={<ProductPage/>}/>
                <Route path="profile" element={<ProfilePage/>}/>
                <Route path="*" element={<CatalogPage/>}/>
            </Route>
        </Routes>
    )
}

export { UserRouter }