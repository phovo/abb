import React, { Component } from 'react'
import EditableTimer from './EditableTimer';
import Timer from './Timer';

export class TimerList extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        const timers = this.props.timers.map(timer => (
            <EditableTimer
                title={timer.title}
                project={timer.project}
                elapsed={timer.elapsed}
                runningSince={timer.runningSince}
                editFormOpen={timer.editFormOpen}
            />
        ))
        return (
            <div id='timers'>
                {timers}
            </div>
        );
    }
}

export default TimerList
