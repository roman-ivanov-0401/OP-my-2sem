import {
    Box,
    Button,
    Container,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import { FC, useState } from "react";
import { Close, Delete, Edit } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@renderer/hooks/redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { authSlice } from "@renderer/store/sliсes/authSlice";
import { IUser, Roles } from "@renderer/models/user";
import { cartSlice } from "@renderer/store/sliсes/cartSlice";
import { ICart } from "@renderer/models/cart";
import { IPledge } from "@renderer/models/pledge";
import { pledgeSlice } from "@renderer/store/sliсes/pledgeSlice";

export type AddUserFields = {
    email: string;
    login: string;
    balance: number;
    password: string;
};

const UserManagmentPage: FC = () => {
    const users = useAppSelector((state) => state.authReducer.users);
    const dispatch = useAppDispatch();
    const [isAddUserDialogIsOpen, setIsAddUserDialogIsOpen] = useState<boolean>(false);
    const [isEditUserDialogIsOpen, setIsEditUserDialogIsOpen] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined)

    const {
        register: addUserRegister,
        handleSubmit: addUserHandleSubmit,
        formState: { errors: addUserErrors, isValid: addUserIsValid }
    } = useForm<AddUserFields>({
        mode: "onChange"
    });

    const {
        register: editUserRegister,
        handleSubmit: editUserHandleSubmit,
        formState: { errors: editUserErrors, isValid: editUserIsValid }
    } = useForm<AddUserFields>({
        mode: "onChange"
    });

    const openAddUserDialogHandler = (): void => {
        setIsAddUserDialogIsOpen(true);
    };
    const closeAddUserDialogHandler = (): void => {
        setIsAddUserDialogIsOpen(false);
    };

    const openEditUserDialogHandler = (id: string): void => {
        setCurrentUser(users.find(({ _id }) => id == _id))
        setIsEditUserDialogIsOpen(true);
    };
    const closeEditUserDialogHandler = (): void => {
        setIsEditUserDialogIsOpen(false);
    };

    const addUserOnSubmit: SubmitHandler<AddUserFields> = ({ balance, email, login, password }) => {
        const newCart: ICart = {
            _id: String(Math.random() * 1000),
            products: []
        };
        dispatch(cartSlice.actions.addCart(newCart));

        const newPledge: IPledge = {
            _id: String(Math.random() * 1000),
            dataOut: new Date().toString(),
            dateIn: new Date().toString(),
            products: []
        };
        dispatch(pledgeSlice.actions.addPledge(newPledge));

        dispatch(
            authSlice.actions.addUser({
                _id: String(Math.random() * 1000),
                balance,
                basket: newCart._id,
                email,
                login,
                password,
                pledge: newPledge._id,
                roles: [Roles.USER]
            })
        );

        setIsAddUserDialogIsOpen(false);
    };

    const editUserOnSubmit: SubmitHandler<AddUserFields> = ({ balance, email, login, password }) => {
      if(currentUser){
        dispatch(authSlice.actions.editUser({
          _id: currentUser?._id,
          balance,
          basket: currentUser?.basket,
          email,
          login,
          password,
          pledge: currentUser?.pledge,
          roles: currentUser?.roles
        }))
      }
      setIsEditUserDialogIsOpen(false);
  };

    const deleteUserHandler = (_id: string): void => {
        dispatch(authSlice.actions.deleteUser(_id));
    };

    return (
        <Container
            sx={{
                marginTop: "80px"
            }}
        >
            <Typography variant="h4" sx={{ marginBottom: "10px" }}>
                Страница управления учётными записями
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Номер</TableCell>
                            <TableCell>Логин</TableCell>
                            <TableCell>Почта</TableCell>
                            <TableCell>Балланс</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.filter(({ roles }) => !roles.includes(Roles.ADMIN)).map(({ balance, email, login, _id }, index) => (
                            <TableRow key={_id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{login}</TableCell>
                                <TableCell>{email}</TableCell>
                                <TableCell>{balance}</TableCell>
                                <TableCell>
                                    <IconButton onClick={(): void => openEditUserDialogHandler(_id)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={(): void => deleteUserHandler(_id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "end"
                }}
            >
                <Button
                    variant={"contained"}
                    sx={{ marginTop: "10px" }}
                    onClick={openAddUserDialogHandler}
                >
                    Добавить пользователя
                </Button>
            </Box>
            <Dialog open={isAddUserDialogIsOpen}>
                <IconButton
                    sx={{ position: "absolute", top: 15, right: 15 }}
                    onClick={closeAddUserDialogHandler}
                >
                    <Close />
                </IconButton>
                <DialogTitle>
                    <Typography variant="h4">Добавить пользователя</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>Введите данные пользователя</DialogContentText>
                    <Box component={"form"} onSubmit={addUserHandleSubmit(addUserOnSubmit)}>
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Адрес электронной почты"
                            error={Boolean(addUserErrors.email?.message)}
                            helperText={addUserErrors.email?.message}
                            {...addUserRegister("email", {
                                required: "Поле является обязательным",
                                pattern: {
                                    value: /(.+)@(.+){2,}\.(.+){2,}/,
                                    message: "Введено некорректное значение"
                                }
                            })}
                            sx={{
                                marginTop: 3,
                                marginBottom: 3
                            }}
                        />
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Логин"
                            error={Boolean(addUserErrors.login?.message)}
                            helperText={addUserErrors.login?.message}
                            {...addUserRegister("login", {
                                required: "Поле является обязательным",
                                minLength: {
                                    value: 3,
                                    message: "Минимальное количество символов — 3"
                                }
                            })}
                            sx={{
                                marginBottom: 3
                            }}
                        />
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Пароль"
                            error={Boolean(addUserErrors.password?.message)}
                            helperText={addUserErrors.password?.message}
                            {...addUserRegister("password", {
                                required: "Поле является обязательным",
                                minLength: {
                                    value: 5,
                                    message: "Минимальное количество символов — 5"
                                }
                            })}
                            sx={{
                                marginBottom: 3
                            }}
                        />
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Балланс"
                            error={Boolean(addUserErrors.balance?.message)}
                            helperText={addUserErrors.balance?.message}
                            {...addUserRegister("balance", {
                                required: "Поле является обязательным",
                                pattern: {
                                    value: /^(([1-9]\d*)|0)\.\d\d$/,
                                    message: "Некорректный формат"
                                }
                            })}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "end",
                                marginTop: 3
                            }}
                        >
                            <Button variant="contained" disabled={!addUserIsValid} type="submit">
                                Добавить
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
            <Dialog open={isEditUserDialogIsOpen}>
                <IconButton
                    sx={{ position: "absolute", top: 15, right: 15 }}
                    onClick={closeEditUserDialogHandler}
                >
                    <Close />
                </IconButton>
                <DialogTitle>
                    <Typography variant="h4">Редактировать пользователя</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>Введите данные пользователя</DialogContentText>
                    <Box component={"form"} onSubmit={editUserHandleSubmit(editUserOnSubmit)}>
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Адрес электронной почты"
                            error={Boolean(editUserErrors.email?.message)}
                            helperText={editUserErrors.email?.message}
                            defaultValue={currentUser?.email}
                            {...editUserRegister("email", {
                                required: "Поле является обязательным",
                                pattern: {
                                    value: /(.+)@(.+){2,}\.(.+){2,}/,
                                    message: "Введено некорректное значение"
                                }
                            })}
                            sx={{
                                marginTop: 3,
                                marginBottom: 3
                            }}
                        />
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Логин"
                            error={Boolean(editUserErrors.login?.message)}
                            helperText={editUserErrors.login?.message}
                            defaultValue={currentUser?.login}
                            {...editUserRegister("login", {
                                required: "Поле является обязательным",
                                minLength: {
                                    value: 3,
                                    message: "Минимальное количество символов — 3"
                                }
                            })}
                            sx={{
                                marginBottom: 3
                            }}
                        />
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Пароль"
                            error={Boolean(editUserErrors.password?.message)}
                            helperText={editUserErrors.password?.message}
                            defaultValue={currentUser?.password}
                            {...editUserRegister("password", {
                                required: "Поле является обязательным",
                                minLength: {
                                    value: 5,
                                    message: "Минимальное количество символов — 5"
                                }
                            })}
                            sx={{
                                marginBottom: 3
                            }}
                        />
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Балланс"
                            error={Boolean(editUserErrors.balance?.message)}
                            helperText={editUserErrors.balance?.message}
                            defaultValue={currentUser?.balance}
                            {...editUserRegister("balance", {
                                required: "Поле является обязательным",
                                pattern: {
                                    value: /^(([1-9]\d*)|0)\.\d\d$/,
                                    message: "Некорректный формат"
                                }
                            })}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "end",
                                marginTop: 3
                            }}
                        >
                            <Button variant="contained" disabled={!editUserIsValid} type="submit">
                                Изменить
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </Container>
    );
};
export { UserManagmentPage };
