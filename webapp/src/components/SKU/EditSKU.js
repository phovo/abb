import React, { Component } from 'react';
import SKUApis from "../../api/SKUApis/SKUApis";


class EditSKU extends Component {

    constructor(props) {
        super(props);
        this.findSKUById(this.props.location.state.key);
    }

    findSKUById = (id) => {
        const getSKUById = async() => {
            try {
                const response = SKUApis.getSKUById(id);
                console.log(response);
                if (response !== null) {
                    console.log(response);
                    return response;
                }
            } catch (error) {
                console.log('failed', error);
            }
        }
        getSKUById();
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default EditSKU;