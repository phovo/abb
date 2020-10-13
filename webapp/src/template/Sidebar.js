import React, { Component } from "react";
import {PRODUCT_URL, HOME_URL} from "../RouterURL/RouterURL";
export default class Sidebar extends Component {

    render() {
        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                {/* Sidebar - Brand */}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink" />
                    </div>
                    <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
                </a>
                {/* Divider */}
                <hr className="sidebar-divider my-0" />
                {/* Nav Item - Dashboard */}
                <li className="nav-item active">
                    <a className="nav-link" href={HOME_URL[1]}>
                        <i className="fas fa-fw fa-tachometer-alt" />
                        <span>Dashboard</span></a>
                </li>
                <hr className="sidebar-divider" />
                {/* Nav Item - Pages Collapse Menu */}
                <li className="nav-item">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                        <i className="fas fa-fw fa-folder" />
                        <span>Pages</span>
                    </a>
                    <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">PRODUCT</h6>
                            <a className="collapse-item" href={PRODUCT_URL}>Create Product</a>
                            
                            <div className="collapse-divider" />
                            <h6 className="collapse-header">SKU</h6>
                            <a className="collapse-item" href="404.html">404 Page</a>
                            <a className="collapse-item" href="blank.html">Blank Page</a>
                        </div>
                    </div>
                </li>
                {/* Divider */}
                <hr className="sidebar-divider d-none d-md-block" />
                {/* Sidebar Toggler (Sidebar) */}
                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle" />
                </div>
            </ul>
        );
    }
}
