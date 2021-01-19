import React from 'react';

import classes from './styles.module.css';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import Input from '../../UI/Input/index';

export default function DataTable(props) {
    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table" >
                    <TableHead>
                        <TableRow>
                            <TableCell id='editColumn' key='editColumn' className={classes.cell}> </TableCell>
                            {props.columns.map((column) => (
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
                        {props.rows.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage).map((row) => {
                            return (
                                <TableRow hover key={row.code}>
                                    <TableCell key={row._id + Date.now().toString()} >
                                        {props.isOrderInEditMode(row._id) ?
                                            <DoneOutlineIcon onClick={() => props.DoneEditClick(row._id)} />
                                            :
                                            <><DeleteIcon onClick={() => props.handleOpenDeleteModal(row)} className={classes.deleteIcon} /> <EditIcon onClick={() => props.OpenEditClick(row._id)} className={classes.editIcon} /> </>
                                        }
                                    </TableCell>
                                    {props.columns.map((column) => {
                                        const value = row[column.id];
                                        if (props.isOrderInEditMode(row._id) && column.id !== '_id') {
                                            return (
                                                <TableCell key={column.id} align={column.align} className={classes.cell}>
                                                    <Input
                                                        value={value}
                                                        changed={(event) => props.inputChanegd(event, row._id, column)}
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
                rowsPerPage={props.rowsPerPage}
                page={props.page}
                onChangePage={props.ChangePage}
                onChangeRowsPerPage={props.ChangeRowsPerPage}
            />
        </Paper>
    )
}
