import React, { Component } from 'react';
import '../../App.css';
import logo from '../../logo.svg';
import TemplateMain from '../../template/TemplateMain';
import { Tech } from "../tech/Tech";
import { Type } from '../type/Type';

class Home extends Component {
    homeHTML = '';
    constructor(props) {
        super(props);
        // document.getElementById('body').id = 'page-top';
        this.homeHTML = <div>
            <h2 className="title">abbp</h2>
            <div className="logo"><img src={logo} height="150px" alt="logo" /></div>
            <div>
                This project is generated with
            <b> <a href="https://github.com/shpota/goxygen">goxygen</a> </b>.
            <p />The following list of technologies comes from
                a REST API call to the Go-based back end. Find
                and change the corresponding code in
                <code>webapp/src/tech/Tech.js</code>
                and <code>  server/web/app.go</code>.
                <Tech />
                <Type />
            </div>
        </div>
    }



    render() {
        return (
            <TemplateMain name={this.homeHTML} />
        );
    }
}

export default Home;