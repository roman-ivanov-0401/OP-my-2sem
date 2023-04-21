import { FC, useState, ChangeEvent} from "react";
import { ProductCard } from "../../../components/ProductCard";
import { Box, Container, OutlinedInput, Pagination, Typography } from "@mui/material";
import { useAppSelector } from "../../../hooks/redux"

import styles from "./catalog.module.scss"
 
const CatalogPage: FC = () => {
    const numberOfProductsOnPage = 6;
    const [paginationNumber, setPaginationNumber] = useState<number>(1);
    const [searchPattern, setSearchPattern] = useState<string>("");

    const handlePaginationChange = (event: ChangeEvent<unknown>, value: number): void => {
        setPaginationNumber(value);
    };

    let cart = useAppSelector(state => state.catalogReducer.products);

    const searchHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchPattern(event.target.value);
    }

    cart = cart.filter(({name, description}) => name.includes(searchPattern) || description.includes(searchPattern));

    return (
        <Container sx={{
            marginTop: "50px"
        }}>
        <Typography
        variant="h1"
        >Каталог</Typography>
        <Box 
        component="form"
        >
            <OutlinedInput
                id="catalog-search"
                name="catalog-search"
                value={searchPattern}
                onChange={searchHandler}
                placeholder="Поиск..."
                fullWidth
            />
        </Box>
        <Container
            className={styles.catalogList}
            sx={{
                display: "grid"
            }}
        >
           {
                cart.slice((paginationNumber - 1) * numberOfProductsOnPage,
                    (paginationNumber - 1) * numberOfProductsOnPage + 6).map(
                    product => 
                    <ProductCard product={product} key={product._id}/>
                )
           }
        </Container>
        {
            
        }
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "50px"
            }}
        >
            <Pagination 
            count={Math.ceil(cart.length / numberOfProductsOnPage)}
            variant="outlined"
            color="primary"
            onChange={handlePaginationChange}
            />
        </Box>
        
        </Container>
    );
};

export { CatalogPage };
