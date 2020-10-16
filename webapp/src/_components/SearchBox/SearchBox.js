import React from 'react';
import { Row, Col, Form, Button} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: ''}
    }

    onChangeValue = (event) =>  {
        this.setState({text: event.target.value})
    }
    search = () =>{
        this.props.search(this.state.text);
    }

    render() {
        return (
            <Aux>
                <Row>
                    <Col md={9}>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Typing to search data" value={this.state.text} onChange={this.onChangeValue}/>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col md={3}>
                        <Button className="float-right" onClick={this.search} style={{padding:'10px 63px'}}>Search</Button>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default SearchBox;