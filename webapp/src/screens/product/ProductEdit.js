import React, { Component } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { connect, FastField, Form as FormOfMik, Formik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import Aux from "../../hoc/_Aux";
import './Product.css'
import { productAction } from '../../_actions/product.action';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';

class ProductEdit extends Component {
    constructor(props) {
        // window.location.reload();
        super(props);
        console.log("123123123");
        // let id = this.props.location.state.key;
        // console.log(id);
        // this.getProduct(id)
    }

    getProduct(id) {
        this.props.getProduct(id);
    }

    // shouldComponentUpdate(nextState, nextProps) {
    //     if (!this.props.product.isError && nextState.product.isError) {
    //         toast.error(nextState.product.messageError);
    //     } else if (!this.props.product.isSuccess && nextState.product.isSuccess) {
    //         toast.info(nextState.product.messageSuccess);
    //     }
    //     return true;
    // }
    
    state = {
        id: 0,
        name: '',
        status: '',
        effectiveDate: new Date(),
        expiredDate: new Date(),
        type: '',
        attachments: null
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
                                                        placeholder='Product name'
                                                    />
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

                                            <Col md={2}>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Attachments</Form.Label>
                                                    <div className="custom-file">
                                                        <input type="file" onChange={this.getValueFile} className="custom-file-input form-control" id="customFile" />
                                                        <label className="custom-file-label form-control" htmlFor="customFile">File</label>
                                                    </div>
                                                </Form.Group>
                                            </Col>

                                            <div className="form-group col-lg-4 col-md-4 rounded input-group block-fileName">
                                                <input type="text" className="form-control" id='showFileName' aria-label="Text input with segmented dropdown button" disabled={true} />
                                                <div className="input-group-append">
                                                    <button onClick={this.onClickRemoveAttachments} type="button" className="btn btn-outline-secondary form-control" style={{ backgroundColor: 'red', color: 'white' }}>X</button>
                                                </div>
                                            </div>
                                            <div className='form-group col-md-12 float-right'>
                                                <button className="form-control btn btn-primary btn-add-product col col-md-3" type='button' onClick={this.onClickAddProduct} style={{width: '100px'}}>Add</button>
                                                {/* <span className='' style={{ marginLeft: '150px', color: 'green', display: 'none', width: '100px' }} id='notify-add-product'>Add product success</span>
                                                <span className='' style={{ marginLeft: '150px', color: 'red', display: 'none' }} id='notify-error-add'>Add product error</span> */}
                                            </div>
                                        </Row>
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

// const mapStateToProps = state => {
//     return {
//         layout: state.reducer.layout,
//         isOpen: state.reducer.isOpen,
//         isTrigger: state.reducer.isTrigger,
//         product: state.product.product
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         getProduct: (id) => dispatch(productAction.getProductById(id))
//     }
// }

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductEdit));
export default ProductEdit