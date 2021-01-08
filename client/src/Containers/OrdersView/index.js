import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import axios from 'axios';
import { Server_URL } from '../../config/config'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Table from '../../Components/OrdersTable/index';
import Modal from '../../Components/UI/Modal/index'
import CreateOrderForm from '../../Components/CreateOrderForm/index';
import Button from '../../Components/UI/Button/index';

export default function OrdersView() {

    const [orders, setOrders] = useState([]);
    const [creatingOrder, setCreatingOrder] = useState(false);
    const [error, setError] = useState('');
    const [orderCreated, setOrderCreated] = useState(false);

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

    const createOrderHandler = (order) => {
        axios.post(`${Server_URL}/order`, order)
            .then(res => {
                console.log(res);
                CloseCreateOrderModal();
                setOrderCreated(true);
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

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const handleCloseError = () => {
        setError('');
    }

    const handleCloseSuccess = () => {
        setOrderCreated(false);
    }

    return (
        <div className={styles.container}>
            <Modal show={creatingOrder} modalClosed={CloseCreateOrderModal}>
                <CreateOrderForm modalClosed={CloseCreateOrderModal} createOrderHandler={createOrderHandler} createOrderFailHandler={createOrderFailHandler} />
            </Modal>
            <Table rows={orders} serRows={(newRows) => setOrders(newRows)} updateRow={(order) => updateOrder(order)} />
            <Button className={styles.button} clicked={OpenCreateOrderModal}>הזמנה חדשה + </Button>
            {error ? <p>{error}</p> : null}

            {error !== '' ? <Snackbar open={true} autoHideDuration={6000} >
                <Alert onClose={handleCloseError} severity="error">
                    {error}
                </Alert>
            </Snackbar> : null}
            {orderCreated ? <Snackbar open={true} autoHideDuration={6000} >
                <Alert onClose={handleCloseSuccess} severity="success">
             ההזמנה נוספה בהצלחה
                </Alert>
            </Snackbar> : null}

        </div>
    )
}