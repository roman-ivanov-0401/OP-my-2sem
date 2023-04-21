import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../../hooks/redux";
import { authSlice } from "../../../store/sliсes/authSlice"

import { RegisterFormFields } from "./register.types"
import { Roles } from "@renderer/models/user";

const Register: FC = () => {
    const dispatch = useAppDispatch()
    const { register, handleSubmit, formState: {errors} } = useForm<RegisterFormFields>({
        mode: "onChange"
    });
    const onSublit: SubmitHandler<RegisterFormFields> = ({email, login, password}) => {
        dispatch(
            authSlice.actions.setUser({
                _id: "",
                balance: 4500,
                basket: "",
                email,
                login,
                password,
                predges: "",
                role: [Roles.USER]
            })
        )
    }

    return (
        <Box 
            component={"form"}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSublit)}
        >
            <Container 
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "10px",
                height: "100vh"
            }}
            maxWidth="sm"
            >
                <Typography 
                    variant="h1"
                     mb={3}
                     textAlign={"center"}
                     >Регистрация</Typography>
                <TextField
                    required
                    label="Почта"
                    {...register("email", {
                        required: "Почта — обязательное поле",
                        pattern: {
                            value: /(.+)@(.+){2,}\.(.+){2,}/,
                            message: "Введено некорректное значение"
                        },
                        minLength: {
                            value: 5,
                            message: "Минимальное число символов — 5"
                        }
                    })}
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                />
                <TextField
                    required
                    label="Логин"
                    {...register("login", {
                        required: "Логин — обязательное поле",
                        minLength: {
                            value: 3,
                            message: "Минимальное чисол символов — 3"
                        }
                    })}
                    error={Boolean(errors.login?.message)}
                    helperText={errors.login?.message}
                />
                <TextField
                    required
                    label="Пароль"
                    {...register("password", {
                        required: "Пароль — обязательное поле",
                        minLength: {
                            value: 5,
                            message: "Минимальное число символов - 5"
                        }
                    })}
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                />
                <Container sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    paddingLeft: "0 !important",
                    paddingRight: "0 !important"
                }}>
                    <Button variant="contained" type="submit">
                        Зарегистрироваться
                    </Button>
                </Container>
            </Container>
        </Box>
    );
}

export {Register}