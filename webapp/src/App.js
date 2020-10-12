import React from 'react';
import './App.css';
import logo from './logo.svg';
import Atlantic from './routing/basics/Atlantic';
import Pacific from './routing/basics/Pacific';
import createStore from './redux/createStore'
import reducer from './redux/reducer'

import {
    BrowserRouter as Router,
    Route,
    Switch, NavLink
} from 'react-router-dom'

export function App() {
    const action = {type: "INCR", value: 5}
    const store = createStore(reducer);
    store.dispatch(action)
    console.log(store.getState())
    store.dispatch(action)
    console.log(store.getState())
    return (
        <Router>
            <div className="app">
                <div className="logo"><img src={logo} height="150px" alt="logo" /></div>
                <div className="ui text container">
                    <ul>
                        <li>
                            <NavLink activeClassName='active' to='/atlantic'>
                                <code>/atlantic</code>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='active' to='/pacific'>
                                <code>/pacific</code>
                            </NavLink>
                        </li>
                    </ul>
                    <hr />
                </div>
                <Switch>
                    <Route path='/atlantic' component={Atlantic} />
                    <Route path='/pacific' component={Pacific} />
                </Switch>
            </div >
        </Router>
    );
}
