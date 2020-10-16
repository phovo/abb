import React from 'react';
import { Row, Col, Card, Form, Table, Button } from 'react-bootstrap';
import { FastField, Form as FormOfMik, Formik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import * as Yup from 'yup';
import Select from 'react-select';
import Aux from "../../hoc/_Aux";
import './Product.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { productAction } from '../../_actions/product.action'
import { history } from '../../_helpers/history';
import { webComunication } from '../../_service/webcomunication.service';
import { PRODUCT_API, SKU_API } from '../../_const/apis';

class ProductList extends React.Component {

    statusOption = [];
    typesOption = [];
    state = {};
    objSKU = {};

    constructor(props) {
        super(props);
        this.statusOption = [
            { value: true, label: 'Active' },
            { value: false, label: 'Inactive' },
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
            attachments: null,
            SKUs: []
        };

        this.objSKU = {
            id: 0,
            name: '',
            status: 'false',
            description: ''
        };
        // this.getSKUs();
        console.log(localStorage.getItem('token'));
    }

    getSKUs = () => {
        var id = window.location.href.split("?");
        // log
        console.log(id);
        if (id[1] !== undefined || id !== '') {
            webComunication.get(`${SKU_API}/${id[1]}`)
            .then((response) => {
                console.log(response);
                this.state.SKUs.push(response.data.data)
            }).catch((err) => {
                console.log('error');
            })
        } else {

        }
        // console.log(id[2]);
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
        console.log(obj.value);
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
        this.readURL(event.target, (e) => {
            this.setState({ attachments: e.target.result });
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

    shouldComponentUpdate(nextState, nextProps) {
        if (!this.props.product.isError && nextState.product.isError) {
            toast.error(nextState.product.messageError);
        } else if (!this.props.product.isSuccess && nextState.product.isSuccess) {
            toast.info(nextState.product.messageSuccess);
        }
        return true;
    }

    flag = false;
    onClickAddProduct = () => {
        this.flag = true;
        this.forceUpdate();
        // if (this.state.status === 'true') {
        //     this.setState({status: true});
        // } else {
        //     this.setState({status: false});
        // }
    }

    onClickCancelProduct = () => {
        this.setState({
            SKUs: []
        });
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

    onChangeInputSKU = (event) => {
        if (event.target.name === 'name') {
            this.objSKU.name = event.target.value;
            this.showError(false, 'SKUName');
        } else if (event.target.name === 'status') {
            let parse = false;
            if (event.target.value === 'true') {
                parse = true
            }
            this.objSKU.status = parse;
        } else if (event.target.name === 'description') {
            this.objSKU.description = event.target.value;
            this.showError(false, 'SKUDescription');
        }
    }

    editSKU = null;

    onClickEditSKU = (id) => {
        console.log(id);
        this.state.SKUs.map((val, index) => {
            if (id == val.id) {
                this.editSKU = val;
            }
        })
        this.forceUpdate();
    }

    onClickAddSKU = () => {
        if (this.objSKU !== null && this.objSKU.name !== '' && this.objSKU.description !== '') {
            this.objSKU.id++;
            this.state.SKUs.push(this.objSKU);
            this.resetInputSKU();
            this.objSKU = {
                id: this.objSKU.id,
                name: '',
                status: '0',
                description: ''
            }
            console.log(this.state);
            this.forceUpdate();
        } else {
            this.showError(true, 'SKUName');
            this.showError(true, 'SKUDescription');
        }
    }

    resetInputSKU = () => {
        document.getElementById('SKUName').value = '';
        document.getElementById('SKUDescription').value = '';
        document.getElementById('SKUStatus').selectedIndex = 'false';
    }

    onClickSaveProduct = () => {
        // call api

        // window.location.reload(false);
    }

    onClickRemoveAttachments = () => {
        this.setState({
            attachments: null
        });
        document.getElementById('showFileName').value = '';
    }

    onClickRemoveSKU = (id) => {
        console.log(id);
        this.state.SKUs.map((val, index) => {
            if (id == val.id) {
                this.state.SKUs.splice(index, index + 1);
            }
        });
        this.forceUpdate();
    }

    handleSubmit = (data) => {
        if (data.name !== '' && this.state.status !== '' && this.state.effectiveDate !== null && this.state.type !== '') {
            this.showError(false, 'inputName');
            this.showError(false, 'inputStatus');
            this.showError(false, 'inputType');
            this.showError(false, 'inputEffectiveDate');

            this.setState({
                name: data.name,
                attachments: "data:application//pdf;base64,JVBERi0xLjQKMSAwIG9iag"
            });

            this.state.effectiveDate = this.state.effectiveDate.toISOString();
            this.state.expiredDate = this.state.expiredDate.toISOString();
            // console.log(e.toISOString());
            console.log(this.state);
            this.state.SKUs.map(value => {
                if (value.status === 'true') {
                    this.state.status = true;
                } else {
                    this.state.status = false;
                }
            })
            const product = this.state;
            // this.flag = false;
            const response = this.props.createProduct(product);
            this.setState({
                effectiveDate: new Date(),
                expiredDate: new Date()
            });
            console.log(response);
            // window.location.href = "/productlist";
        } else {
            console.log('form invalid');
        }
    }
    
    render() {
        if (this.editSKU !== null) {
            return <Redirect to='/productlist' />
        } 
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
                                                
                                                <button type='submit' onClick={this.onClickSaveProduct} className='btn btn-success float-right' style={{width: '100px'}}>Save</button>
                                                <button type='button' onClick={this.onClickCancelProduct} className='btn btn-warning float-right' style={{width: '100px'}}>Cancel</button>
                                            </div>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        {/* <SKUList /> */}
                        {/* <Row>
                            <Col>
                                <Card>
                                    <Card.Header>
                                        <Row>
                                            <Col md='9' xs='9'> <Card.Title as="h3">SKU List</Card.Title></Col>

                                        </Row>
                                    </Card.Header>
                                    {/* <Card.Body>
                                        <Table responsive>
                                            <thead>
                                                <tr>
                                                    <th>#</th>  
                                                    <th>Name</th>
                                                    <th>Status</th>
                                                    <th>Description</th>
                                                    <th>action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr key='0'>
                                                    <th scope="row">0</th>
                                                    <td>
                                                        <input
                                                            id='SKUName'
                                                            name="name"
                                                            type='text'
                                                            className="form-control"
                                                            placeholder='SKU Name'
                                                            onChange={this.onChangeInputSKU}
                                                        />
                                                    </td>
                                                    <td>
                                                        <select
                                                            options={this.statusOption}
                                                            onChange={this.onChangeInputSKU}
                                                            id='SKUStatus'
                                                            name="status"
                                                            className="form-control">
                                                            <option value='true'>Active</option>
                                                            <option value='false' selected>Inactive</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <input
                                                            onChange={this.onChangeInputSKU}
                                                            id='SKUDescription'
                                                            name="description"
                                                            type='text'
                                                            className="form-control"
                                                            placeholder='SKU Description' />
                                                    </td>
                                                    <td style={{ width: '155px' }}>
                                                        <button type='button' onClick={this.onClickAddSKU} className='btn btn-primary' style={{ marginRight: '10px', width: '55px' }}><i className="fa fa-plus"></i></button>
                                                    </td>
                                                </tr>
                                                {this.state.SKUs.map((item) => {
                                                    let status = '';
                                                    if (item.status) {
                                                        status = 'true';
                                                    } else {
                                                        status = 'false';
                                                    }
                                                    return (<tr key={item.id}>
                                                        <th scope="row">{item.id}</th>
                                                        <td>{item.name}</td>
                                                        <td>{status}</td>
                                                        <td>{item.description}</td>
                                                        <td style={{ width: '155px' }}>
                                                            <button className='btn btn-success' style={{ marginRight: '10px', width: '55px' }} type='button'
                                                            onClick={(val) => this.onClickEditSKU(item.id)}
                                                            ><i className="fa fa-edit"
                                                            ></i></button>
                                                            <button className='btn btn-danger' style={{ width: '55px' }} onClick={(val)=>this.onClickRemoveSKU(item.id)} type='button'>
                                                                <i className="fa fa-trash">
                                                            
                                                                </i>
                                                            </button>
                                                        </td>
                                                    </tr>)
                                                })}
                                            </tbody>
                                        </Table>
                                    </Card.Body> */}
                                {/* </Card>
                            </Col>
                        </Row> */} 
                   
                    </FormOfMik>
                </Formik>
            </Aux>
        );
    }
    
}

const mapStateToProps = state => {
    console.log(state);
    return {
        layout: state.reducer.layout,
        isOpen: state.reducer.isOpen,
        isTrigger: state.reducer.isTrigger,
        product: state.product
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createProduct: (product) => dispatch(productAction.createProduct(product)),
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductList));
