import React from 'react';
import SimpleUserService from '../services/SimpleUserService';

class SimpleUserComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            simpleUsers:[]
        }
    }

    componentDidMount() {
        SimpleUserService.getUsers().then((response) => {
            this.setState({ simpleUsers: response.data })
        });
    }

    render() {
        return (
            <div>
                <h1 className = "text-center">Simple Users List</h1>
                <table className='table table-striped'>
                    <thead>
                        <tr>

                            <td>Username</td>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Email</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.simpleUsers.map(
                                simpleUser =>
                                <tr key = {simpleUser.username}>
                                    <td> {simpleUser.username} </td>
                                    <td> {simpleUser.firstName} </td>
                                    <td> {simpleUser.lastName} </td>
                                    <td> {simpleUser.email} </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default SimpleUserComponent;