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
import { IPledge } from "@renderer/models/pledge";
import { IProduct } from "@renderer/models/product";
import { catalogSlice } from "@renderer/store/sliсes/catalogSlice";
import { pledgeSlice } from "@renderer/store/sliсes/pledgeSlice";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export type EditPledgeFields = {
  dateIn: Date
  dataOut: Date
};

const PledgeManagmentPage: FC = () => {
    const pledges = useAppSelector((state) => state.pledgeReducer.pledges);
    const users = useAppSelector(state => state.authReducer.users);
    const [isEditProductDialogOpen, setIsEditProductDialogOpen] = useState<boolean>(false);
    const [currentPledge, setCurrentPledge] = useState<IPledge | undefined>(undefined);

    const dispatch = useAppDispatch();


    const {
        register: editPledgeRegister,
        handleSubmit: editPledgeHandleSubmit,
        formState: { errors: editPledgeErrors, isValid: editPledgeIsValid }
    } = useForm<EditPledgeFields>({
        mode: "onChange"
    });

    const openEditPledgeDialogHandler = (id: string): void => {
      setCurrentPledge(ple)
      setIsEditProductDialogOpen(true);
    };
    const closeEditPledgeDialogHandler = (): void => {
      setIsEditProductDialogOpen(false);
    };

    const onEditPledgeSubmit: SubmitHandler<EditPledgeFields> = ({
      dataOut,
      dateIn
  }) => {
    if(currentPledge){
      dispatch(pledgeSlice.actions.editPledge({
        _id: currentPledge._id,
        dataOut: dataOut.toString(),
        dateIn: dateIn.toString()
      }))
    }  
    setIsEditProductDialogOpen(false);
  };

    return (
        <Container
            sx={{
                marginTop: "80px"
            }}
        >
            <Typography variant="h4" sx={{ marginBottom: "10px" }}>
                Страница управления залогами
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
                                <TableCell>Логин пользователя</TableCell>
                                <TableCell>Дата сдачи</TableCell>
                                <TableCell>Дата возврата</TableCell>
                                <TableCell>Действия</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pledges.map(({ _id, dataOut, dateIn }, index) => (
                                <TableRow key={_id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{users.find(u => u.pledge == _id)?.login}</TableCell>
                                    <TableCell>{dateIn}</TableCell>
                                    <TableCell>{dataOut}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={(): void => openEditPledgeDialogHandler(_id)}>
                                            <Edit />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Dialog open={isEditProductDialogOpen}>
                <IconButton
                    sx={{ position: "absolute", top: 15, right: 15 }}
                    onClick={closeEditPledgeDialogHandler}
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
                            {...editPledgeRegister("dateIn", {
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
                            {...editPledgeRegister("description", {
                                required: "Поле является обязательным"
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
export { PledgeManagmentPage };
