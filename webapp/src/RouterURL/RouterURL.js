import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Login from '../components/login/Login';
import Product from '../components/product/Product';
import Home from '../components/home/Home';

class RouterURL extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path='/login' component={Login}/>
                    <Route exact path='/' component={Home}/>
                    <Route path='/product' component={Product}/>
                </div>
            </Router>
        );
    }
}

export default RouterURL;