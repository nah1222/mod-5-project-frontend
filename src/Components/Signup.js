import React from 'react'

class Signup extends React.Component {
    state = {
        username:"",
        password:"",
        email:""
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
                <h3>Signup Form</h3>
                <form onSubmit={this.submitHandler}className="formIn">
                    Username: <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.changeHandler}/>
                    Password: <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler}/>
                    Email: <input type="text" name="email" placeholder="email" value={this.state.email} onChange={this.changeHandler}/>
                    <input type="submit" value="signup"/>
                </form>
            </div>
        )
    }
}
export default Signup;