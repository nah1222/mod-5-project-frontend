import React from 'react';
import { Route, Switch } from 'react-router-dom'
import RoutineContainer from './Containers/RoutineContainer'

class App extends React.Component {

  state = {
    routineData: [],
    allWorkoutData: []
  };

  submitHandler = (newRoutine) => {
    // this.setState({routineData:[...this.state.routineData, newRoutine] });
    fetch("http://localhost:3000/routines", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(newRoutine)
    })
      .then(r => r.json())
      .then(data => this.setState({ routineData: [...this.state.routineData, data] }))
      .catch(console.log)
  }

  updateRoutineData = (updatedRoutine) => {
    this.setState({
      routineData: this.state.routineData.map(routine => routine.id === updatedRoutine.id ? updatedRoutine : routine)
    })
  }

  componentDidMount() {
    fetch("http://localhost:3000/routines")
      .then(resp => resp.json())
      .then(data => this.setState({ routineData: data }))
    fetch("http://localhost:3000/workouts")
      .then(resp => resp.json())
      .then(data => this.setState({ allWorkoutData: data }))

  };

  deleteRoutine = routineId => {
    fetch(`http://localhost:3000/routines/${routineId}`, {
        method: 'DELETE'
    })
        .then(r => r.json())
        .then(deletedRoutine => {
            this.setState({
                routineData: this.state.routineData.filter(routine => routine.id !== deletedRoutine.id)
            })
        })
}


  render() {
    return (
      <div>
        <RoutineContainer
          allWorkoutData={this.state.allWorkoutData}
          routineData={this.state.routineData}
          submitHandler={this.submitHandler}
          updateRoutineData={this.updateRoutineData}
          deleteRoutine = {this.deleteRoutine}
        />
      </div>
    );
  };
};
export default App;
