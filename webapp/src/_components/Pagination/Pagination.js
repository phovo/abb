import React from 'react';
import { Row, Col, Pagination } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";

class Paginations extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pages: []
        }
    }

    render() {
        let pages = [];
        for(let i = 1; i <= this.props.totalPage; i++ ){
            pages.push(i);
        }
        return (
            <Aux>
                <Row>
                    <Col md={12}>
                        <Pagination onClick={this.click}>
                            <Pagination.First disabled={this.props.page === 1} >First</Pagination.First>
                            <Pagination.Prev disabled={this.props.page === 1} >Prev</Pagination.Prev>
                            {pages.map((i) => {
                                return(<Pagination.Item active={i === this.props.page} key={i} >{i}</Pagination.Item>)
                            })}                           
                            <Pagination.Next disabled={this.props.page === this.props.totalPage}> Next</Pagination.Next>
                            <Pagination.Last disabled={this.props.page === this.props.totalPage}> Last</Pagination.Last>
                        </Pagination>
                    </Col>
                </Row>
            </Aux>
        );
    }

    componentDidMount () {
        
    }

    componentDidUpdate() {
        let pages = [];
        for(let i = 1; i <= this.props.totalPage; i++ ){
            pages.push(i);
        }
        // this.setState({pages: pages});
    }

    click = (e) => {
        if(e.target.className.indexOf('disable') !== -1 || e.target.className.indexOf('active') !== -1) {
            return;
        }
        let number = 1;
        if(e.target.textContent.indexOf('Last') !== -1 ) {
            number = this.props.totalPage;
        } else if(e.target.textContent.indexOf('First') !== -1 ) {
            number = 1;
        } else if(e.target.textContent.indexOf('Prev') !== -1) {
            number = this.props.page - 1 ;
        } else if(e.target.textContent.indexOf('Next') !== -1) {
            number = this.props.page + 1 ;
        } else {
            number = parseInt(e.target.textContent);
        }
        this.props.changePage(number);
    }
}

export default Paginations;