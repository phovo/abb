import React, { Component } from "react";
// import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import './Product.css';
// import "react-datepicker/dist/react-datepicker.css";
// import es from 'date-fns/locale/es';
// registerLocale('es', es)

export default class Product extends Component {

    constructor(props) {
        super(props);
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

    render() {
        return (
            <div id="wrapper">
                <h1>Create Product</h1>
                <hr />
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
                            <div class="input-group-prepend">
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
                                <div class="input-group-prepend">
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
                        <div class="form-group col-lg-6 col-xl-6">
                            <label htmlFor="inputAttachments">Attachments</label>
                            <input type="file" className="form-control" id="inputAttachments" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-add">Add</button>
                </form>
                <h3>List of SKU</h3>
                <table class="table">
                    <thead class="thead-light">
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>John</td>
                            <td>Doe</td>
                            <td>john@example.com</td>
                            <td>john@example.com</td>
                        </tr>
                        <tr>
                            <td>Mary</td>
                            <td>Moe</td>
                            <td>mary@example.com</td>
                            <td>john@example.com</td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" className="btn btn-success btn-save">Save</button>
                <button type="submit" className="btn btn-warning btn-cancel">Cancel</button>
            </div>
        );
    }
}
