import React, {Component} from "react";
import axios from "axios";
import "./Type.css"

export class Type extends Component {
    state = {
        types: []
    };

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/api/types`)
            .then(resp => this.setState({
                types: resp.data
            }));
    }

    render() {
        const types = this.state.types.map((type, i) =>
            <li key={i}>
                <b>{type.code}</b>: {type.name}
            </li>
        );
        return (
            <ul className="types">
                {types}
            </ul>
        );
    }
}
