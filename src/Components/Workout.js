import React from 'react';

class Workout extends React.Component {
    render() {
        return (
            <ul>
                <li>{this.props.workout.name}</li>
                <ul>{this.props.workout.description}</ul>
                {
                    this.props.isEditModeOn && (
                        <button onClick={() => this.props.removeWorkoutFromRoutine(this.props.wroId)}>
                            Delete
                        </button>
                    )
                }
            </ul>
        )
    }
}
export default Workout;