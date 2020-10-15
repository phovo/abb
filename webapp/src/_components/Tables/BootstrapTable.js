import React from 'react';
import {Row, Table} from 'react-bootstrap';
import {connect} from 'react-redux';
import Aux from "../../hoc/_Aux";
import { sku } from '../../_reducers/sku.reducer';

class BootstrapTable extends React.Component {
//     state ={
//         skuEdit: {
//         name : '',
//         status :'',
//         description:''
//     }
// }
    handleEdit=(e)=>{
        
    }
    render() {
        return (
            <Aux>
                <Row>
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
                            {this.props.data.map((d) => {
                                return (<tr key={d.id}>
                                    <th scope="row">{d.id}</th>
                                    <td>{d.name}</td>
                                    <td>{d.status ? 'Active' : 'Inactive'}</td>
                                    <td>{d.description}</td>
                                    <td style={{width: '20px'}}><a href={`/editSKU/${d.id}`}><button className='btn btn-success' style={{marginRight: '10px'}}><i className="fa fa-edit"></i>
                                    </button></a><button className='btn btn-danger' onClick={() => this.props.delete(d.id)}><i className="fa fa-trash"></i></button></td>
                                </tr>)
                            })}
                        </tbody>
                    </Table>
                </Row>
            </Aux>
        );
    }
}

const mapStateToProps=state=>{
    return {
        sku: state.sku,
        skuEdit: state.skuEdit
    }
}

export default connect(mapStateToProps)(BootstrapTable);