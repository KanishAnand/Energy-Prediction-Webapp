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

export default class VendorUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customer_id: this.props.location.id,
      customername: this.props.location.name
    };
  }

  search = e => {
    this.props.history.push({
      pathname: "/list",
      id: this.state.customer_id,
      name: this.state.customername
    });
  };

  submit = e => {
    alert("Predicted Value of Energy Consumption is 120 KW");
    // const d = document.getElementById("start").value;
    // const t = document.getElementById("start1").value;
    // console.log(d);
    // console.log(t);
    // const data = {
    //   date: d,
    //   time: t
    // };
    // axios
    //   .post("http://localhost:4000/prdct", data)
    //   .then(res => {
    //     alert(res.data);
    //   })
    //   .catch(err => console.log(err));
  };

  logout = e => {
    this.props.history.push({
      pathname: "/login"
    });
  };

  UserNavbar = () => {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#">Home</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Link className="nav-link" onClick={e => this.logout(e)}>
              Logout
            </Link>
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
                <li className="navbar-item">
                  <Link className="nav-link" onClick={e => this.logout(e)}>
                    LogOut
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          {/* <button onClick={e => this.logout(e)}>Logout</button> */}
          <Form>
            <Form.Group md="6" controlId="start">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" placeholder="Date" />
            </Form.Group>

            <Form.Group md="6" controlId="start1">
              <Form.Label>Time</Form.Label>
              <Form.Control type="number" placeholder="Time" />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={e => this.submit(e)}
            >
              Submit
            </Button>
          </Form>
          {/* <label for="start">From:</label>
        <input type="date" id="start" name="start" min="2020-03-04"></input>
        <br></br>
        <br></br>

        <label for="start1">From Time:</label>
        <input type="number" id="start1" name="start1" min="0" max="23"></input>
        <br></br>
        <br></br>

        <label for="end">To:</label>
        <input
          type="date"
          id="end"
          name="end"
          min="2020-03-04"
          max="2020-03-20"
        ></input>
        <br></br>
        <br></br>

        <label for="end1">From Time:</label>
        <input type="number" id="end1" name="end1" min="0" max="23"></input>
        <br></br>
        <br></br>

        <button onClick={e => this.submit(e)}>Submit</button> */}
        </div>
      </React.Fragment>
    );
  }
}
