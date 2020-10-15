import React, { Component, Suspense } from 'react'
import Aux from "../../hoc/_Aux";
import SearchBox from '../../_components/SearchBox/SearchBox'
import Pagination from '../../_components/Pagination/Pagination'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { productAction } from '../../_actions/product.action';
import { ToastContainer, toast } from 'react-toastify';
import {DELETE_SUCCESSFULLY} from '../../_const/message'
import { Redirect, withRouter } from 'react-router';
import { history } from '../../_helpers/history';
import ProductEdit from './ProductEdit';

class ProductList extends Component {
    state = {
        id: 0,
    }

    componentDidMount() {
        this.getProduct(1, "");
    }
    shouldComponentUpdate(nextState, nextProps) {
        if(!this.props.product.isError && nextState.product.isError) {
            toast.error(nextState.product.messageError);
        } else if(!this.props.product.isDelete && nextState.product.isDelete) {
            toast.info(DELETE_SUCCESSFULLY);
        }
        return true;
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
                <td style={{ width: '20px' }}>
                    <Button className='btn btn-success' href={`/productedit/${item.id}`} style={{ marginRight: '10px', width: '55px' }}>
                        <i className="fa fa-edit"></i>
                    </Button>

                    <button className='btn btn-danger' onClick={()=>{this.props.deleteProduct(item.id)}} style={{ width: '55px' }} >
                        <i className="fa fa-trash"></i>
                    </button>
                </td>
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
                                <Row >
                                    <Col md='9' xs='9'> <Card.Title as="h3">Product List</Card.Title></Col>
                                    <Col md='3' xs='3'><Button className="float-right" href="/createproduct">Create new Product</Button></Col>
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
    delete(id) {
        this.props.deleteProduct(id, this.props.product.page, this.props.product.searchText);
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
        getProduct: (page, text) => dispatch(productAction.getProduct(page, text)),
        deleteProduct: (id) =>  dispatch(productAction.deleteProductById(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductList));