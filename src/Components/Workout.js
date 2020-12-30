import React from 'react';

class Workout extends React.Component {
    render() {
        return (
            <ul>
                <img className="image" src={this.props.workout.image}/>
                <li><strong>{this.props.workout.name}</strong> reps: x{this.props.wroObj.reps}</li>
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