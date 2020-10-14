import React, { Component } from 'react';
import {Dropdown} from 'react-bootstrap';

import ChatList from './ChatList';
import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../_const/constant";

import Avatar1 from '../../../../../assets/images/user/avatar-1.jpg';
import {userService} from '../../../../../_service/user.service'

import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

class NavRight extends Component {
    state = {
        listOpen: false
    };
    handleLogout = () => {
        this.props.dispatch(userService.logout())
    }
    render() {
        const auth = localStorage.getItem('auth');
        return (
            <Aux>
                <ul className="navbar-nav ml-auto">
                    <li>
                        <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                <i className="icon feather icon-settings"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="profile-notification">
                                <div className="pro-head" onClick={this.handleLogout}>
                                    <img src={Avatar1} className="img-radius" alt="User Profile"/>
                                    <span>{auth}</span>
                                    <a className="dud-logout" title="Logout">
                                        <i className="feather icon-log-out"/>
                                    </a>
                                </div>
                                
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
                <ChatList listOpen={this.state.listOpen} closed={() => {this.setState({listOpen: false});}} />
            </Aux>
        );
    }
}

export default withRouter(connect(null, null)(NavRight));
