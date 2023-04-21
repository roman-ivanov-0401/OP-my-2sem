import { Container, Typography } from "@mui/material";
import { FC } from "react"

const PledgePage: FC = () => {
    return(
       <Container sx={{
            marginTop: "50px"
       }}>
            <Typography variant="h1">
                Залог
            </Typography>
       </Container>
    );
}

export {PledgePage}