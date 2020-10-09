import React, { Component } from "react";
import TemplateMain from "../../template/TemplateMain";
// import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import './Product.css';
// import "react-datepicker/dist/react-datepicker.css";
// import es from 'date-fns/locale/es';
// registerLocale('es', es)

export default class Product extends Component {

    constructor(props) {
        super(props);
        // document.getElementById('body').id = 'page-top';
        this.state = {
            effectiveDate: new Date(),
            expiredDate: new Date()
        }
    }

    getValueExpiredDate = (e) => {
        this.setState({ expiredDate: e })
    }

    getValueEffectiveDate = (e) => {
        this.setState({ effectiveDate: e })
    }

    ProductJsx = <div>
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h1 className="m-0 font-weight-bold text-primary">Create Product</h1>
            </div>
            <div className="card-body">
                <form>
                    <div className="form-row">
                        <div className="form-group col-lg-6 col-xl-6">
                            <label htmlFor="inputName">Name(*)</label>
                            <input type="text" className="form-control" id="inputName" placeholder="product LG_V2" />
                        </div>
                        <div className="form-group col-lg-6 col-xl-6">
                            <label htmlFor="inputStatus">Status(*)</label>
                            <select defaultValue={'0'} className="form-control form-control-md">
                                <option value="0" selected>Active</option>
                                <option value="1">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-group input-group-sm mb-3 col-lg-6 col-xl-6">
                            <label htmlFor="inputEffectiveDate">Effective date(*)</label>
                            {/* <DatePicker
                                    selected={this.state.effectiveDate}
                                    onChange={this.getValueEffectiveDate}
                                    type="text"
                                    className="form-control datepicker"
                                    id="inputEffectiveDate"
                                    name="inputEffectiveDate"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    locale="es"
                                    aria-describedby="basic-addon2"
                                /> */}
                            <div className="input-group-prepend">
                                <span className="icon-datepicker input-group-text"><i className="fa fa-calendar-alt" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div className="input-group input-group-sm mb-3 col-lg-6 col-xl-6">
                            <label htmlFor="inputExpiredDate">Expired date</label><br />
                            {/* <DatePicker
                                    selected={this.state.expiredDate}
                                    onChange={this.getValueExpiredDate}
                                    type="text"
                                    className="form-control datepicker"
                                    id="inputExpiredDate"
                                    name="inputExpiredDate"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    locale="es" /> */}
                            <div className="input-group-prepend">
                                <span className="icon-datepicker input-group-text"><i className="fa fa-calendar-alt" aria-hidden="true"></i></span>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-lg-6 col-xl-6">
                            <label htmlFor="inputType">Type(*)</label>
                            <select defaultValue={'0'} className="form-control form-control-md">
                                <option value="0" selected>1</option>
                                <option value="1">2</option>
                            </select>
                        </div>
                        <div className="form-group col-lg-1 col-xl-1">
                            <label htmlFor="inputAttachments">Attachments</label>
                            <input type="file" className="form-control" id="inputAttachments" />
                        </div>
                        <div className="form-group col-lg-4 col-xl-4">
                            <label className='fileName'>File Name</label>
                        </div>
                        <div className="form-group col-lg-1 col-xl-1">
                            <button type="button" class="btn btn-danger btn-remove-file"><span aria-hidden="true">&times;</span></button>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-add">Add</button>
                </form>
            </div>
        </div>


        <div className="card shadow mb-4 table-sku">
            <div className="card-header py-3">
                <h3 className="m-0 font-weight-bold text-primary">List of SKU</h3>
                <button type="submit" className="btn btn-success btn-save">Save</button>
                <button type="submit" className="btn btn-warning btn-cancel">Cancel</button>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4"><div className="row"><div className="col-sm-12 col-md-6"><div className="dataTables_length" id="dataTable_length"><label>Show <select name="dataTable_length" aria-controls="dataTable" className="custom-select custom-select-sm form-control form-control-sm"><option value={10}>10</option><option value={25}>25</option><option value={50}>50</option><option value={100}>100</option></select> entries</label></div></div><div className="col-sm-12 col-md-6"><div id="dataTable_filter" className="dataTables_filter"><label>Search:<input type="search" className="form-control form-control-sm" placeholder aria-controls="dataTable" /></label></div></div></div><div className="row"><div className="col-sm-12"><table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing={0} role="grid" aria-describedby="dataTable_info" style={{ width: '100%' }}>
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
                                    <button class="btn btn-success btn-sm rounded-0 btn-edit" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-danger btn-sm rounded-0 btn-delete" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>
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
                                        <a href="#" aria-controls="dataTable" data-dt-idx={0} tabIndex={0} className="page-link">Previous</a>
                                    </li>
                                    <li className="paginate_button page-item active">
                                        <a href="#" aria-controls="dataTable" data-dt-idx={1} tabIndex={0} className="page-link">1</a>
                                    </li>
                                    <li className="paginate_button page-item ">
                                        <a href="#" aria-controls="dataTable" data-dt-idx={2} tabIndex={0} className="page-link">2</a>
                                    </li><li className="paginate_button page-item ">
                                        <a href="#" aria-controls="dataTable" data-dt-idx={3} tabIndex={0} className="page-link">3</a>
                                    </li>
                                    <li className="paginate_button page-item ">
                                        <a href="#" aria-controls="dataTable" data-dt-idx={4} tabIndex={0} className="page-link">4</a>
                                    </li>
                                    <li className="paginate_button page-item ">
                                        <a href="#" aria-controls="dataTable" data-dt-idx={5} tabIndex={0} className="page-link">5</a>
                                    </li>
                                    <li className="paginate_button page-item ">
                                        <a href="#" aria-controls="dataTable" data-dt-idx={6} tabIndex={0} className="page-link">6</a>
                                    </li>
                                    <li className="paginate_button page-item next" id="dataTable_next">
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


    render() {
        return (
            <TemplateMain name={this.ProductJsx} />
        );
    }
}
