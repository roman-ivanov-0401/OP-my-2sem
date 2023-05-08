import { Box, Button, Container, TextField, Typography } from "@mui/material";
import {FC, useState} from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import {useAppDispatch, useAppSelector} from "../../../hooks/redux"
import { authSlice } from "../../../store/sliсes/authSlice"
import { LoginFormFields } from "./login.types"
import {useNavigate} from "react-router-dom";

const LogIn: FC = () => {
    const [isCredentialsCorrect, setIsCredentialsCorrect] = useState<boolean>(true)

    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors } }  = useForm<LoginFormFields>({
        mode: "onChange"
    });
    const userList = useAppSelector(state => state.authReducer.users)
    const router = useNavigate();

    const onSubmit: SubmitHandler<LoginFormFields> = ({ email, password }) => {
        const foundUser = userList.find(user => user.email == email && user.password == password)
        if(foundUser){
          dispatch(authSlice.actions.setUser(foundUser))
          router("/catalog")
        }
        else{
          setIsCredentialsCorrect(false)
        }
    };

    return (
        <Box
            component={"form"}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
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
                     >Авторизация</Typography>
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
                            message: "Минимальное число символов - 5"
                        }
                     })}
                     error={Boolean(errors.email?.message)}
                     helperText={errors.email?.message}
                />
                <TextField
                    required
                    label="Пароль"
                    {...register("password", {
                        required: "Почта — обязательное поле",
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
                        Войти
                    </Button>
                </Container>
              {
                !isCredentialsCorrect &&
                <Typography>
                  Пользователь не существует или введён неверный пароль
                </Typography>
              }
            </Container>
        </Box>
    );
}

export {LogIn}
