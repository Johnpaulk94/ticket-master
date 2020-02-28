import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class CustomerList extends  React.Component {
    constructor () {
        super ()
        this.state = {
            customers : []
        }
    }

    componentDidMount () {
        axios.get("/customers", {
            headers : {
                "x-auth" : localStorage.getItem("authToken")
            }
        })
        .then((response) => {
            const customers = response.data
            this.setState({ customers })
        })
    }

    handleClick = (id) => {
        axios.delete(`/customers/${id}`, {
            headers : {
                "x-auth" : localStorage.getItem("authToken")
            }
        })
        .then (response => {
            if (response.data._id) {
                //window.location.reload()
                this.setState(prevState => {
                    return {
                        customers : prevState.customers.filter(cust => cust._id != response.data._id)
                    }
                })
            } else {
                alert(response.data.message)
            }
        })
    }

    render () {
        const customers = this.state.customers
        return (
            <div>
                <h2>Listing customers - { customers.length }</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Customer name</th>
                            <th>Customer mail</th>
                            <th>Customer Mobile</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {
                            customers.map(customer => {
                                return (
                                    <tr>
                                        <td>{customer.name}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.mobile}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
              
                
                <Link to = "/customers/new">Add a customer</Link>

            </div>
        )
    }
}

export default CustomerList