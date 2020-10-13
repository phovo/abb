import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../components/login/Login';
import Product from '../components/product/Product';
import Home from '../components/home/Home';
import PageNotFound from '../components/404/PageNotFound';
import { PrivateRoute } from './PrivateRoute';

const LOGIN_URL = '/login';
const HOME_URL = ['/', '/home'];
const PRODUCT_URL = '/create-product';

export {LOGIN_URL, HOME_URL, PRODUCT_URL};

class RouterURL extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path={LOGIN_URL} component={Login} />
                        <PrivateRoute path={[HOME_URL[0], HOME_URL[1]]} component={Home} loginPath={LOGIN_URL} exact/>
                        <PrivateRoute path={PRODUCT_URL} component={Product} />
                        <Route path="*" component={PageNotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default RouterURL;