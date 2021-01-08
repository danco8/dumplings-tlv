import React from 'react';

import classes from './styles.module.css';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Input from '../UI/Input/index';
import { productTypeParse } from '../../util/Parser'


export default function OrdersTable(props) {

    const columns = [
        {
            id: 'costumerName',
            label: 'שם לקוח',
            minWidth: 170,
            align: 'right'
        },
        {
            id: 'status',
            label: 'סטטוס',
            minWidth: 170,
            align: 'right'
        },
        {
            id: 'quantity',
            label: 'כמות',
            minWidth: 170,
            align: 'right'
        },
        {
            id: 'type',
            label: 'סוג מוצר',
            minWidth: 170,
            align: 'right',
            format: (value) =>
                productTypeParse[value]
        },
        {
            id: '_id',
            label: 'מזהה הזמנה',
            minWidth: 100,
            align: 'right',
        }
    ];

    const [editModeRows, setEditModeRows] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const isOrderInEditMode = (_id) => {
        return editModeRows.includes(_id);
    }

    const handleOpenEditClick = (_id) => {
        let tempEditModeRows;
        if (!isOrderInEditMode(_id)) {
            tempEditModeRows = [...editModeRows, _id];
            setEditModeRows(tempEditModeRows);
        }
    }

    const handleDoneEditClick = (_id) => {
        // send request to update data of this order in DB
        // if value not valid = > pop a toaster and don't edit


        const updatedRow = props.rows.find(row => row._id === _id);
        props.updateRow(updatedRow);
        const tempEditModeRows = editModeRows.filter(row => row !== _id);
        setEditModeRows(tempEditModeRows);
    }

    const inputChangedHandler = (event, _id, column) => {
        let value = event.target.value;
        const columnId = column.id;

        const tempRows = [...props.rows];
        const newRows = tempRows.map(row => {
            if (row._id === _id) {
                row[columnId] = value;
            }
            return row;
        })

        props.serRows([...newRows]);

    }

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table" >
                    <TableHead>
                        <TableRow>
                            <TableCell id='editColumn' key='editColumn' className={classes.cell}> </TableCell>
                            {columns.map((column) => (
                                <TableCell
                                    key={column._id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    className={classes.cell}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover key={row.code}>
                                    <TableCell key={row._id + Date.now().toString()} >
                                        {isOrderInEditMode(row._id) ?
                                            <DoneOutlineIcon onClick={() => handleDoneEditClick(row._id)} />
                                            :
                                            <EditIcon onClick={() => handleOpenEditClick(row._id)} />
                                        }
                                    </TableCell>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        if (isOrderInEditMode(row._id) && column.id !== '_id') {
                                            return (
                                                <TableCell key={column.id} align={column.align} className={classes.cell}>
                                                    <Input
                                                        value={value}
                                                        changed={(event) => inputChangedHandler(event, row._id, column)}
                                                        inputType={column.id}
                                                        className={classes.input}
                                                    />
                                                </TableCell>
                                            )
                                        } else {
                                            return (
                                                <TableCell key={column.id} align="right" className={classes.cell}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        }
                                    }
                                    )}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={props.rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
