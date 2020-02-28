import React from 'react'

class DepartmentForm extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            name : props.name ? props.name : ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name ] : e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault ()
        const name = this.state.name
        const department = { name }
        this.props.handleSubmit(department)
    }

    render () {
        return (
            <div className="form-group">
                <form onSubmit = { this.handleSubmit }>
                    <input type="text" name="name" value={ this.state.name} onChange = {this.handleChange}/>
                    <input type="submit" name="" value="submit"/>
                </form>

            </div>
        )
    }
}

export default DepartmentForm