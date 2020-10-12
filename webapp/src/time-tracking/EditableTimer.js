import React, { Component } from 'react'
import Timer from './Timer';
import TimerForm from './TimerForm';

export default class EditableTimer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editFormOpen: false
        }
    }

    onSubmit = () => {
        this.setState({
            editFormOpen: false
        })
    }

    onClose = () => {
        this.setState({
            editFormOpen: false
        })
    }

    onEdit = () => {
        this.setState({
            editFormOpen: true
        })
    }

    render() {
        if (this.state.editFormOpen) {
            return (
                <TimerForm
                    id={this.props.id}
                    title={this.props.title}
                    project={this.props.project}
                    onSubmit={this.onSubmit}
                    onClose={this.onClose}
                />
            );
        } else {
            return (
                <Timer
                    id={this.props.id}
                    title={this.props.title}
                    project={this.props.project}
                    elapsed={this.props.elapsed}
                    runningSince={this.props.runningSince}
                    onEdit={this.onEdit}
                />
            );
        }
    }
}
