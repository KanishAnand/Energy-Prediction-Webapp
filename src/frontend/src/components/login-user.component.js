import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            user_type: 'owner'
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUser_type = this.onChangeUser_type.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
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
            password: this.state.password,
            user_type: this.state.user_type
        }
        console.log(newUser)
        
        axios.post('http://localhost:4000/login', newUser)
             .then(res => {
                console.log(res.data)
                if(Object.entries(res.data).length){
                    if(newUser.user_type=='owner'){
                        this.props.history.push({
                            pathname: '/customer/:id',
                            id: res.data._id,
                            name: res.data.username
                        })
                    }
                    else if (newUser.user_type=='finance')
                    {
                        this.props.history.push({
                            pathname: '/addproduct/:id',
                            id: res.data._id,
                            name: res.data.username
                        })
                    }
                    else if(newUser.user_type=='maintainence'){
                        this.props.history.push({
                            pathname: '/addproduct/:id',
                            id: res.data._id,
                            name: res.data.username
                        })
                    }
                }
             });

        this.setState({
            username: '',
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
                            <option value="maintainence">Maintainence Department</option>
                        </select> 
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}