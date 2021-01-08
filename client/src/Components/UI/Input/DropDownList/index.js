import React from 'react';
import classes from './styles.module.css';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

export default function ListInput(props) {

    return (
        <FormControl variant="standard" className={classes.formControl}>
            <NativeSelect className={classes.input}
                onChange={props.changed}
                value={props.value}>
                {
                    props.options.map(option => {
                        return (<option value={option} className={classes.option} key={option + Date.now().toString()}>{option}</option>)
                    })
                }
                }
            </NativeSelect>
            {props.label ? <InputLabel>{props.label}</InputLabel> : null}
        </FormControl>
    )
}