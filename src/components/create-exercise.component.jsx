import React, {Component} from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'

export default class CreateExercise extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/users')
        .then(res => {
            if (res.data.length > 0) {
                this.setState({
                    users: res.data.map(user => user.username),
                    username: res.data[0].username
                })
            }
            console.log(res.data);
        })
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onChangeDate = (e) => {
        this.setState({
           date: e
        })
    }
    onSubmit = () => {
       const newExercise = this.state
       axios.post('http://localhost:5000/exercises/add', newExercise)
       .then(res => console.log(res.data))
       .catch(err => console.log(err))

       window.location = '/'
    }

    render() {
        return(
            <div className="container">
                <h3>You're on the create exercise Component</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                         required className="form-control"
                         value={this.state.username}
                         onChange={this.onChange}
                         name="username" >
                             {
                                 this.state.users.map(function(user){
                                     return <option
                                     key={user}
                                     value={user}>
                                         {user}
                                     </option>
                                 })
                             }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text" name="description" className="form-control" onInput={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label>Duration: </label>
                        <input type="number" name="duration" className="form-control" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <div>
                            <DatePicker 
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <button type="button" onClick={this.onSubmit}class="btn btn-primary float-right">Submit</button>
                </form>
            </div>
        )
    }
}