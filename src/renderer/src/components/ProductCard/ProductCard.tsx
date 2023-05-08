import { FC } from "react";
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
import { Add, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { cartSlice } from "../../store/sliсes/cartSlice";

const ProductCard: FC<ProductCartProps> = ({ product }) => {
    const navigation = useNavigate();
    const user = useAppSelector(state => state.authReducer.user);
    const productInCart = useAppSelector(state => state.cartReducer.carts.find(({ _id }) => _id == user.basket)?.products.find(({ _id }) => _id == product._id))
    const isBought = Boolean(productInCart)
    let canIncrement = false
    if(productInCart){
        canIncrement = productInCart?.quantity < product.quantity
    }
    const dispatch = useAppDispatch();

    const onClickHandler = (): void => {
        navigation(`product/${product._id}`);
    };

    const addToCartHandler = (): void => {
        dispatch(cartSlice.actions.addProductToCart({
            cartId: user.basket,
            product: {
                _id: product._id,
                description: product.description,
                image: product.image,
                name: product.name,
                price: product.price,
                quantity: 1
            }
        }))
    };

    const removeFromCartHandler = (): void => {
        dispatch(cartSlice.actions.deleteProductInCart({
            cartId: user.basket,
            productId: product._id
        }))
    };

    const incrementHandle = (): void => {
        dispatch(cartSlice.actions.incrementQuantity({
            cartId: user.basket,
            productId: product._id
        }))
    };

    const decrementHandle = (): void => {
        dispatch(cartSlice.actions.decrementQuantity({
            cartId: user.basket,
            productId: product._id
        }))
    };

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
                    <Typography>Цена: {product.price}₽</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    size="small"
                    color={isBought ? "warning" : "primary"}
                    variant="contained"
                    onClick={isBought ? removeFromCartHandler : addToCartHandler}
                >
                    {isBought ? "Удалить из корзины" : "Добавить в корзину"}
                </Button>
                {isBought && (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "5px"
                        }}
                    >
                        <Button onClick={decrementHandle} disabled={productInCart?.quantity === 1}>
                            <Remove />
                        </Button>
                        <Typography>{productInCart?.quantity}</Typography>
                        <Button onClick={incrementHandle} disabled={!canIncrement}>
                            <Add />
                        </Button>
                    </Box>
                )}
            </CardActions>
        </Card>
    );
};

export { ProductCard };
