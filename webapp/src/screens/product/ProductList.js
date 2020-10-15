import React, { Component } from 'react'
import Aux from "../../hoc/_Aux";
import SearchBox from '../../_components/SearchBox/SearchBox'
import Pagination from '../../_components/Pagination/Pagination'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { productAction } from '../../_actions/product.action'
import { Redirect } from 'react-router';

class ProductList extends Component {
    state = {
        id: 0,
    }


    componentDidMount() {
        this.getProduct(1, "");
    }
    
    renderProductList= ()=>{
        return this.props.product.map((item,index)=>{
            return <tr key ={index}>
                <td scope ="row">{item.id}</td>
                <td>{item.name}</td>
                <td>{item.status?'Active':'Inactive'}</td>
                <td>{item.type}</td>
                <td>{item.effectiveDate}</td>
                <td>{item.expiredDate}</td>
                <td style={{ width: '20px' }}><button className='btn btn-success' style={{ marginRight: '10px' }}><i className="fa fa-edit"></i>
                </button><button className='btn btn-danger' ><i className="fa fa-trash"></i></button></td>
            </tr>
        })
    }
    render() {
        console.log('===== product:',this.props.product)
        return (
            <Aux>
                <ToastContainer toastClassName='alert alert-danger' />
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Row>
                                    <Col md='9' xs='9'> <Card.Title as="h3">Product List</Card.Title></Col>
                                    <Col md='3' xs='3'><Button href="/createsku">Create new SKU</Button></Col>
                                </Row>
                                {/* <span className="d-block m-t-5">use bootstrap <code>Table</code> component</span> */}
                            </Card.Header>
                            <Card.Body>
                                <SearchBox search={this.search} />
                                <Row>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Status</th>
                                                <th>Type</th>
                                                <th>Effective Date</th>
                                                <th>Expired Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* <tr>
                                                {/* <th scope="row">id</th>
                                                <td>name name</td>
                                                <td>active</td>
                                                <td>14/10/2020</td>
                                                <td>15/10/2020</td>
                                                <td style={{ width: '20px' }}><button className='btn btn-success' style={{ marginRight: '10px' }}><i className="fa fa-edit"></i>
                                                </button><button className='btn btn-danger' ><i className="fa fa-trash"></i></button></td>
                                            </tr>*/}
                                            {this.renderProductList()}
                                        </tbody>
                                    </Table>
                                </Row>
                                <div className="float-right"><Pagination  /></div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
    getProduct(page, text) {
        this.props.getProduct(page, text);
    }
}


const mapStateToProps = state => {
    return {
        layout: state.reducer.layout,
        isOpen: state.reducer.isOpen,
        isTrigger: state.reducer.isTrigger,
        product: state.product.product
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProduct: (page, text) => dispatch(productAction.getProduct(page, text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)