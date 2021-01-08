import React, { useState } from 'react';

import Layout from './hoc/Layout/index';
import OrdersView from './Containers/OrdersView/index';
import ChartsView from './Containers/ChartsView/index';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { AuthContext } from './context/auth';
import Login from './Components/Auth/Login/index';
import SignUp from './Components/Auth/SignUp/index';
import AdmineRoute from './Components/Navigation/AdminRoute/index';


export default function App() {

  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <Layout>
          <Switch>
            <AdmineRoute path="/charts" component={ChartsView} />
            <AdmineRoute path="/ordersTable" component={OrdersView} />
            <Route path="/login" render={() => (<Login />)}></Route>
            <Route path="/signup" component={SignUp} />
            <Route path="/" render={() => (<Login />)}></Route>
          </Switch>
        </Layout>
      </Router>
    </AuthContext.Provider>
  )

}