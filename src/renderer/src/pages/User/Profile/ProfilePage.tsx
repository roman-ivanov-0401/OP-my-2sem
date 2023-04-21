import { FC } from "react"
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { authSlice } from "../../../store/sliсes/authSlice"

const ProfilePage: FC = () => {
    const authUser = useAppSelector(state => state.authReducer.user);
    const dispatch = useAppDispatch();

    const exitHandle = (): void => {
        dispatch(authSlice.actions.logOut())
    }

    return(
        <Container sx={{
            marginTop: "50px"
        }}>
            <Typography variant="h1">
                Профиль
            </Typography>
            <Paper sx={{
                padding: "10px",
                marginTop: "10px",
                display: "flex",
                justifyContent: "space-between",
                gap:"10px"
            }}>
                <Box
                    flexBasis="45%"
                >
                    <Typography variant="caption">
                        Здесь должно быть фото пользователя, но я не уверен,
                        что Низами сможет реализовать раздачу статики.
                    </Typography>
                </Box>
                <Box
                    flexBasis="45%"
                >
                    <Typography variant="h6">
                        Логин: {authUser.login}
                    </Typography>
                    <Typography variant="h6">
                        Почта: {authUser.email}
                    </Typography>
                    <Typography variant="h6">
                        Баланс: {authUser.balance}
                    </Typography>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <Button
                            onClick={exitHandle}
                            variant="contained"
                            color="warning"
                        >
                            Выйти из учётной записи
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export { ProfilePage }