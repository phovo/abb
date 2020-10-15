import React, { Component } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { connect, FastField, Form as FormOfMik, Formik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import Aux from "../../hoc/_Aux";
import './Product.css'
import * as Yup from 'yup';
import { webComunication } from '../../_service/webcomunication.service';
import { PRODUCT_API } from '../../_const/apis';

class ProductEdit extends Component {
    constructor(props) {
        super(props);
        this.getProductById(this.props.match.params.id);
    }

    statusOption = [
        { value: true, label: 'Active' },
        { value: false, label: 'Inactive' },
    ];

    typesOption = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
    ];

    getProductById(id) {
        let dataProduct = null;
        webComunication.get(`${PRODUCT_API}/${id}`)
            .then((response) => {
                console.log(response);
                dataProduct = response.data.data;
                if (dataProduct !== null) {
                    this.setState({
                        id: dataProduct.id,
                        name: dataProduct.name,
                        status: dataProduct.status,
                        type: dataProduct.type,
                        effectiveDate: new Date(dataProduct.effectiveDate),
                        expiredDate: new Date(dataProduct.expiredDate),
                        file: dataProduct.file,
                        SKUs: dataProduct.SKUs
                    });                  
                    this.setValue();
                    console.log(this.state);
                }
            }).catch((err) => {
                console.log('error');
            })

    }

    defaultInputValueStatus = () => {
        return 'true'
    }

    onClickRemoveAttachments = () => {
        this.setState({
            file: ''
        });
        document.getElementById('showFileName').value = '';
    }

    setValue = () => {
        document.getElementById("inputName").value = this.state.name;
        document.getElementById("showFileName").value = this.state.file;
        document.getElementById("inputStatus").value = this.state.status;
        
    }

    state = {
        id: 0,
        name: '',
        status: '',
        effectiveDate: new Date(),
        expiredDate: new Date(),
        type: '',
        file: null
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
            this.showError(false, 'inputStatus');
        }
        this.setState({ status: obj.value });
        console.log(this.state);
        
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
        this.readURL(event.target, (e) => {
            this.setState({ file: e.target.result });
        });
    }

    readURL(input, onLoadCallback) {
        if (input.files[0] && input.files) {
            let reader = new FileReader();
            reader.onload = onLoadCallback;
            reader.readAsDataURL(input.files[0]);
        }
    }

    showError = (active, IdName) => {
        if (active) {
            document.getElementById(IdName).classList.add('is-invalid');
        } else {
            document.getElementById(IdName).classList.remove('is-invalid');
        }
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
        this.showError(false, 'inputName');
        this.showError(false, 'inputStatus');
        this.showError(false, 'inputType');
        this.showError(false, 'inputEffectiveDate');
        if (data.name !== '') {
            this.setState({name: data.name});
        }
        this.state.effectiveDate = this.state.effectiveDate.toISOString();
        this.state.expiredDate = this.state.expiredDate.toISOString();
        console.log(this.state);
        
        webComunication.put(`${PRODUCT_API}/${this.state.id}`, this.state)
            .then((response) => {
                console.log(response);
                window.location.href = "/productlist";
            }).catch((err) => {
                console.log('error');
            })
    }

    render() {
        return (
            <Aux>
                <Formik
                    initialValues={{
                        name: this.state.name,
                        status: this.state.status,
                        effectiveDate: this.state.effectiveDate,
                        expiredDate: this.state.expiredDate,
                        type: this.state.type,
                        file: this.state.file,
                    }}
                    validationSchema={this.validationSchema}
                    onSubmit={this.handleSubmit}
                >
                    <FormOfMik>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Header>
                                        <Card.Title as="h3">Update Product</Card.Title>
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
                                                        placeholder={this.state.name}
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
                                                        options={this.typesOption}
                                                        onChange={this.getValueType}
                                                        id='inputType'
                                                        name='type'
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
                                                <input value={this.state.file} type="text" className="form-control" id='showFileName' aria-label="Text input with segmented dropdown button" disabled={true} />
                                                <div className="input-group-append">
                                                    <button onClick={this.onClickRemoveAttachments} type="button" className="btn btn-outline-secondary form-control" style={{ backgroundColor: 'red', color: 'white' }}>X</button>
                                                </div>
                                            </div>
                                            <div className='form-group col-md-12 float-right'>
                                                <button className="form-control btn btn-primary btn-add-product col col-md-3" type='submit' onClick={this.onClickAddProduct} style={{ width: '100px' }}>Add</button>
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
//         product: state.product.productEdit
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         getProductById: (id) => dispatch(productAction.getProductById(id))
//     }
// }

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductEdit));
export default ProductEdit