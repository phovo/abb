import React, { Component } from 'react';
import UserApis from "../../api/UserApis/UserApis";
import  { Redirect } from 'react-router-dom'
import {HOME_URL} from "../../RouterURL/RouterURL";

class Logout extends Component {

    onClickLogout = () => {
        try {
            UserApis.logout();
            localStorage.removeItem("TOKEN");
            return <Redirect to='/login' />
        } catch(error) {
            console.log('failed ', error);
        }
    }

    render() {
        return (
            <div>
                <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a  onClick={this.onClickLogout}
                        className="btn btn-primary" 
                        href={HOME_URL[1]}>Logout</a>
                </div>
            </div>
        );
    }
}

export default Logout;