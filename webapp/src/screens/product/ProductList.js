import React, { Component } from 'react'
import Aux from "../../hoc/_Aux";
import SearchBox from '../../_components/SearchBox/SearchBox'
import Pagination from '../../_components/Pagination/Pagination'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { productAction } from '../../_actions/product.action'

class ProductList extends Component {


    // componentDidMount() {
    //     this.getProduct(1, "");
    // }
    // renderListProduct = () => {
    //     return this.props.product.map((item, index) => {
    //         return (<tr key={item.id}>
    //             <th scope="row">{item.id}</th>
    //             <td>{item.name}</td>
    //             <td>{item.type ? 'Active' : 'Inactive'}</td>
    //             <td>{item.effectivedate}</td>
    //             <td>{item.expireddate}</td>
    //             <td style={{ width: '20px' }}><button className='btn btn-success' style={{ marginRight: '10px' }}><i className="fa fa-edit"></i>
    //             </button><button className='btn btn-danger' ><i className="fa fa-trash"></i></button></td>
    //         </tr>)
    //     })
    // }
    render() {
        return (
            <Aux>
                <ToastContainer toastClassName='alert alert-danger' />
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Row>
                                    <Col md='9' xs='9'> <Card.Title as="h3">SKU List</Card.Title></Col>
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
                                                <th>Effective Date</th>
                                                <th>Expired Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">id</th>
                                                <td>name name</td>
                                                <td>active</td>
                                                <td>14/10/2020</td>
                                                <td>15/10/2020</td>
                                                <td style={{ width: '20px' }}><button className='btn btn-success' style={{ marginRight: '10px' }}><i className="fa fa-edit"></i>
                                                </button><button className='btn btn-danger' ><i className="fa fa-trash"></i></button></td>
                                            </tr>                                        </tbody>
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
    // getProduct(page, text) {
    //     this.props.getProduct(page, text);
    // }
}


const mapStateToProps = state => {
    return {
        layout: state.reducer.layout,
        isOpen: state.reducer.isOpen,
        isTrigger: state.reducer.isTrigger,
        product: state.product
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProduct: (page, text) => dispatch(productAction.getProduct(page, text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)