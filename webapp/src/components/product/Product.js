import React, { Component } from "react";
import TemplateMain from "../../template/TemplateMain";
import DatePicker from 'react-datepicker';
import './Product.css';
import "react-datepicker/dist/react-datepicker.css";
import { FastField, Form, Formik } from "formik";
import * as Yup from 'yup';
import Select from 'react-select';
import moment from 'moment';
import ProductApis from "../../api/ProductApis/ProductApis";
import SKUApis from "../../api/SKUApis/SKUApis";
export default class Product extends Component {

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

    // PART CREATE PRODUCT
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
        console.log(moment());
        if (data.name !== '' && this.state.status !== '' && this.state.effectiveDate !== null && this.state.type !== '') {
            this.showError(false, 'inputName');
            this.showError(false, 'inputStatus');
            this.showError(false, 'inputType');
            this.showError(false, 'inputEffectiveDate');

            this.setState({ 
                name: data.name, 
                attachments: null });
            
            // call api create product
            const createProduct = async () => {
                try {
                    const product = this.state;
                    const response = ProductApis.createProduct(product);
                    if (response !== null) {
                        alert("Success");
                    }
                } catch (error) {
                    console.log('Failed ', error);
                    alert('Failed');
                }
            }
            createProduct();
        } else {
            console.log('form invalid');
        }
    }
    // END OF PART CREATE PRODUCT

    // PART EDIT SKU
    onClickEditSKU = (id) => {
        const getSKUById = async() => {
            try {
                const response = SKUApis.getSKUById(id);
                if (response !== null) {

                }
            } catch (error) {
                console.log('failed');
            }
        }
        getSKUById();
    }
    // END OF PART EDIT SKU


    render() {
        return (
            <TemplateMain name={
                <div>
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
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h1 className="m-0 font-weight-bold text-primary" id='title'>Create Product</h1>
                            </div>
                            <div className="card-body">
                                <Form>
                                    <div className="form-row">
                                        <div className="form-group col-lg-6 col-xl-6">
                                            <label htmlFor="inputName">Name(*)</label>
                                            <FastField
                                                name="name"
                                                type='text'
                                                className="form-control"
                                                id="inputName"
                                            />
                                        </div>
                                        <div className="form-group col-lg-6 col-xl-6">
                                            <label htmlFor="inputStatus">Status(*)</label>
                                            <Select
                                                options={this.statusOption}
                                                onChange={this.getValueStatus}
                                                name='status'
                                                id='inputStatus'
                                                className="form-control form-control-md" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="input-group input-group-sm mb-3 col-lg-6 col-xl-6">
                                            <label htmlFor="inputEffectiveDate">Effective date(*)</label>
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
                                            {/* <div className="input-group-prepend">
                                        <span className="icon-datepicker input-group-text"><i className="fa fa-calendar-alt" aria-hidden="true"></i></span>
                                    </div> */}
                                        </div>
                                        <div className="input-group input-group-sm mb-3 col-lg-6 col-xl-6">
                                            <label htmlFor="inputExpiredDate">Expired date</label><br />
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
                                            {/* <div className="input-group-prepend">
                                        <span className="icon-datepicker input-group-text"><i className="fa fa-calendar-alt" aria-hidden="true"></i></span>
                                    </div> */}
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-lg-6 col-xl-6">
                                            <label htmlFor="inputType">Type(*)</label>
                                            <Select
                                                id='inputType'
                                                name='type'
                                                options={this.typesOption}
                                                onChange={this.getValueType}
                                                className="form-control form-control-md" />
                                        </div>
                                        <div className="form-group col-lg-2 col-xl-2">
                                            <label htmlFor="inputAttachments">Attachments</label>
                                            <div className="custom-file">
                                                <input type="file" onChange={this.getValueFile} className="custom-file-input form-control" id="customFile" />
                                                <label className="custom-file-label form-control" htmlFor="customFile">Choose file</label>
                                            </div>
                                        </div>
                                        <div className="form-group col-lg-4 col-md-4 rounded input-group block-fileName">
                                            {/* <label className='fileName form-control'>File Name</label> */}
                                            <input type="text" className="form-control" id='showFileName' aria-label="Text input with segmented dropdown button" disabled={true} />
                                            <div className="input-group-append">
                                                <button type="button" className="btn btn-outline-secondary form-control" style={{ backgroundColor: 'red', color: 'white' }}>X</button>
                                            </div>
                                        </div>
                                        {/* <div className="form-group col-lg-1 col-xl-1">
                                    <button type="button" className="btn btn-danger btn-remove-file"><span aria-hidden="true">&times;</span></button>
                                </div> */}
                                    </div>
                                    <input type="submit" value='submit' className="btn btn-primary btn-add" />
                                </Form>
                            </div>
                        </div>
                    </Formik>
                    <div className="card shadow mb-4 table-sku">
                        <div className="card-header py-3">
                            <h3 className="m-0 font-weight-bold text-primary">List of SKU</h3>
                            <button type="submit" className="btn btn-success btn-save">Save</button>
                            <button type="submit" className="btn btn-warning btn-cancel">Cancel</button>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4"><div className="row"><div className="col-sm-12 col-md-6"><div className="dataTables_length" id="dataTable_length"><label>Show <select name="dataTable_length" aria-controls="dataTable" className="custom-select custom-select-sm form-control form-control-sm"><option value={10}>10</option><option value={25}>25</option><option value={50}>50</option><option value={100}>100</option></select> entries</label></div></div><div className="col-sm-12 col-md-6"><div id="dataTable_filter" className="dataTables_filter"><label>Search:<input type="search" className="form-control form-control-sm" aria-controls="dataTable" /></label></div></div></div><div className="row"><div className="col-sm-12"><table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing={0} role="grid" aria-describedby="dataTable_info" style={{ width: '100%' }}>
                                    <thead>
                                        <tr role="row">
                                            <th className="sorting_asc" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Name: activate to sort column descending" aria-sort="ascending" style={{ width: '400px' }}>Name</th>
                                            <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '600px' }}>Description</th>
                                            <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Office: activate to sort column ascending" style={{ width: '400px' }}>Status</th>
                                            <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Age: activate to sort column ascending" style={{ width: '200px' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th rowSpan={1} colSpan={1}>Name</th>
                                            <th rowSpan={1} colSpan={1}>Description</th>
                                            <th rowSpan={1} colSpan={1}>Status</th>
                                            <th rowSpan={1} colSpan={1}>Actions</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <tr role="row" className="odd">
                                            <td className="sorting_1">Airi Satou</td>
                                            <td>Accountant</td>
                                            <td>Tokyo</td>
                                            <td>
                                                <button className="btn btn-success btn-sm rounded-0 btn-edit" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i className="fa fa-edit"></i></button>
                                                <button className="btn btn-danger btn-sm rounded-0 btn-delete" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fa fa-trash"></i></button>
                                            </td>
                                        </tr><tr role="row" className="even">
                                            <td className="sorting_1">Angelica Ramos</td>
                                            <td>Chief Executive Officer (CEO)</td>
                                            <td>London</td>
                                            <td>47</td>
                                        </tr><tr role="row" className="odd">
                                            <td className="sorting_1">Ashton Cox</td>
                                            <td>Junior Technical Author</td>
                                            <td>San Francisco</td>
                                            <td>66</td>
                                        </tr><tr role="row" className="even">
                                            <td className="sorting_1">Bradley Greer</td>
                                            <td>Software Engineer</td>
                                            <td>London</td>
                                            <td>41</td>
                                        </tr><tr role="row" className="odd">
                                            <td className="sorting_1">Brenden Wagner</td>
                                            <td>Software Engineer</td>
                                            <td>San Francisco</td>
                                            <td>28</td>
                                        </tr>
                                    </tbody>
                                </table>
                                </div>
                                </div><div className="row">
                                        <div className="col-sm-12 col-md-5">
                                            <div className="dataTables_info" id="dataTable_info" role="status" aria-live="polite">
                                                Showing 1 to 10 of 57 entries
                                    </div>
                                        </div>
                                        <div className="col-sm-12 col-md-7">
                                            <div className="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
                                                <ul className="pagination">
                                                    <li className="paginate_button page-item previous disabled" id="dataTable_previous">
                                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                        <a href="#" aria-controls="dataTable" data-dt-idx={0} tabIndex={0} className="page-link">Previous</a>
                                                    </li>
                                                    <li className="paginate_button page-item active">
                                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                        <a href="#" aria-controls="dataTable" data-dt-idx={1} tabIndex={0} className="page-link">1</a>
                                                    </li>
                                                    <li className="paginate_button page-item ">
                                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                        <a href="#" aria-controls="dataTable" data-dt-idx={2} tabIndex={0} className="page-link">2</a>
                                                    </li><li className="paginate_button page-item ">
                                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                        <a href="#" aria-controls="dataTable" data-dt-idx={3} tabIndex={0} className="page-link">3</a>
                                                    </li>
                                                    <li className="paginate_button page-item ">
                                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                        <a href="#" aria-controls="dataTable" data-dt-idx={4} tabIndex={0} className="page-link">4</a>
                                                    </li>
                                                    <li className="paginate_button page-item ">
                                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                        <a href="#" aria-controls="dataTable" data-dt-idx={5} tabIndex={0} className="page-link">5</a>
                                                    </li>
                                                    <li className="paginate_button page-item ">
                                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                        <a href="#" aria-controls="dataTable" data-dt-idx={6} tabIndex={0} className="page-link">6</a>
                                                    </li>
                                                    <li className="paginate_button page-item next" id="dataTable_next">
                                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                        <a href="#" aria-controls="dataTable" data-dt-idx={7} tabIndex={0} className="page-link">Next</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            } />
        );
    }
}
