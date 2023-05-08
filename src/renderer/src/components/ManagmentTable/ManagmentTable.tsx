import { Table, TableContainer, Paper, TableHead, TableCell, TableRow, TableBody, IconButton } from "@mui/material"
import { FC } from "react"
import { ManagmentTableProps } from "./managmentTable.interafce"
import { Delete, Edit } from "@mui/icons-material"

export const ManagmentTable: FC<ManagmentTableProps> = ({ header, rows }) => {
  return (
    <TableContainer component={Paper}> 
      <Table>
        <TableHead>
          <TableRow>
          {
            header.map(title => <TableCell key={title}>{title}</TableCell>)
          }
          <TableCell>
            Действия
          </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            rows.map((values, index) => 
                <TableRow key={index}>
                  {
                    values.map((value, index) => <TableCell key={index}>{value}</TableCell>)
                  }
                  <TableCell>
                    <IconButton>
                      <Edit/>
                    </IconButton>
                    <IconButton>
                      <Delete/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}