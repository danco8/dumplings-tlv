import React from 'react';

import classes from './styles.module.css';
import NavBar from '../../Components/Navigation/NavBar/index';
import CoverImage from '../../Components/CoverImage/index';

export default function Layout(props) {
    return (
        [
            <NavBar key='NavBar' />,
            <CoverImage key='CoverImage' />,
            <main className={classes.Content} key='main'>
                {props.children}
            </main>
        ]
    )
}
