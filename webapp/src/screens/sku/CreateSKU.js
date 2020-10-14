import React, { Component } from 'react'
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import { FastField, Form as FormOfMik, Formik, yupToFormErrors } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import * as Yup from 'yup';
import Select from 'react-select';
import moment from 'moment';
import Aux from "../../hoc/_Aux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { sku } from '../../_reducers/sku.reducer';
import { skuAction } from '../../_actions/sku.action';

class CreateSKU extends Component {

    //state Create SKU
    state = {
        name: '',
        status: true,
        description: ''
    }

    ///validation
    validationSchema = Yup.object().shape({
        // name : yup.string().required('name is required'),
        // status : yup.string().required('status is required')
    })
    //Handle event onChange
    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({
            [name]: value
        }, () => console.log('=======', this.state));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const sku= this.state
        this.props.createSKU(sku)
        // console.log(this.props.actionCreateSKU(sku))
    }
    render() {
        return (
            <Aux>
                <Formik
                    initialValues={{
                        name: '',
                        status: '',
                        description: ''
                    }}
                    validationSchema={this.validationSchema}
                    // onSubmit={this.handleSubmit}
                >
                <FormOfMik onSubmit={this.handleSubmit}>

                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h3">Create New SKU</Card.Title>
                            </Card.Header>
                            <Card.Body>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Name(*)</Form.Label>
                                            <input
                                                name="name"
                                                type='text'
                                                className="form-control"
                                                id="inputName"
                                                onChange={this.handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Status(*)</Form.Label>
                                            <FormControl onChange={this.handleChange} as="select" custom
                                                name='status'
                                                id='inputStatus'
                                                className="form-control-md">
                                                <option value="1" selected="true">Active</option>
                                                <option value="0">Inactive</option>
                                            </FormControl>
                                        </Form.Group>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={8}>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Description</Form.Label>
                                            <FormControl as="textarea" onChange={this.handleChange}
                                                type="text"
                                                className="form-control datepicker"
                                                id="inputEffectiveDate"
                                                name="description"
                                                dateFormat="MMMM d, yyyy h:mm aa"
                                                showTimeSelect
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Card>
                                            <Card.Body>
                                                <div className="float-right"><button type="submit" className="btn btn-success btn-save" onSubmit={this.handleSubmit}>Save</button>
                                                    <button type="button" className="btn btn-danger btn-cancel" style={{ width: '100px' }}>Cancel</button></div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                </FormOfMik>
                </Formik>
            </Aux>
        )
    }
}
const mapStateToProps = state => {
    return {
        layout: state.reducer.layout,
        isOpen: state.reducer.isOpen,
        isTrigger: state.reducer.isTrigger,
        sku: state.sku
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createSKU: (sku) => dispatch(skuAction.createSKU(sku)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateSKU)