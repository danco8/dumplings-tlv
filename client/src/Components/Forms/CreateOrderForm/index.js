import React, { useState } from 'react';
import classes from './styles.module.css';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import { Order_Properties } from '../../../config/config';

export default function CreateOrderForm(props) {

    const [order, setOrder] = useState({});

    const inputChangedHandler = (event, inputId) => {
        let tempOrder = { ...order };
        tempOrder[inputId] = event.target.value;
        setOrder(tempOrder);
    }

    const requiredFieldExist = (order) => {
        return (order.costumerName && order.quantity && order.type);
    }

    const createOrderHandler = () => {
        if (requiredFieldExist(order)) {
            props.createOrderHandler(order);
            setOrder({});
        }
        else {
            console.log('error at validation');
            props.createOrderFailHandler('לא מולאו כל הפרטים ליצירת הזמנה');
        }

    }
    let counter = 0;

    return (
        <div className={classes.root}>
            <div className={classes.header} > הכנס הזמנה חדשה </div>
            <table className={classes.table}>
                <thead>
                    <tr>
                        {
                            Order_Properties.map(property => {
                                return <td className={classes.cell} key={property.id + Date.now.toString()}> {property.label} </td>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {
                            Order_Properties.map(input => {
                                counter++;
                                return <td className={classes.cell} key={input.id + Date.now.toString()}>
                                    <Input
                                        dir="rtl"
                                        changed={(event) => inputChangedHandler(event, input.id)}
                                        inputType={input.id}
                                        value={order[input.id]}
                                        tabindex={counter}
                                        className={classes.input} /> </td>
                            })
                        }
                    </tr>
                </tbody>
            </table>

            <Button clicked={() => createOrderHandler()}>צור הזמנה</Button>
            <Button clicked={props.modalClosed}>בטל</Button>
        </div >
    );
}
