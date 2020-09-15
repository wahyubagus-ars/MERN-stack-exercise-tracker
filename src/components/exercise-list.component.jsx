import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>Edit</Link> | <a href="#" onClick={() => {props.deleteExercise(props.exercise._id)}}>Delete</a>
        </td>
    </tr>
)

export default class ExercisesList extends Component {
    constructor(props){
        super(props)

        this.state = {
            exercises: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/exercises')
        .then(res => {
            this.setState({
                exercises: res.data
            })
            console.log(res.data);
        }).catch(err => console.log(err))
    }

    exercisesList(){
        return this.state.exercises.map(e => {
            return <Exercise exercise={e} deleteExercise={this.deleteExercise} key={e._id} />
        })
    }

    deleteExercise = (id) => {
        axios.delete('http://localhost:5000/exercises/' + id)
        .then(res => {
            console.log(res.data)
            this.setState({
                exercises: this.state.exercises.filter(el => el._id !== id)
            })
        })
    }

    render() {
        return(
            <div className="container">
                <h3>Exercises List</h3>
                <table className="table">
                    <thead className="thead-dark">
                      <tr>
                        <td>Username</td>
                        <td>Description</td>
                        <td>Duration</td>
                        <td>Date</td>
                        <td>Actions</td>
                      </tr>
                    </thead>
                    <tbody>
                        {this.exercisesList() }
                    </tbody>
                </table>
            </div>
        )
    }
}