import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import {
  Form,
  Button,
  Col,
  Alert,
  InputGroup,
  FormGroup,
  FormControl,
  Navbar,
  Nav,
  ControlLabel
} from "react-bootstrap";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      user_type: "owner"
    };

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
    console.log(this.state.user_type);

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      user_type: this.state.user_type
    };

    axios
      .post("http://localhost:4000/add", newUser)
      .then(res => console.log(res.data));

    this.setState({
      username: "",
      email: "",
      password: "",
      user_type: "owner"
    });
  }

  UserNavbar = () => {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#">Home</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar>
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        <this.UserNavbar />
        <br />
        <div>
          {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">
                    Register
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <br /> */}
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="form-group">
              <label>Email: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
            </div>

            <div className="form-group">
              <label>Password: </label>
              <input
                type="text"
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
                onChange={this.onChangeUser_type}
              >
                <option value="owner">Owner</option>
                <option value="finance">Finance Department</option>
                <option value="maintainence">Technical Department</option>
              </select>
            </div>

            <div className="form-group">
              <input
                type="submit"
                value="Register"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
