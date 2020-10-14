import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Login from '../components/login/Login';
import Product from '../components/product/Product';
import Home from '../components/home/Home';

const LOGIN_URL = '/login';
const HOME_URL = ['/', '/home'];
const PRODUCT_URL = ['/create-product', '/product'];
const EDITSKU_URL = '/edit-sku';

export {LOGIN_URL, HOME_URL, PRODUCT_URL, EDITSKU_URL};

class RouterURL extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path={LOGIN_URL} component={Login}/>
                    <Route exact path={HOME_URL[0], HOME_URL[1]} component={Home}/>
                    <Route path={PRODUCT_URL[0], PRODUCT_URL[1]} component={Product}/>
                </div>
            </Router>
        );
    }
}

export default RouterURL;