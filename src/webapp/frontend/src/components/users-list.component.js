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
      users: [],
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
                "/weather"
              }
            >
              Weather
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
            <Nav.Link
              href={
                "/" +
                this.props.match.params.type +
                "/" +
                this.props.match.params.id +
                "/query"
              }
            >
              Customer Care
            </Nav.Link>
            <Nav.Link
              href={
                "/" +
                this.props.match.params.type +
                "/" +
                this.props.match.params.id +
                "/profile"
              }
            >
              Profile
            </Nav.Link>
            <Link className="nav-link" to="/login" onClick={(e) => ls.clear()}>
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
      .then((response) => {
        this.setState({ users: response.data, message: "", type: "light" });
      })
      .catch((error) => {
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
    setTimeout(() => {
      this.setState({ message: "", type: "light" });
    }, 10000);
    return (
      <React.Fragment>
        {this.state.message !== "" && (
          <React.Fragment>
            <br />
            <Alert
              key="general"
              variant={this.state.type}
              onClose={() => this.setState({ message: "", type: "light" })}
              dismissible
            >
              {this.state.message}
            </Alert>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };

  View = () => {
    let table = [];
    let body = [];
    let row = [];
    row.push(<th key={"name"}>{"Name"}</th>);
    row.push(<th key="username">{"User Name"}</th>);
    row.push(<th key="userType">{"User Type"}</th>);
    body.push(<tr key={0}>{row}</tr>);
    table.push(<thead key="head">{body}</thead>);
    body = [];
    for (let i in this.state.users) {
      row = [];
      row.push(
        <td key={"name" + i}>
          {this.state.users[i]["firstName"] +
            " " +
            this.state.users[i]["lastName"]}
        </td>
      );
      row.push(<td key={"username" + i}>{this.state.users[i]["username"]}</td>);
      row.push(<td key={"userType" + i}>{this.state.users[i]["userType"]}</td>);
      body.push(<tr key={i}>{row}</tr>);
    }
    table.push(<tbody key="body">{body}</tbody>);
    return (
      <React.Fragment>
        <br />
        <Table striped bordered hover variant="dark">
          {table}
        </Table>
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        {ls.get("username") === this.props.match.params.id &&
          ls.get("userType") === this.props.match.params.type && (
            <React.Fragment>
              <this.UserNavbar />
              <this.HandleAlert />
              <this.View />
            </React.Fragment>
          )}
      </React.Fragment>
    );
  }
}
