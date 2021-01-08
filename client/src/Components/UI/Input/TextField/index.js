import React from 'react';
import classes from './styles.module.css'

export default function TextInput(props) {
    let input;
    if (props.value) {
        input = <input type="text" onChange={props.changed} dir={props.dir || "rtl"} value={props.value} className={classes.input} />;
    } else {
        if (props.placeholder) {
            input = <input type="text" onChange={props.changed} dir={props.dir || "rtl"} placeholder={props.placeholder} className={classes.input} />;
        }
        else {
            input = <input type="text" onChange={props.changed} dir={props.dir || "rtl"} value={' '} className={classes.input} />;
        }
    }
    return (
        <div className={classes.inputContainer}>
            {input}
            <span className={classes.focusBorder}>{props.label || ' '}</span>
            <i className={classes.i}></i>
        </div>

    )
}
