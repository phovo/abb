import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

class TemplateMain extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-wrapper">
                <Sidebar />
                <div className="page-container">
                    <Topbar />
                    <div className="main-content">
                        {this.props.name}
                    </div>
                </div>
                {/* <!-- Jquery JS--> */}
                <script src="./vendor/jquery-3.2.1.min.js"></script>
                {/* <!-- Vendor JS --> */}
                <script src="./vendor/animsition/animsition.min.js"></script>
                <script src="./vendor/counter-up/jquery.waypoints.min.js"></script>
                {/* <!-- Main JS--> */}
                <script src="./js/main.js"></script>
            </div>
        );
    }
}

export default TemplateMain;