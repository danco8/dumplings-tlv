import React from 'react';
import classes from './styles.module.css';

export default function ListInput(props) {

    return (

        <div class="select">
            <select id="standard-select" className={classes.select}>
                {
                    props.options.map(option => {
                        return (<option value={option} className={classes.option} key={option + Date.now().toString()}>{option}</option>)
                    })
                }
            </select>
        </div>
    )
}
