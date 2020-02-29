import React, {Component} from 'react';
import axios from 'axios';

export default class UsersList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {users: []}
    }

    componentDidMount() {
        axios.get('http://localhost:4000/')
             .then(response => {
                 this.setState({users: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    search = (e) => {
        this.props.history.push({
            pathname: '/customer/:id',
            id: this.state.customer_id,
            name: this.state.customername
        })
    }
    
    logout = (e) => {
        this.props.history.push({
            pathname: '/login',
        })
    }

    render() {
        return (
            <div>
                <button onClick = {e => this.search(e)}>Predict Value</button>
                <button onClick = {e => this.logout(e)}>Logout</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>User Type</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.users.map((currentUser, i) => {
                            return (
                                <tr>
                                    <td>{currentUser.username}</td>
                                    <td>{currentUser.email}</td>
                                    <td>{currentUser.password}</td>
                                    <td>{currentUser.user_type}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}