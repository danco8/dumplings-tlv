import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import classes from './styles.module.css';
import Button from '../../UI/Button';
import Input from '../../UI/Input/TextField/index';
import { useAuth } from '../../../context/auth';
import { Server_URL } from '../../../config/config';

function Login(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();
  const referer = '/ordersTable';
  // props.state.referer || '/';

  function postLogin() {
    axios.post(`${Server_URL}/auth/login`, {
      email,
      password
    }).then(result => {
      if (result.status === 200) {
        setAuthTokens(result.data);
        setLoggedIn(true);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }

  return (
    <div className={classes.container} >
      <div className={classes.form}>
        <Input
          type="email"
          dir="ltr"
          value={email}
          changed={e => {
            setEmail(e.target.value);
          }}
          placeholder="email"
        />
        <Input
          type="password"
          dir="ltr"
          value={password}
          changed={e => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
        <Button clicked={postLogin}>Sign In</Button>
      </div>
      <Link className={classes.link} to="/signup">Don't have an account?</Link>
      {isError && <div className={classes.error}>The email or password provided were incorrect!</div>}
    </div>
  );
}

export default Login;