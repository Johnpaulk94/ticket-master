import React from 'react'
import axios from '../../config/axios'

class TicketEdit extends React.Component {
    constructor () {
        super ()
        this.state = {
            ticket : {}
        }
    }

    componentDidMount () {
        const id = this.props.match.params.id
        axios.get(`/tickets/${id}`)
        .then(response => {
            console.log(response.data)
        })
    }

    render () {
        return (
            <div>
                <h2>Edit ticket</h2>
            </div>
        )
    }
}

export default TicketEdit