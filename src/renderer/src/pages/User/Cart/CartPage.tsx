import { FC } from "react"
import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import {
    Add,
    Remove
} from "@mui/icons-material"
import { Delete } from "@mui/icons-material"
import { useAppSelector, useAppDispatch } from "../../../hooks/redux"
import { cartSlice } from "../../../store/sliсes/cartSlice"
import { headers } from "../../../config/cartTable.config";
import { ICartTableRow } from "./cartPage.types";
import { ProdictId } from "@renderer/models/product";

const CartPage: FC = () => {
    const user = useAppSelector(state => state.authReducer.user)
    const cart = useAppSelector(state => state.cartReducer.carts.find(({ _id }) => _id == user.basket)?.products);
    const dispatch = useAppDispatch();
    const rows: ICartTableRow[] = [];
    let totalPrice = 0;
    cart?.forEach(({ name, price, _id, quantity }) => {
        rows.push({
            name,
            price,
            quantity,
            _id
        });
        totalPrice += price * quantity
    })

    const removeFromCartHandler = (_id: ProdictId): void => {
        dispatch(cartSlice.actions.deleteProductInCart({
            cartId: user.basket,
            productId: _id
        }))
    }

    const incrementHandle = (_id: ProdictId): void => {
        dispatch(cartSlice.actions.incrementQuantity({
            cartId: user.basket,
            productId: _id
        }))
    }

    const decrementHandle = (_id: ProdictId): void => {
        dispatch(cartSlice.actions.decrementQuantity({
            cartId: user.basket,
            productId: _id
        }))
    }

    return(
       <Container sx={{
        marginTop: "50px"
       }}>
            <Typography variant="h1">
                Корзина
            </Typography>
            <TableContainer component={Paper} sx={{marginTop: "50px"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                headers.map(title => 
                                        <TableCell key={title} align="center">
                                            { title }
                                        </TableCell>
                                    )
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.map(({name, price, quantity, _id}, index) =>
                                <TableRow key={name}>
                                    <TableCell align="center">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">
                                        { name }
                                    </TableCell>
                                    <TableCell align="center">
                                        { price }
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            disabled={quantity === 1}
                                            onClick={
                                                (): void => {quantity > 1 && decrementHandle(_id)}
                                            }
                                        >
                                            <Remove/>
                                        </Button>
                                        { quantity }
                                        <Button
                                            onClick={
                                                (): void => {quantity > 0 && incrementHandle(_id)}
                                            }
                                        >
                                            <Add/>
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        { price * quantity }
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button 
                                        variant="text"
                                        onClick={
                                            (): void => {removeFromCartHandler(_id)}
                                        }
                                        >
                                            <Delete/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "space-between"
            }}>
                <Typography variant="h4">
                        Итого: {totalPrice}₽
                </Typography>
                <Button variant="contained">
                    Оформить заказ
                </Button>
            </Box>
       </Container>
    );
}

export { CartPage };