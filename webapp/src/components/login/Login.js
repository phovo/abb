import React, { Component } from "react";
import './Login.css';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { required } from '../../validation/fucValidation'

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    getValueForm = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.form.validateAll();
        if ( this.checkBtn.context._errors.length === 0 ) {
            // compare result after call api here.
            const resultApi = false;
            if (resultApi) {
                
            } else {
                document.getElementById("us_pass_invalid").style.display = 'block';
            }
        }
    }

    render() {
        return (
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3>Sign In</h3>
                            
                            <div className="d-flex justify-content-end social_icon">
                                <span><i className="fab fa-facebook-square"></i></span>
                                <span><i className="fab fa-google-plus-square"></i></span>
                                <span><i className="fab fa-twitter-square"></i></span>
                            </div>
                        </div>
                        <p id="us_pass_invalid"> Username or password invalid </p>
                        <div className="card-body">
                            <Form onSubmit={e => this.onSubmit(e)} ref={c => { this.form = c }}>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <Input
                                        name="username"
                                        type="text"
                                        className="form-control"
                                        placeholder="username"

                                        value={this.state.username}
                                        onChange={this.getValueForm}
                                        validations={[required]}
                                    />

                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <Input
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        placeholder="password"

                                        value={this.state.password}
                                        onChange={this.getValueForm}
                                        validations={[required]}
                                    />
                                </div>
                                <div className="row align-items-center remember">
                                    <input type="checkbox" />Remember Me
                                    </div>
                                <div className="form-group">
                                    
                                    <input type="submit"
                                        value="Login"
                                        className="btn float-right login_btn" />
                                </div>
                                <CheckButton style={{ display: 'none' }} ref={c => { this.checkBtn = c }} />
                            </Form>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Don't have an account?<a href="#">Sign Up</a>
                            </div>
                            <div className="d-flex justify-content-center">
                                <a href="#">Forgot your password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
