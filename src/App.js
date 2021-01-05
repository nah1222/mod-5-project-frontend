import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import RoutineContainer from './Containers/RoutineContainer'
import "./App.css"
import Header from './Components/Header'
import NavBar from './Containers/NavBar'
import Signup from './Components/Signup'
import Login from './Components/Login'

class App extends React.Component {

  state = {
    routineData: [],
    allWorkoutData: [],
    allUsers: [],
    userData: {}
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

  handleLogin = (user) => {
    this.setState({ userData: user })
  }

  // signupSubmitHandler = (newUser) => {
  //   fetch("http://localhost:3000/users", {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accepts': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       newUser
  //     })
  //   })
  //     .then(resp => resp.json())
  //     .then(data => {
  //       localStorage.setItem("token", data.jwt)
  //       this.handleLogin(data.user)
  //     })
  //   }

    loginHandler = (user) => {
      console.log("logging in", user)
      fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          accepts: "application/json",
          "content-type": "application/json"
        },
        body: JSON.stringify(
          user
        )
      })
        .then(r => r.json())
        .then(data => {
          localStorage.setItem("token", data.jwt)
          this.handleLogin(data.user)
        })
    }

    // useEffect = () => {
    //   // const token = localStorage.getItem("token")
    //   // if(token){
    //   //   fetch(`http://localhost:3000auto_login`, {
    //   //     headers:{
    //   //       Authorization:`Bearer ${token}`
    //   //     }
    //   //   })
    //   //   .then(resp => resp.json())
    //   //   .then(data => {
    //   //     this.setState({userData:data})
    //   //   })
    //   // }
    // }



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
      fetch("http://localhost:3000/users")
        .then(resp => resp.json())
        .then(data => this.setState({ allUsers: data }))

      //   const token = localStorage.getItem("token")
      //   if(token){
      //     fetch(`http://localhost:3000/auto_login`, {
      //       method:"GET",
      //       headers:{
      //         Authorization:`Bearer ${token}`
      //       }
      //     })
      //     .then(resp => resp.json())
      //     .then(data => {
      //       this.setState({userData:data})
      //     })
      //   }

      // const loginToken = localStorage.getItem('token');

      // send token to backend
      // backend will decode this token to see if its valid (ie. is it a valid user id)
      // if valid, then we set state of userData to the corresponding user
      // if invalid then we do nothing since they're not logged in
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
        <BrowserRouter>
          <div>
            <Header />
            <NavBar userData={this.state.userData} />
            <Switch>
              <Route path="/routines" render={() => <RoutineContainer
                allWorkoutData={this.state.allWorkoutData}
                routineData={this.state.routineData}
                submitHandler={this.submitHandler}
                updateRoutineData={this.updateRoutineData}
                deleteRoutine={this.deleteRoutine}
              />} />
              <Route path="/login" render={() => <Login
                submitHandler={this.loginHandler}
              />} />
              <Route path="/signup" render={() => <Signup
                allUsers={this.state.allUsers}
                submitHandler={this.signupSubmitHandler}
              />} />
            </Switch>

          </div>
        </BrowserRouter>
      );
    };
  };
  export default App;
