
import React from "react";
import classes from './styles.mdule.css';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button/index';
import Input from '../../UI/Input/TextField/index';

function Signup() {
  return (
    <div className={classes.card}>
      <div className={classes.form}>
        <Input type="email" placeholder="email" />
        <Input type="password" placeholder="password" />
        <Input type="password" placeholder="password again" />
        <Button>Sign Up</Button>
      </div>
      <Link to="/login">Already have an account?</Link>
    </div>
  );
}

export default Signup;