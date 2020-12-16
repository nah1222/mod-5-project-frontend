import React from 'react';
import { Route } from 'react-router-dom'
import Routine from './Routine'
import CreateRoutineForm from '../Components/CreateRoutineForm'

class RoutineContainer extends React.Component {
    renderRoutines = () => {
        return this.props.routineData.map(routine =>
            <Routine
                allWorkoutData={this.props.allWorkoutData}
                key={routine.id}
                routine={routine}
                updateRoutineData={this.props.updateRoutineData}
            />)

    };

    render() {
        return (
            <div>
                <CreateRoutineForm submitHandler={this.props.submitHandler}/>
                {this.renderRoutines()}
            </div>
        )
    }
}
export default RoutineContainer;