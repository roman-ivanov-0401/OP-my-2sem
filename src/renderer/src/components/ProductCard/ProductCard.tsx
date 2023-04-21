import { FC, useState } from "react";
import { ProductCartProps } from "./productCard.types";
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography
} from "@mui/material";
import {
    Add,
    Remove
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { cartSlice } from "../../store/sliсes/cartSlice"

const ProductCard: FC<ProductCartProps> = ({ product }) => {
    const navigation = useNavigate();
    const cart = useAppSelector(state => state.cartReducer.cart);
    const cartProduct = cart.products.filter(({ product: { _id } }) => _id == product._id);
    const isBought = Boolean(cartProduct.length);
    const dispatch = useAppDispatch();
    
    const onClickHandler = (): void => {
        navigation(`product/${product._id}`)
    }

    const addToCartHandler = (): void => {
        dispatch(cartSlice.actions.addProduct(
            {
                quantity: 1,
                product
            }
        ));
        //setIsBought(prev => !prev);
    }

    const removeFromCartHandler = (): void => {
        dispatch(cartSlice.actions.deleteProduct(product._id));
    }

    const incrementHandle = (): void => {
        dispatch(cartSlice.actions.incrementQuantity(product._id))
    }

    const decrementHandle = (): void => {
        if(cartProduct[0].quantity > 1) dispatch(cartSlice.actions.decrementQuantity(product._id))
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={onClickHandler}>
                <CardMedia
                    component="img"
                    height="140"
                    image="./src/assets/images/stock1.jpg"
                    
                    alt=""
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.description}
                    </Typography>
                    <Typography>
                        Цена: {product.price}₽
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button 
                size="small" 
                color={
                    isBought ? 
                    "warning" : 
                    "primary"
                }
                variant="contained"
                onClick={
                    isBought ? 
                    removeFromCartHandler :
                    addToCartHandler
                }
                >
                    {
                        isBought ?
                        "Удалить из корзины" :
                        "Добавить в корзину"
                    }
                </Button>
                {
                    isBought && 
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "5px"
                        }}
                    >
                        <Button
                            onClick={decrementHandle}
                            disabled={cartProduct[0].quantity === 1}
                        >
                            <Remove/>
                        </Button>
                        <Typography>
                            {
                            cartProduct[0].quantity
                        }
                        </Typography>
                        <Button
                            onClick={incrementHandle}
                        >
                            <Add/>
                        </Button>
                    </Box>
                }
            </CardActions>
        </Card>
    );
};

export { ProductCard };
