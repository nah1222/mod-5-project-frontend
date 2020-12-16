import React from 'react';
import Workout from '../Components/Workout'

class Routine extends React.Component {

    state = {
        isEditModeOn: false,
        wroForm: {
            workout_id: this.props.routine.workout_routine_objs[0]?.id,
            reps: 0
        }
    }
    //toggle function
    toggleEditMode = () => {
        this.setState((prevState) => ({ isEditModeOn: !prevState.isEditModeOn }))
    }

    handleFormFieldChange = (event) => {
        event.preventDefault();

        this.setState({
            ...this.state,
            wroForm: {
                // copying the form state because each input only changes one field and 
                // will delete the other if not copied
                // todo: move the form into its own component
                ...this.state.wroForm,
                [event.target.name]: event.target.value
            }
        })
    }

    renderWorkouts = () => {
        return this.props.routine.workout_routine_objs.map(wroObj =>
            <Workout
                isEditModeOn={this.state.isEditModeOn}
                key={wroObj.workout.id}
                removeWorkoutFromRoutine={this.removeWorkoutFromRoutine}
                workout={wroObj.workout}
                wroId={wroObj.id}
            />
        )
    }

    addWorkoutToRoutine = async event => {
        event.preventDefault();

        await fetch('http://localhost:3000/workout_routine_objs', {
            method: 'POST',
            headers: {
                'Accepts': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                workout_routine_obj: {
                    ...this.state.wroForm,
                    routine_id: this.props.routine.id
                }
            })
        })
        const response = await fetch(`http://localhost:3000/routines/${this.props.routine.id}`);
        const updatedRoutine = await response.json();
        this.props.updateRoutineData(updatedRoutine);
    }

    removeWorkoutFromRoutine = async wroId => {
        await fetch(`http://localhost:3000/workout_routine_objs/${wroId}`, {
            method: 'DELETE'
        })
        const response = await fetch(`http://localhost:3000/routines/${this.props.routine.id}`);
        const updatedRoutine = await response.json();
        this.props.updateRoutineData(updatedRoutine);
    }

    render() {
        // console.log(this.props.routine, 'routine data')
        return (
            <div>
                Routine: {this.props.routine.name}
                <br />
                difficulty: {this.props.routine.difficulty}
                {this.renderWorkouts()}
                {
                    this.state.isEditModeOn && (
                        <form name="create-wro-form" onSubmit={this.addWorkoutToRoutine}>
                            <select
                                name="workout_id"
                                onChange={this.handleFormFieldChange}
                                value={this.state.wroForm.workout_id}>
                                {
                                    this.props.allWorkoutData.map(workout =>
                                        <option key={workout.id} value={workout.id}>
                                            {workout.name}
                                        </option>
                                    )
                                }
                            </select>
                            <input
                                min={0}
                                name="reps"
                                onChange={this.handleFormFieldChange}
                                placeholder="reps"
                                type="number"
                                value={this.state.wroForm.reps}
                            />
                            <button type="submit">Add Workout to Routine</button>
                        </form>
                    )
                }
                {
                    !this.state.isEditModeOn ?
                        (<button onClick={this.toggleEditMode}>
                            Edit this Routine
                        </button>) :
                        (<button onClick={this.toggleEditMode}>
                            Stop Editing</button>)
                }
                <button onClick={() => this.props.deleteRoutine(this.props.routine.id)}>Delete Routine</button>
                <hr />
            </div>
        )
    }
}
export default Routine;






// this is what this function looks like without async/await

// addWorkoutToRoutine = event => {
//     // send workout_id, routine_id, reps to backend 
//     // {
//     //     workout_routine_obj: {
//     //         routine_id, 
//     //         reps, 
//     //         workout_id
//     //     }
//     // }
//     event.preventDefault();

//     fetch('http://localhost:3000/workout_routine_objs', {
//         method: 'POST',
//         headers: {
//             'Accepts': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             workout_routine_obj: {
//                 ...this.state.wroForm,
//                 routine_id: this.props.routine.id
//             }
//         })
//     })
//         .then(r => r.json())
//         .then(() => {
//             fetch(`http://localhost:3000/routines/${this.props.routine.id}`)
//                 .then(r => r.json())
//                 .then(updatedRoutine => {
//                     this.props.updateRoutineData(updatedRoutine)
//                 })
//         })
// }