import React from 'react';

import styles from './styles.module.css';
import ListInput from './DropDownList/index';
import TextInput from './TextField/index';

export default function Input(props) {

    let options;
    if (props.inputType === 'status') {
        options = [
            'הוזמן',
            'בהכנה',
            'נשלח'
        ]
    }
    if (options) {
        return <ListInput options={options} changed={props.changed} value={props.value} inputType={props.inputType} label={props.label} />
    }
    else if (props.value) {
        return (<TextInput inputType={props.inputType} changed={props.changed} value={props.value} label={props.label} />)
    } else {
        return (<TextInput inputType={props.inputType} changed={props.changed} label={props.label} />)
    }
}
