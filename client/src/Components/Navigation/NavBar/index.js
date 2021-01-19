import React from 'react';
import classes from './styles.module.css';
import { useAuth } from '../../../context/auth';

export default function NavBar() {

    const { authTokens, setAuthTokens } = useAuth();

    function logOut() {
        setAuthTokens();
        localStorage.removeItem('tokens');
    }
    const loginLinkClasses = classes.link + ' ' + classes.loginLink;
    const loginLink = authTokens ? <a onClick={logOut} className={loginLinkClasses}> התנתק </a> : <a href="/login" className={loginLinkClasses}>התחבר </a>
    const gestue = authTokens ? <div className={classes.gesture}> {authTokens.name} שלום  </div> : null

    return (
        <header className={classes.root}>
            {/* <DrawerToggle /> */}
            <div className={classes.logo}>Dumplings By Stav Fadida </div>
            <div className={classes.links}>

                <a href="/ordersTable" className={classes.link}>הזמנות </a>
                <a href="/charts" className={classes.link}>מדדים </a>
                {loginLink}
                {gestue}
            </div>

        </header>
    )

}

// clicked={props.drawerToggleClicked}


