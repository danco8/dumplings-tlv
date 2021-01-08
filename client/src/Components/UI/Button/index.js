import React from 'react';
import classes from './styles.module.css'

export default function Button(props) {
    return (
        <button onClick={props.clicked} className={classes.button}> {props.children} </button>
    )
}
