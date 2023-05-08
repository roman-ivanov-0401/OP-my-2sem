import {
    Container,
    TableBody,
    TableHead,
    Typography,
    Table,
    TableRow,
    TableCell,
    Paper,
    IconButton,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContentText,
    DialogContent,
    TextField
} from "@mui/material";
import { FC, useState } from "react";
import { Close, Delete, Edit } from "@mui/icons-material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { AddPledgeFields } from "./pledgePage.types";
import Textarea from "@mui/joy/Textarea";
import { pledgeSlice } from "../../../store/sliсes/pledgeSlice";
import { IPledgedProduct } from "@renderer/models/pledgedProduct";

const PledgePage: FC = () => {
    const user = useAppSelector(state => state.authReducer.user);
    const products = useAppSelector((state) => state.pledgeReducer.pledges.find(({ _id }) => _id == user.pledge)?.products);

    const [currentProduct, setCurrentProduct] = useState<IPledgedProduct | undefined>(undefined);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const dialogCloseHandle = (): void => setIsDialogOpen(false);
    const dialogOpenHandle = (): void => setIsDialogOpen(true);

    const editDialogCloseHandle = (): void => setIsEditDialogOpen(false);
    const editDialogOpenHandle = (_id: string): void => {
        setCurrentProduct(products?.find((pr) => pr._id == _id));
        setIsEditDialogOpen(true);
    };

    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<AddPledgeFields>({
        mode: "onChange"
    });

    const {
        register: editRegister,
        handleSubmit: editHandleSubmit,
        formState: { errors: editErrors }
    } = useForm<AddPledgeFields>({
        mode: "onChange"
    });

    const onSubmit: SubmitHandler<AddPledgeFields> = ({ name, price, quantity, description }) => {
        dispatch(pledgeSlice.actions.addProductToPledge({
            idOfPledge: user.pledge,
            product: {
                _id: String(Math.random() * 1000),
                description,
                image: "",
                name,
                price,
                quantity
            }
        }))
        setIsDialogOpen(false);
    };

    const onEditSubmit: SubmitHandler<AddPledgeFields> = ({
        name,
        description,
        price,
        quantity
    }) => {
        if (currentProduct) {
            const newCurrentProduct: IPledgedProduct = {
                quantity,
                _id: currentProduct._id,
                description,
                image: currentProduct.image,
                name,
                price
            };
            dispatch(pledgeSlice.actions.editProductInPledge({
                idOfPledge: user.pledge,
                idOfProduct: newCurrentProduct._id,
                product: newCurrentProduct
            }))
        }
        setIsEditDialogOpen(false)
    };

    return (
        <Container
            sx={{
                marginTop: "50px"
            }}
        >
            <Typography variant="h1">Залог</Typography>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>№</TableCell>
                            <TableCell>Название</TableCell>
                            <TableCell>Количество</TableCell>
                            <TableCell>Цена</TableCell>
                            <TableCell>Общая цена</TableCell>
                            <TableCell>Фото</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products?.map(({ name, price, _id, quantity }, index) => (
                            <TableRow key="">
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{name}</TableCell>
                                <TableCell>{quantity}</TableCell>
                                <TableCell>{price}₽</TableCell>
                                <TableCell>{Math.round(quantity * price * 100) / 100}₽</TableCell>
                                <TableCell>
                                    <img src="./src/assets/images/ck.webp" width={40} height={40} />
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={(): void => editDialogOpenHandle(_id)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <Box display="flex" justifyContent="end" marginTop="15px">
                <Button variant="contained" onClick={dialogOpenHandle}>
                    Добавить товар в залог
                </Button>
            </Box>

            <Dialog open={isDialogOpen} fullWidth>
                <IconButton
                    sx={{ position: "absolute", top: 15, right: 15 }}
                    onClick={dialogCloseHandle}
                >
                    <Close />
                </IconButton>
                <DialogTitle>
                    <Typography variant="h4">Новый товар</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>Введите данные нового товара</DialogContentText>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Название"
                            sx={{
                                marginBottom: 3,
                                marginTop: 3
                            }}
                            {...register("name", { required: "Поле является обязательным" })}
                            error={Boolean(errors.name?.message)}
                            helperText={errors.name?.message}
                        />
                        <Textarea
                            placeholder="Описание"
                            {...register("description", {
                                required: "Поле является обязательным"
                            })}
                            error={Boolean(errors.description?.message)}
                        />
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Цена"
                            placeholder="Рубли.копейки"
                            sx={{
                                marginBottom: 3
                            }}
                            {...register("price", {
                                required: {
                                    value: true,
                                    message: "Поле является обязательным"
                                },
                                pattern: {
                                    value: /\d+\.\d\d$/gm,
                                    message: "Некорректрое значение"
                                }
                            })}
                            error={Boolean(errors.price?.message)}
                            helperText={errors.price?.message}
                        />
                        <TextField
                            type="number"
                            InputProps={{
                                inputProps: {
                                    min: 1
                                }
                            }}
                            label="Количество"
                            sx={{
                                marginBottom: 3
                            }}
                            {...register("quantity", {
                                minLength: {
                                    value: 1,
                                    message: "Минимальное количество - 1"
                                },
                                required: {
                                    value: true,
                                    message: "Поле является обязательным"
                                }
                            })}
                            error={Boolean(errors.quantity?.message)}
                            helperText={errors.quantity?.message}
                        />
                        <Button type="submit" variant="contained" fullWidth>
                            Добавить
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
            <Dialog open={isEditDialogOpen} fullWidth>
                <IconButton
                    sx={{ position: "absolute", top: 15, right: 15 }}
                    onClick={editDialogCloseHandle}
                >
                    <Close />
                </IconButton>
                <DialogTitle>
                    <Typography variant="h4">Редактировать товар</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>Введите данные товара</DialogContentText>
                    <Box component="form" onSubmit={editHandleSubmit(onEditSubmit)}>
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Название"
                            sx={{
                                marginBottom: 3,
                                marginTop: 3
                            }}
                            {...editRegister("name", { required: "Поле является обязательным" })}
                            error={Boolean(editErrors.name?.message)}
                            helperText={editErrors.name?.message}
                            defaultValue={currentProduct?.name}
                        />
                        <Textarea
                            placeholder="Описание"
                            {...editRegister("description", {
                                required: "Поле является обязательным"
                            })}
                            error={Boolean(editErrors.description?.message)}
                            defaultValue={currentProduct?.description}
                        />
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Цена"
                            placeholder="Рубли.копейки"
                            sx={{
                                marginBottom: 3
                            }}
                            {...editRegister("price", {
                                required: {
                                    value: true,
                                    message: "Поле является обязательным"
                                },
                                pattern: {
                                    value: /\d+\.\d\d$/gm,
                                    message: "Некорректрое значение"
                                }
                            })}
                            error={Boolean(editErrors.price?.message)}
                            helperText={editErrors.price?.message}
                            defaultValue={currentProduct?.price}
                        />
                        <TextField
                            type="number"
                            InputProps={{
                                inputProps: {
                                    min: 1
                                }
                            }}
                            label="Количество"
                            sx={{
                                marginBottom: 3
                            }}
                            {...editRegister("quantity", {
                                minLength: {
                                    value: 1,
                                    message: "Минимальное количество - 1"
                                },
                                required: {
                                    value: true,
                                    message: "Поле является обязательным"
                                }
                            })}
                            error={Boolean(editErrors.quantity?.message)}
                            helperText={editErrors.quantity?.message}
                            defaultValue={currentProduct?.quantity}
                        />
                        <Button type="submit" variant="contained" fullWidth>
                            Изменить
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export { PledgePage };
