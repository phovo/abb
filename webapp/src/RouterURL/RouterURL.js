import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../components/login/Login';
import Product from '../components/product/Product';
import Home from '../components/home/Home';
import {PrivateRoute} from "jwt-auth-react";
import PageNotFound from '../components/404/PageNotFound';

const LOGIN_URL = '/login';
const HOME_URL = ['/', '/home'];
const PRODUCT_URL = '/product';

class RouterURL extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path={LOGIN_URL} component={Login} />
                        <PrivateRoute path={[HOME_URL[0], HOME_URL[1]]} component={Home} loginPath={LOGIN_URL} exact/>
                        <Route path={PRODUCT_URL} component={Product} />
                        <Route path="*" component={PageNotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default RouterURL;