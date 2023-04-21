import { FC, useState, MouseEvent } from "react";

import { useAppSelector } from "../../hooks/redux"

import { NavBarProps } from "./navbar.types"

import { NavBarPoint } from "../NavBarPoint"

import {
    AppBar,
    Box,
    Menu, 
    MenuItem,
    Container,
    IconButton,

} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { Roles } from "@renderer/models/user";


const NavBar: FC<NavBarProps> = ({navPoints}) => {
    const authUser = useAppSelector(state => state.authReducer.user);

    return (
        <AppBar position="fixed">
            <Container
             maxWidth="xl"
             sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "1rem",
                marginBottom: "1rem"
             }}
             >
                <Box
                display={{xs: "none", md: "flex"}}
                gap={"1rem"}
                >
                    {
                        navPoints.map(({path, name}) => <NavBarPoint key={path} path={path} name={name}/>)
                    }
                </Box>
                <Box sx={{
                    display: {xs: "flex", md: "none"}
                }}>
                    <IconButton>
                        <MenuIcon
                            sx={{
                                color: "#ffffff"
                            }}
                        />
                    </IconButton>
                </Box>
                {
                    Boolean(authUser.role.includes(Roles.USER)) &&
                    <NavBarPoint name={"Личный кабинет"} path={"/profile"}/>

                }
            </Container>
        </AppBar>
    );
};

export { NavBar };
