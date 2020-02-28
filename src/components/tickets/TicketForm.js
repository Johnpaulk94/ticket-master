import React from 'react'
import axios from '../../config/axios'

class TicketForm extends React.Component {
    constructor () {
        super ()
        this.state ={
            codeNo : '',
            name : '',
            customers : [],
            customer : '',
            employee: '',
            department : '',
            message : '',
            departments :[],
            employees : [],
            priority : ''

        }
    }

    componentDidMount () {
        const req1 = axios.get("/customers")
        const req2 = axios.get("/employees")
        const req3 = axios.get("/departments")
        Promise.all([req1, req2, req3])
        .then(responses => {
            //console.log(responses[0].data)
            const customers = responses[0].data
            const employees = responses[1].data
            const departments = responses[2].data
            this.setState({ customers, employees, departments })
        })
    }

    handleSelect = (e) => {
        //console.log(e.target.id)
        this.setState({[ e.target.id ] : e.target.value})
    }

    handleChange = (e) => {
       this.setState({ [ e.target.name ] : e.target.value })
       //console.log(e.target.name, e.target.value)
    }

    handleSubmit = (e) => {
        e.preventDefault ()
        const employees = this.state.employees.find(empl => empl.name == this.state.employee)
        const department = this.state.departments.find(dept => dept.name == this.state.department)
        const customer = this.state.customers.find(cust => cust.name == this.state.customer)
        const formData = {
            code: this.state.codeNo,
            employees ,
            department ,
            customer ,
            message : this.state.message,
            priority : this.state.priority
        }
        this.props.handleSubmit(formData)
    }
 
    render () {
        const employees = this.state.employees.filter(empl => empl.department.name == this.state.department)
        return (
            <div className = "container">
                <form onSubmit = { this.handleSubmit }>
                    <label htmlFor="codeNo">Code Number</label><br/>
                    <input type="text" name="codeNo" id="codeNo" value={ this.state.codeNo } onChange = { this.handleChange }/><br/>
                    <label htmlFor="customer">Customer</label><br/>
                    <select id="customer" onChange = { this.handleSelect }>
                        <option value = "select">Select</option>
                        {
                            this.state.customers.map(customer => {
                                return <option key = { customer._id } name = "customer" value = { customer.name }>{ customer.name }</option>
                            })
                        }
                    </select><br/>
                    <label htmlFor="department">Department</label><br/>
                    <select id = "department" onChange = { this.handleSelect }>
                        <option value = "select">Select</option>
                        {
                            this.state.departments.map(department => {
                                return <option key = { department._id } value = { department.name }>{ department.name }</option>
                            })
                        }
                    </select><br/>
                    <label htmlFor="employee">Employee</label><br/>
                    <select id = "employee" onChange = { this.handleSelect }>
                        <option value = "select">Select</option>
                        {
                            employees.map(employee => {
                                return <option key = { employee._id } value = { employee.name }>{ employee.name }</option>
                            })
                        }
                    </select><br/>
                    <label htmlFor="message">Message</label><br/>
                    <textarea  id = "message" onChange = { this.handleChange } name = "message" value = { this.state.message } cols="70" rows="4"></textarea><br/>
                    <label htmlFor="priority">Priority :</label><br/>
                        <input type="radio" name="priority" value="High" onChange = { this.handleChange }/>High<br/>
                        <input type="radio" name="priority" value="Medium" onChange = { this.handleChange }/>Medium<br/>
                        <input type="radio" name="priority" value="Low" onChange = { this.handleChange }/>Low<br/>
                    <input type="submit" name="" value="Submit"/>
                </form>
            </div>
        )
    }
}

export default TicketForm