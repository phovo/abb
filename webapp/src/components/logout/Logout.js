import React, { Component } from 'react';

class Logout extends Component {

    onClickLogout = () => {

    }

    render() {
        return (
            <div>
                <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a  onClick={this.onClickLogout}
                        className="btn btn-primary" 
                        href="login">Logout</a>
                </div>
            </div>
        );
    }
}

export default Logout;