import React, { Component } from "react";
import { Link } from "react-router-dom";
import ls from "local-storage";
import axios from "axios";
import { Navbar, Nav, Alert, Table } from "react-bootstrap";

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      type: "light",
      users: []
    };
  }

  UserNavbar = () => {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#">Home</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link
              href={
                "/" +
                this.props.match.params.type +
                "/" +
                this.props.match.params.id +
                "/predict"
              }
            >
              Prediction
            </Nav.Link>
            <Nav.Link
              href={
                "/" +
                this.props.match.params.type +
                "/" +
                this.props.match.params.id +
                "/users"
              }
            >
              Users
            </Nav.Link>
            <Link className="nav-link" to="/login" onClick={e => ls.clear()}>
              Logout
            </Link>
          </Nav>
        </Navbar>
      </React.Fragment>
    );
  };

  fetchInfo = () => {
    axios
      .get("http://localhost:4000/user")
      .then(response => {
        this.setState({ users: response.data, message: "", type: "light" });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  componentDidMount() {
    this.fetchInfo();
    this.interval = setInterval(() => {
      this.fetchInfo();
    }, 5000);
  }

  HandleAlert = () => {
    return (
      <React.Fragment>
        {this.state.message !== "" && (
          <Alert
            key="general"
            variant={this.state.type}
            onClose={() => this.setState({ message: "", type: "light" })}
            dismissible
          >
            {this.state.message}
          </Alert>
        )}
      </React.Fragment>
    );
  };

  View = () => {
    let table = [];
    let body = [];
    let row = [];
    row.push(<th>{"Name"}</th>);
    row.push(<th>{"User Name"}</th>);
    row.push(<th>{"User Type"}</th>);
    body.push(<tr>{row}</tr>);
    table.push(<thead>{body}</thead>);
    body = [];
    for (let i in this.state.users) {
      row = [];
      row.push(
        <td>
          {this.state.users[i]["firstName"] +
            " " +
            this.state.users[i]["lastName"]}
        </td>
      );
      row.push(<td>{this.state.users[i]["username"]}</td>);
      row.push(<td>{this.state.users[i]["userType"]}</td>);
      body.push(<tr>{row}</tr>);
    }
    table.push(<tbody>{body}</tbody>);
    return (
      <Table striped bordered hover variant="dark">
        {table}
      </Table>
    );
  };

  componentWillMount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <React.Fragment>
        {ls.get("username") === this.props.match.params.id &&
          ls.get("userType") === this.props.match.params.type && (
            <React.Fragment>
              <this.UserNavbar />
              <br />
              <this.HandleAlert />
              <this.View />
            </React.Fragment>
          )}
      </React.Fragment>
    );
  }
}
