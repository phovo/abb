import React from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import { FastField, Form as FormOfMik, Formik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import * as Yup from 'yup';
import Select from 'react-select';
import moment from 'moment';
import Aux from "../../hoc/_Aux";
import './Product.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {productAction} from '../../_actions/product.action'
import SKUList from '../sku/SKUList';
class ProductList extends React.Component {

    statusOption = [];
    typesOption = [];
    state = {};

    constructor(props) {
        super(props);
        this.statusOption = [
            { value: '1', label: 'Active' },
            { value: '2', label: 'Inactive' },
        ];

        this.typesOption = [
            { value: '1', label: '1' },
            { value: '2', label: '2' },
        ];

        this.state = {
            name: '',
            status: '',
            effectiveDate: new Date(),
            expiredDate: new Date(),
            type: '',
            attachments: null
        };
    }
    getValueExpiredDate = (e) => {
        this.setState({ expiredDate: e })
    }

    getValueEffectiveDate = (e) => {
        if (e === null) {
            this.showError(true, 'inputEffectiveDate');
        }
        this.setState({ effectiveDate: e })
    }

    getValueStatus = (obj) => {
        if (obj.value !== undefined) {
            this.showError(false, 'inputStatus')
        }
        this.setState({ status: obj.value })
    }

    getValueType = (obj) => {
        if (obj.value !== undefined) {
            this.showError(false, 'inputType')
        }
        this.setState({ type: obj.value })
    }

    getValueFile = (event) => {
        const objectFile = event.target.files[0];
        document.getElementById('showFileName').value = objectFile.name;
        this.setState({ attachments: objectFile });
    }

    fileUpload() {
        const formData = new FormData();
        formData.append('file', this.state.attachments, this.state.attachments.name);
        return formData;
    }

    showError = (active, IdName) => {
        if (active) {
            document.getElementById(IdName).classList.add('is-invalid');
        } else {
            document.getElementById(IdName).classList.remove('is-invalid');
        }
    }

    shouldComponentUpdate(nextState, nextProps) {
        if(!this.props.product.isError && nextState.product.isError) {
            toast.error(nextState.product.messageError);
        } else if(!this.props.product.isSuccess && nextState.product.isSuccess) {
            toast.info(nextState.product.messageSuccess);
        }
        return true;
    }

    validationSchema = Yup.object().shape({
        name: Yup.string().required(() => {
            this.showError(true, 'inputName');
        }),
        status: Yup.string().required(() => {
            this.showError(true, 'inputStatus');
        }),
        type: Yup.string().required(() => {
            this.showError(true, 'inputType');
        }),
        effectiveDate: Yup.string().required(() => {
            this.showError(true, 'inputEffectiveDate');
        }),
    })

    handleSubmit = (data) => {
        console.log(data);
        if (data.name !== '' && this.state.status !== '' && this.state.effectiveDate !== null && this.state.type !== '') {
            this.showError(false, 'inputName');
            this.showError(false, 'inputStatus');
            this.showError(false, 'inputType');
            this.showError(false, 'inputEffectiveDate');

            this.setState({
                name: data.name,
                attachments: null
            });

            const product = this.state;
            const response = this.props.createProduct(product);
                   
        } else {
            console.log('form invalid');
        }
    }

    render() {
        return (
            <Aux>
                  <Formik
                                    initialValues={{
                                        name: '',
                                        status: '',
                                        effectiveDate: new Date(),
                                        expiredDate: new Date(),
                                        type: '',
                                        attachments: null
                                    }}
                                    validationSchema={this.validationSchema}
                                    onSubmit={this.handleSubmit}
                                >
                                    <FormOfMik>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h3">Create new Product</Card.Title>
                            </Card.Header>
                            <Card.Body>
                              
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Name(*)</Form.Label>
                                                    <FastField
                                                        name="name"
                                                        type='text'
                                                        className="form-control"
                                                        id="inputName"
                                                    />
                                                    <Form.Text className="text-muted">
                                                        We'll never share your email with anyone else.
                                                </Form.Text>
                                                </Form.Group>

                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Status(*)</Form.Label>
                                                    <Select
                                                        options={this.statusOption}
                                                        onChange={this.getValueStatus}
                                                        name='status'
                                                        id='inputStatus'
                                                        className="form-control-md" />
                                                </Form.Group>

                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>



                                                <Form.Group controlId="formBasicPassword">
                                                    <Form.Label>Effective date(*)</Form.Label>
                                                    <DatePicker
                                                        selected={this.state.effectiveDate}
                                                        onChange={this.getValueEffectiveDate}
                                                        type="text"
                                                        className="form-control datepicker"
                                                        id="inputEffectiveDate"
                                                        name="effectiveDate"
                                                        dateFormat="MMMM d, yyyy h:mm aa"
                                                        showTimeSelect
                                                    />
                                                </Form.Group>


                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="formBasicPassword">
                                                    <Form.Label>Expired date</Form.Label>
                                                    <DatePicker
                                                        selected={this.state.expiredDate}
                                                        onChange={date => this.getValueExpiredDate(date)}
                                                        type="text"
                                                        className="form-control datepicker"
                                                        id="inputExpiredDate"
                                                        name="expiredDate"
                                                        dateFormat="MMMM d, yyyy h:mm aa"
                                                        showTimeSelect
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>


                                        <Row>

                                            <Col md={6}>
                                                <Form.Group controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Type(*)</Form.Label>
                                                    <Select
                                                        id='inputType'
                                                        name='type'
                                                        options={this.typesOption}
                                                        onChange={this.getValueType}
                                                        className="form-control-md" />
                                                </Form.Group>

                                            </Col>

                                            {/* <Col md={6}>

                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Attachments</Form.Label>
                                                    <Form.Control
                                                        name="name"
                                                        type='file'
                                                        className="form-control"
                                                        id="customFile"
                                                    />
                                                    <Form.Text className="text-muted">
                                                        We'll never share your email with anyone else.
                                                    </Form.Text>
                                                </Form.Group>

                                            </Col> */}

                                            <Col md={2}>

                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Attachments</Form.Label>
                                                    <div className="custom-file">
                                                        <input type="file" onChange={this.getValueFile} className="custom-file-input form-control" id="customFile" />
                                                        <label className="custom-file-label form-control" htmlFor="customFile">File</label>
                                                    </div>
                                                </Form.Group>

                                            </Col>
                                            {/* <Col md={4} className={'rounded input-group block-fileName'}>

                                                <Form.Group controlId="formBasicEmail">
                                                    <input type="text" className="form-control" id='showFileName' aria-label="Text input with segmented dropdown button" disabled={true} />
                                                    <div className="input-group-append">
                                                        <button type="button" className="btn btn-outline-secondary form-control" style={{ backgroundColor: 'red', color: 'white' }}>X</button>
                                                    </div>
                                                </Form.Group>

                                            </Col> */}
                                            <div className="form-group col-lg-4 col-md-4 rounded input-group block-fileName">
                                                {/* <label className='fileName form-control'>File Name</label> */}
                                                <input type="text" className="form-control" id='showFileName' aria-label="Text input with segmented dropdown button" disabled={true} />
                                                <div className="input-group-append">
                                                    <button type="button" className="btn btn-outline-secondary form-control" style={{ backgroundColor: 'red', color: 'white' }}>X</button>
                                                </div>
                                            </div>

                                        </Row>


                                    
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <SKUList /> 
                <Row>
                    <Col>
                        <Card>  
                            <Card.Body>
                            <div className="float-right"><button type="submit" className="btn btn-success btn-save">Save</button>
                            <button type="button" className="btn btn-primary btn-cancel" style={{width: '100px'}}>Cancel</button></div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>  
                </FormOfMik>
                                </Formik>
            </Aux>
        );
    }
}

const mapStateToProps = state => {

    return {
        layout: state.reducer.layout,
        isOpen: state.reducer.isOpen,
        isTrigger: state.reducer.isTrigger,
        product: state.product
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createProduct:(product) => dispatch(productAction.createProduct(product)),
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductList));
