import React, { useMemo } from 'react';

import classes from './styles.module.css';
import Backdrop from '../Backdrop/index';

export default function Modal(props) {

    const modal = useMemo(() => <div
        className={classes.Modal}
        style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
        }}>
        {props.children}
    </div>, [props.show, props.children]);
    return (
        <>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            {modal}
        </>
    )
}
