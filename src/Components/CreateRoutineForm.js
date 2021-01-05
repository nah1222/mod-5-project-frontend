import React from 'react';

class CreateRoutineForm extends React.Component {

    state = {
        name: "",
        difficulty: 0,
        user_id: 0
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.submitHandler(this.state);
        this.setState({
            name: "",
            difficulty: 0,
            user_id: 0
        })
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                name: <input
                    type="text"
                    name="name"
                    className="routine-name"
                    placeholder="Routine name"
                    onChange={this.changeHandler}
                    value={this.state.name} />
                    <br/>
                difficulty: <input 
                    type="number" 
                    name="difficulty" 
                    className="routine-diffuculty" 
                    placeholder="diffuculty rating" 
                    onChange={this.changeHandler} 
                    value={this.state.difficulty} />
                <br/>
                user:<input 
                    type="number" 
                    name="user_id" 
                    className="routine-user" 
                    placeholder="user id" 
                    onChange={this.changeHandler} 
                    value={this.state.user_id} />
                <br/>
                <button type="submit" >Create Routine</button>
            </form>
        )
    }
}
export default CreateRoutineForm;