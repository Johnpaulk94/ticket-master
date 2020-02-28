import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import DepartmentForm from './DepartmentForm'
import Swal from 'sweetalert2'

class Departments extends React.Component {
    constructor () {
        super () 
        this.state = {
            departments : [] ,
        }
    }

    componentDidMount () {
        axios.get("/departments", {
            headers : {
                "x-auth" : localStorage.getItem("authToken")
            }
        })
        .then(response => {
            const departments = response.data
            this.setState({ departments })
        })
    }

    handleSubmit = (department) => {
        axios.post("/departments", department, {
            headers : {
                "x-auth" : localStorage.getItem("authToken")
            }
        })
        .then(response => {
            const department = response.data
            this.setState((prevState) => {
                return {
                    departments : prevState.departments.concat(department)
                }
            })
        })
    }

    handleChange = (e) => {
        this.setState ({ [e.target.name ] : e.target.value })
    }

    handleRemove = (dept) => {
        //console.log(dept)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                axios.delete(`/departments/${dept._id}`, {
                    headers : {
                        "x-auth" : localStorage.getItem("authToken")
                    }
                })
                .then(response => {
                    if (response.data._id) {
                        //window.location.reload()
                        this.setState(prevState => {
                            return {
                                departments : prevState.departments.filter(dept => dept._id !== response.data._id)
                            }
                        })
                    }
                })
                Swal.fire(
                    'Deleted!',
                    'Department is deleted.',
                    'success'
                )
            }
          })
        
    }

    render () {
        return (
            <div className="row">
                <div className="col-md-8">
                    <h2>Departments - { this.state.departments.length }</h2>
                    <ul className="list-group">
                        {
                            this.state.departments.map(dept => {
                                return <li className ="list-group-item" key = { dept._id }>
                                    <span className="text-uppercase">{ dept.name }</span> 
                                    <Link to = "/departments"  onClick = {() => { this.handleRemove(dept)} } className="btn btn-danger btn-sm float-right" >  Remove</Link>
                                    <Link to ={`/departments/${ dept._id }`} className="btn btn-primary btn-sm float-right">Show</Link>
                                    </li>
                            })
                        }
                    </ul>
                </div>
                <div className="col-md-4">
                    <h2> Add Departments</h2>
                    <DepartmentForm handleSubmit = { this.handleSubmit } />
                </div>
                
            </div>
        )
    }
}

export default Departments