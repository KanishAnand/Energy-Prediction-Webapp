import React, { Component } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Col,
  InputGroup,
  FormGroup,
  FormControl,
  ListGroup,
  Table,
  Navbar,
  Nav,
  ControlLabel
} from "react-bootstrap";

export default class Home extends Component {
  HomeNavbar = () => {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar>
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        <this.HomeNavbar />
      </React.Fragment>
    );
  }
}
