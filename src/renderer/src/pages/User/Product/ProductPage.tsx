import { FC } from "react";
import {
    Box,
    Button,
    Container,
    Paper,
    Typography
} from "@mui/material"
import { useParams, useNavigate } from "react-router-dom"

import styles from "./productPage.module.scss";
import { mockProducts } from "../Catalog/catalog.mock";

const ProductPage: FC = () => {

    const params = useParams();
    const product = mockProducts.find(({_id}) => _id == params?.id);
    const navigate = useNavigate();

    const goBackClickHandler = (): void => navigate(-1);

    return (
        <Container>
            <Paper sx={{
                marginTop: "80px"
            }}>
                <Button onClick={goBackClickHandler}>
                    Вернуться назад
                </Button>
                <Box className={styles.container}>
                    <Box className={`${styles.containerElement} ${styles.imageContainer}`}>
                        <img
                         src="./src/assets/images/stock1.jpg"
                         alt="Тут должно быть фото товара, но его нет:("
                         width={500}
                         height={500}
                         />
                    </Box>
                    <Box className={`${styles.containerElement} ${styles.info}`}>
                        <Typography variant="h5">
                            {product?.name}
                        </Typography>
                        <Typography variant="h5">
                            Описание 
                        </Typography>
                        <Typography>
                            {product?.description}
                        </Typography>
                        <Typography variant="h5">
                            Цена: {product?.price}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export { ProductPage }