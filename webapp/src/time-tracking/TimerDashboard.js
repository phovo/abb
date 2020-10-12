import React, { Component } from 'react'
import EditableTimer from './EditableTimer'
import { v4 as uuidv4 } from 'uuid';
import TimerList from './TimerList';

export default class TimerDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            timers: [
                {
                    title: 'Practice squat',
                    project: 'Gym Chores',
                    id: uuidv4(),
                    elapsed: 5456099,
                    runningSince: Date.now(),
                },
                {
                    title: 'Bake squash',
                    project: 'Kitchen Chores',
                    id: uuidv4(),
                    elapsed: 1273998,
                    runningSince: null,
                },
            ]
        }
    }

    render() {
        return (
            <div className='ui three column centered grid'>
                <div className='column'>
                    <TimerList
                        timers={this.state.timers}
                    />
                </div>
            </div>
        )
    }
}
