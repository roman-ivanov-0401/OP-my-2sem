import { FC } from "react"
import {Box, Button, Container, Typography} from "@mui/material";
import {ManagmentTable} from "../../../components/ManagmentTable/ManagmentTable";

const headers = ["Название", "Описание", "Цена"]
const mockRows = [
  ["Название 1", "Описание 1", "300"],
  ["Название 2", "Описание 2", "300"],
  ["Название 3", "Описание 3", "300"],

]
export const PledgeByIdManagment: FC = () => {
    return(
      <Container sx={{
        marginTop: "50px"
      }}>
        <Typography variant={"h4"} marginBottom={"10px"}>
          Панель управления товарами в залоге
        </Typography>
        <ManagmentTable header={headers} rows={mockRows}/>
        <Box sx={{
          display: "flex",
          justifyContent: "end"
        }}>
          <Button variant={"contained"} sx={{ marginTop: "10px" }}>
            Добавить товар
          </Button>
        </Box>
      </Container>
    );
}
