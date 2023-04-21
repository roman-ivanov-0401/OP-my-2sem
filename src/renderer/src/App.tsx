import { FC } from "react";

import { UnauthorizedRouter } from "./routers/UnauthorizedRouter"
import { UserRouter } from "./routers/UserRouter"
import { AdminRouter } from "./routers/AdminRouter"

import "./app.module.scss";
import { useAppSelector } from "./hooks/redux";
import { Roles } from "./models/user";

const App: FC = () => {
    const { user } = useAppSelector(state => state.authReducer)
    if(!user.role.includes(Roles.USER)) return <UnauthorizedRouter />
    if(user.role.includes(Roles.ADMIN)) return <AdminRouter/>
    return <UserRouter />
};

export default App;
