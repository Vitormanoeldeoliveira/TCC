import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { GET_USERS_SUPPORT } from '../../../requires/api.require';
import { useQuery } from '@apollo/client';
import moment from 'moment/moment';
import { Box, TablePagination } from '@mui/material';
import { object } from 'yup';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#75a79c",
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const User = ({ filter }) => {
    console.log(filter);

    const { data, refetch } = useQuery(GET_USERS_SUPPORT, {
        variables: {
            filters: { ...filter }
        }
    })

    return (
        <>
            <TableContainer component={Paper} sx={{ maxHeight: "70vh" }} >
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell> Id </StyledTableCell>
                            <StyledTableCell> Nome </StyledTableCell>
                            <StyledTableCell> Criado em </StyledTableCell>
                            <StyledTableCell> Ativo </StyledTableCell>
                            <StyledTableCell> Ações </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.getAllUsers?.length < 0 ? (
                            <>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell>
                                    <Box sx={{ ml: "auto", width: "100%", textAlign: "center", py: 2}} >
                                        Sem dados
                                    </Box>
                                </StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </>
                        ) : (
                            <>
                                {data?.getAllUsers?.map((row) => (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.id}
                                        </StyledTableCell>
                                        <StyledTableCell> {row.nome} </StyledTableCell>
                                        <StyledTableCell> {moment(row.created_at).format("DD/MM/YYYY")} </StyledTableCell>
                                        <StyledTableCell>
                                            {
                                                row.excluido ?
                                                    <BlockIcon sx={{ color: "red" }} /> :
                                                    <CheckCircleOutlineIcon sx={{ color: "lightgreen" }} />
                                            }
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <BorderColorIcon />
                                            <DeleteForeverIcon />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
} 