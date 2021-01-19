import React from 'react';

import { productTypeParse } from '../../util/Parser'

import DataTable from './Table/index';

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
        <DataTable
            columns={columns}
            rows={props.rows}
            DoneEditClick={handleDoneEditClick}
            OpenEditClick={handleOpenEditClick}
            OpenEditClick={handleOpenEditClick}
            ChangePage={handleChangePage}
            ChangeRowsPerPage={handleChangeRowsPerPage}
            rowsPerPage={rowsPerPage}
            inputChanegd={inputChangedHandler}
            page={page}
            isOrderInEditMode={isOrderInEditMode}
        />
    );
}
