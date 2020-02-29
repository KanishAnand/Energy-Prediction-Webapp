import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            user_type: 'owner'
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUser_type = this.onChangeUser_type.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onChangeUser_type(event) {
        this.setState({ user_type: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.user_type)

        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            user_type: this.state.user_type
        }

        axios.post('http://localhost:4000/add', newUser)
             .then(res => console.log(res.data));

        this.setState({
            username: '',
            email: '',
            password: '',
            user_type: 'owner'
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />  
                    </div>
                    
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>

                    <div className="form-group">
                        <label>User Type: </label>
                        <select 
                                className="form-control" 
                                value={this.state.user_type}
                                onChange={this.onChangeUser_type}>
                            <option value="owner">Owner</option>
                            <option value="finance">Finance Department</option>
                            <option value="maintainence">Technical Department</option>
                        </select> 
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}