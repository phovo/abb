import React, { Component } from 'react'

export class Form01 extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            names: [],
            errors: []
        }
    }

    onSubmit = (evt) => {
        this.setState({
            errors: this.validate()
        })
        evt.preventDefault();
        if (!(this.state.errors.length === 0)) return;
        const names = [...this.state.names, this.state.name]
        this.setState({
            names: names
        })
    }

    onInputChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    validate = () => {
        const errors = []
        const { name } = this.state
        if (!name) errors.name = "Name required";
        return errors;
    }

    render() {
        const { name, names } = this.state
        return (
            <div>
                <h1>Sign Up Sheet</h1>
                <form onSubmit={this.onSubmit}>
                    <input placeholder='Name' name="name" value={name} onChange={this.onInputChange} /> <br />
                    <span style={{ color: 'red' }}>{this.state.errors.name}</span> <br />
                    <input type='submit' />
                </form>
                <br />
                <div>
                    <h3>Names</h3>
                    <ul>
                        {names.map((name, i) => <li key={i}>{name}</li>)}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Form01
