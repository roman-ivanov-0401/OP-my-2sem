import { Container, Typography } from "@mui/material";
import { FC } from "react";

const PredgeManagmentPage: FC = () => {
    return(
        <Container sx={{
            marginTop: "50px"
        }}>
            <Typography>
                Панель управления товарами
            </Typography>
        </Container>
    );
}

export { PredgeManagmentPage };