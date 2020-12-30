import React from 'react'

class Login extends React.Component {
    state = {
        username:"",
        password:""
    }
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    submitHandler = (e) => {
        e.preventDefault()
        this.props.submitHandler(this.state)
    }

    render(){
        return(
            <div className="formOut">
                <h3>Login Form</h3>
                <form onSubmit={this.submitHandler} className="formIn">
                    <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.changeHandler}/>
                    <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler}/>
                    <input type="submit" value="signup"/>
                </form>
            </div>
        )
    }
}
export default Login;