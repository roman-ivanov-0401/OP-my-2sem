import { Container, Typography } from "@mui/material";
import ManagmentTable from "../../../components/ManagmentTable/ManagmentTable"
import { FC } from "react";

const UserManagmentPage: FC = () => {
    return(
        <Container sx={{
            marginTop: "80px"
        }}>
            <Typography variant="h4">
                Страница управления учётными записями
            </Typography>
            <ManagmentTable/>
        </Container>
    );
}
export { UserManagmentPage };