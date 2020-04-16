import React, { Component } from "react";
import { Link } from "react-router-dom";
import ls from "local-storage";
import axios from "axios";
import { Navbar, Nav, Alert } from "react-bootstrap";
import useScript from "/home/akshat/Documents/dass12/src/webapp/frontend/src/components/useScript";

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      type: "light",
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
    const div = document.createElement("div");
    div.id = "openweathermap-widget-11";
    document.body.appendChild(div);
    const pwd =
      "/home/akshat/Documents/dass12/src/webapp/frontend/src/components";
    const scripts = [
      pwd + "/d3.min.js",
      pwd + "/usable.js",
      pwd + "/stripped.js",
    ];
    for (const script of scripts) {
      const elm = document.createElement("script");
      elm.type = "text/javascript";
      elm.src = script;
      elm.async = false;
      document.body.appendChild(elm);
    }
  };

  componentDidMount() {
    // this.fetchInfo();
    // this.interval = setInterval(() => {
    //   this.fetchInfo();
    // }, 5000);
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

  LoadScript = (src) => {
    let script = document.createElement("script");
    script.async = false;
    script.src = src;
    document.body.appendChild(script);
  };

  View = () => {
    const pwd =
      "/home/akshat/Documents/dass12/src/webapp/frontend/src/components";
    const scripts = [
      pwd + "/d3.min.js",
      pwd + "/usable.js",
      pwd + "/stripped.js",
    ];
    return (
      <React.Fragment>
        <div id="openweathermap-widget-11"></div>
        {useScript(scripts[0])}
        {useScript(scripts[1])}
        {useScript(scripts[2])}
        {/* {scripts.forEach(this.LoadScript)} */}
      </React.Fragment>
    );
  };

  // componentWillMount() {
  //   clearInterval(this.interval);
  // }

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
