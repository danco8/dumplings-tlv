import React from 'react';

import classes from './styles.module.css';
import Button from '../../UI/Button';
import { Order_Properties } from '../../../config/config'

export default function DeleteOrderForm(props) {

    return (

        <div className={classes.root}>
            <div className={classes.header} > ? האם אתה בטוח שברצונך למחוק את ההזמנה </div>
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
                                return <td className={classes.cell} key={input.id + Date.now.toString()}>
                                    <p
                                        dir="rtl"
                                        className={classes.input} >{props.order[input.id]}
                                    </p> </td>
                            })
                        }
                    </tr>
                </tbody>
            </table>

            <Button clicked={props.deleteOrderHandler}>מחק הזמנה</Button>
            <Button clicked={props.modalClosed}>בטל</Button>
        </div >
    );
}
