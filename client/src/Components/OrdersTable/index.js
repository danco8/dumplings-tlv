import React, { useState } from 'react';

import { productTypeParse } from '../../util/Parser'

import DataTable from './Table/index';
import Modal from '../UI/Modal';
import DeleteOrderForm from '../Forms/DeleteOrderForm';

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

    const [editModeRows, setEditModeRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // const [deletingOrder, setDeletingOrder] = useState(null);

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

    const handleOpenEditOrder = (_id) => {
        let tempEditModeRows;
        if (!isOrderInEditMode(_id)) {
            tempEditModeRows = [...editModeRows, _id];
            setEditModeRows(tempEditModeRows);
        }
    }

    const handleDoneEditOrder = (_id) => {
        const updatedRow = props.rows.find(row => row._id === _id);
        props.updateRow(updatedRow);
        const tempEditModeRows = editModeRows.filter(row => row !== _id);
        setEditModeRows(tempEditModeRows);
    }

    // const OpenDeleteModal = (order) => {
    //     setDeletingOrder(order);
    // }

    // const CloseDeleteOrderModal = () => {
    //     setDeletingOrder(null);
    // }

    // const deleteOrderHandler = () => {
    //     props.deleteOrder(deletingOrder);
    //     CloseDeleteOrderModal();
    // }

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
        props.setRows([...newRows]);
    }


    return (
        <>
            {/* <Modal show={deletingOrder !== null} modalClosed={CloseDeleteOrderModal}>
                {deletingOrder ? <DeleteOrderForm order={deletingOrder} modalClosed={CloseDeleteOrderModal} deleteOrderHandler={deleteOrderHandler} /> : null}
            </Modal> */}
            <DataTable
                columns={columns}
                rows={props.rows}
                DoneEditClick={handleDoneEditOrder}
                OpenEditClick={handleOpenEditOrder}
                ChangePage={handleChangePage}
                ChangeRowsPerPage={handleChangeRowsPerPage}
                rowsPerPage={rowsPerPage}
                inputChanegd={inputChangedHandler}
                page={page}
                isOrderInEditMode={isOrderInEditMode}
                handleOpenDeleteModal={props.OpenDeleteModal}
            />
        </>
    );
}
