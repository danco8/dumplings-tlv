import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import axios from 'axios';
import { Server_URL } from '../../config/config'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import OrdersTable from '../../Components/OrdersTable/index';
import Modal from '../../Components/UI/Modal/index'
import CreateOrderForm from '../../Components/Forms/CreateOrderForm/index';
import Button from '../../Components/UI/Button/index';
import DeleteOrderForm from '../../Components/Forms/DeleteOrderForm';

export default function OrdersView() {

    const [orders, setOrders] = useState([]);
    const [creatingOrder, setCreatingOrder] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [deletingOrder, setDeletingOrder] = useState(null);

    const fetchOrders = () => {
        axios.get(`${Server_URL}/orders`).then(result => {
            setOrders(result.data.orders);
        })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchOrders();
    }, []);


    const updateOrder = (order) => {
        axios.put(`${Server_URL}/order/${order._id}`, order)
            .then(result => {
            }).catch(err => {
                console.log(err);
            });
    }

    const createOrder = (order) => {
        axios.post(`${Server_URL}/order`, order)
            .then(res => {
                console.log(res);
                CloseCreateOrderModal();
                setSuccessMessage('הזמנה נוצרה בהצלחה');
                fetchOrders();
            })
            .catch(err => {
                console.log(err);
            });

        //make validation on inputs = > if true send post request
    }

    const createOrderFailHandler = (message) => {
        console.log('message', message)
        setError(message);
    }

    const OpenCreateOrderModal = () => {
        setCreatingOrder(true);
    }

    const CloseCreateOrderModal = () => {
        setCreatingOrder(false);
    }

    const deleteOrderHandler = () => {
        if (deletingOrder._id) {
            axios.delete(`${Server_URL}/order/${deletingOrder._id}`)
                .then(result => {
                    fetchOrders();
                    setSuccessMessage('ההזמנה נמחקה בהצלחה');
                }).catch(err => {
                    console.log(err);
                });
        }
        CloseDeleteOrderModal();
    }

    const OpenDeleteModal = (order) => {
        setDeletingOrder(order);
    }

    const CloseDeleteOrderModal = () => {
        setDeletingOrder(null);
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const handleCloseError = () => {
        setError('');
    }

    const handleCloseSuccess = () => {
        setSuccessMessage(null);
    }

    return (
        <div className={styles.container}>
            <Modal show={creatingOrder} modalClosed={CloseCreateOrderModal}>
                <CreateOrderForm modalClosed={CloseCreateOrderModal} createOrderHandler={createOrder} createOrderFailHandler={createOrderFailHandler} />
            </Modal>
            <Modal show={deletingOrder !== null} modalClosed={CloseDeleteOrderModal}>
                {deletingOrder ? <DeleteOrderForm order={deletingOrder} modalClosed={CloseDeleteOrderModal} deleteOrderHandler={deleteOrderHandler} /> : null}
            </Modal>
            <OrdersTable rows={orders} setRows={(newRows) => setOrders(newRows)} updateRow={(order) => updateOrder(order)} deleteOrder={deleteOrderHandler} OpenDeleteModal={(order) => OpenDeleteModal(order)} />
            <Button className={styles.button} clicked={OpenCreateOrderModal} >הזמנה חדשה + </Button>
            {error ? <p>{error}</p> : null}

            {error !== '' ? <Snackbar open={true} autoHideDuration={10} >
                <Alert onClose={handleCloseError} severity="error">
                    {error}
                </Alert>
            </Snackbar> : null}
            {successMessage !== null ? <Snackbar open={true} >
                <Alert onClose={handleCloseSuccess} severity="success">
                    {successMessage}
                </Alert>
            </Snackbar> : null}

        </div>
    )
}