import { Close, Delete, Edit } from "@mui/icons-material";
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
import { useAppDispatch, useAppSelector } from "@renderer/hooks/redux";
import { IProduct } from "@renderer/models/product";
import { catalogSlice } from "@renderer/store/sliсes/catalogSlice";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export type AddProductFields = {
    name: string;
    description: string;
    price: number;
    quantity: number;
};

const ProductManagmentPage: FC = () => {
    const products = useAppSelector((state) => state.catalogReducer.products);
    const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState<boolean>(false);
    const [isEditProductDialogOpen, setIsEditProductDialogOpen] = useState<boolean>(false);
    const [currentProduct, setCurrentProduct] = useState<IProduct | undefined>(undefined);

    const dispatch = useAppDispatch();

    const {
        register: addProductRegister,
        handleSubmit: addProductHandleSubmit,
        formState: { errors: addProductErrors, isValid: addProductIsValid }
    } = useForm<AddProductFields>({
        mode: "onChange"
    });

    const {
        register: editProductRegister,
        handleSubmit: editProductHandleSubmit,
        formState: { errors: editProductErrors, isValid: editProductIsValid }
    } = useForm<AddProductFields>({
        mode: "onChange"
    });

    const openAddProductDialogHandler = (): void => {
        setIsAddProductDialogOpen(true);
    };
    const closeAddProductDialogHandler = (): void => {
        setIsAddProductDialogOpen(false);
    };

    const openEditProductDialogHandler = (id: string): void => {
        setCurrentProduct(products.find(({ _id }) => id == _id))
        setIsEditProductDialogOpen(true);
    };
    const closeEditProductDialogHandler = (): void => {
        setIsEditProductDialogOpen(false);
    };

    const onAddProductSubmit: SubmitHandler<AddProductFields> = ({
        description,
        name,
        price,
        quantity
    }) => {
        dispatch(
            catalogSlice.actions.addProduct({
                _id: String(Math.random() * 1000),
                description,
                image: "",
                name,
                price,
                quantity
            })
        );
        setIsAddProductDialogOpen(false);
    };

    const onEditProductSubmit: SubmitHandler<AddProductFields> = ({
      description,
      name,
      price,
      quantity
  }) => {
    if(currentProduct){
      dispatch(catalogSlice.actions.editProduct({
        id: currentProduct?._id,
        newProduct: {
          _id: currentProduct?._id,
          description,
          image: "",
          name,
          price,
          quantity
        }
      }))
    }  
    setIsEditProductDialogOpen(false);
  };

    const deleteProductHandler = (_id: string): void => {
        dispatch(catalogSlice.actions.deleteProduct(_id));
    };

    return (
        <Container
            sx={{
                marginTop: "80px"
            }}
        >
            <Typography variant="h4" sx={{ marginBottom: "10px" }}>
                Страница управления товарами
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "end"
                }}
            >
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Номер</TableCell>
                                <TableCell>Название</TableCell>
                                <TableCell>Цена</TableCell>
                                <TableCell>Количество</TableCell>
                                <TableCell>Действия</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map(({ _id, name, price, quantity }, index) => (
                                <TableRow key={_id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>{quantity}</TableCell>
                                    <TableCell>{price}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={(): void => openEditProductDialogHandler(_id)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={(): void => deleteProductHandler(_id)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "end",
                    marginTop: 3,
                    marginBottom: 10
                }}
            >
                <Button
                    variant={"contained"}
                    sx={{ marginTop: "10px" }}
                    onClick={openAddProductDialogHandler}
                >
                    Добавить товар
                </Button>
            </Box>
            <Dialog open={isAddProductDialogOpen}>
                <IconButton
                    sx={{ position: "absolute", top: 15, right: 15 }}
                    onClick={closeAddProductDialogHandler}
                >
                    <Close />
                </IconButton>
                <DialogTitle>
                    <Typography variant="h4">Добавление товара</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>Введите данные товара</DialogContentText>
                    <Box component={"form"}>
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Название"
                            error={Boolean(addProductErrors.name?.message)}
                            helperText={addProductErrors.name?.message}
                            {...addProductRegister("name", {
                                required: "Поле является обязательным"
                            })}
                            sx={{
                                marginTop: 3,
                                marginBottom: 3
                            }}
                        />
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Описание"
                            error={Boolean(addProductErrors.description?.message)}
                            helperText={addProductErrors.description?.message}
                            {...addProductRegister("description", {
                                required: "Поле является обязательным"
                            })}
                            sx={{
                                marginBottom: 3
                            }}
                        />
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Цена"
                            error={Boolean(addProductErrors.price?.message)}
                            helperText={addProductErrors.price?.message}
                            {...addProductRegister("price", {
                                required: "Поле является обязательным",
                                pattern: {
                                    value: /^(([1-9]\d*)|0)\.\d\d$/,
                                    message: "Некорректный формат данных"
                                }
                            })}
                            sx={{
                                marginBottom: 3
                            }}
                        />
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Количество"
                            error={Boolean(addProductErrors.quantity?.message)}
                            helperText={addProductErrors.quantity?.message}
                            {...addProductRegister("quantity", {
                                required: "Поле является обязательным",
                                pattern: {
                                    value: /^[1-9]\d*$/,
                                    message: "Некорректный формат данных"
                                }
                            })}
                            sx={{
                                marginBottom: 3
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "end"
                        }}
                    >
                        <Button
                            disabled={!addProductIsValid}
                            variant="contained"
                            type="submit"
                            onClick={addProductHandleSubmit(onAddProductSubmit)}
                        >
                            Добавить
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
            <Dialog open={isEditProductDialogOpen}>
                <IconButton
                    sx={{ position: "absolute", top: 15, right: 15 }}
                    onClick={closeEditProductDialogHandler}
                >
                    <Close />
                </IconButton>
                <DialogTitle>
                    <Typography variant="h4">Изменение товара</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>Введите данные товара</DialogContentText>
                    <Box component={"form"}>
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Название"
                            error={Boolean(editProductErrors.name?.message)}
                            helperText={editProductErrors.name?.message}
                            defaultValue={currentProduct?.name}
                            {...editProductRegister("name", {
                                required: "Поле является обязательным"
                            })}
                            sx={{
                                marginTop: 3,
                                marginBottom: 3
                            }}
                        />
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Описание"
                            error={Boolean(editProductErrors.description?.message)}
                            helperText={editProductErrors.description?.message}
                            defaultValue={currentProduct?.description}
                            {...editProductRegister("description", {
                                required: "Поле является обязательным"
                            })}
                            sx={{
                                marginBottom: 3
                            }}
                        />
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Цена"
                            error={Boolean(editProductErrors.price?.message)}
                            helperText={editProductErrors.price?.message}
                            defaultValue={currentProduct?.price}
                            {...editProductRegister("price", {
                                required: "Поле является обязательным",
                                pattern: {
                                    value: /^(([1-9]\d*)|0)\.\d\d$/,
                                    message: "Некорректный формат данных"
                                }
                            })}
                            sx={{
                                marginBottom: 3
                            }}
                        />
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Количество"
                            error={Boolean(editProductErrors.quantity?.message)}
                            defaultValue={currentProduct?.quantity}
                            helperText={editProductErrors.quantity?.message}
                            {...editProductRegister("quantity", {
                                required: "Поле является обязательным",
                                pattern: {
                                    value: /^[1-9]\d*$/,
                                    message: "Некорректный формат данных"
                                }
                            })}
                            sx={{
                                marginBottom: 3
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "end"
                        }}
                    >
                        <Button
                            variant="contained"
                            type="submit"
                            onClick={editProductHandleSubmit(onEditProductSubmit)}
                            disabled={!editProductIsValid}
                        >
                            Изменить
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </Container>
    );
};
export { ProductManagmentPage };
