import React, { Component } from "react";
import Card from "./Card.component";
import { Link } from "react-router-dom";
import ls from "local-storage";
import { Navbar, Nav, Alert } from "react-bootstrap";

const weatherURL =
  "http://api.openweathermap.org/data/2.5/forecast?id=1269843&appid=95e286bae5647877dbb924f3779736a8&units=imperial";

export default class Weather extends Component {
  state = {
    message: "",
    type: "light",
    days: [],
  };

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

  componentDidMount = () => {
    fetch(weatherURL)
      .then((res) => res.json())
      .then((data) => {
        const dailyData = data.list.filter((reading) =>
          reading.dt_txt.includes("18:00:00")
        );
        this.setState({ days: dailyData, message: "", type: "light" });
      })
      .catch((err) => {
        this.setState({ message: err.message, type: "danger" });
      });
  };

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

  formatCards = () => {
    return this.state.days.map((day, index) => <Card day={day} key={index} />);
  };

  render() {
    return (
      <React.Fragment>
        {ls.get("username") === this.props.match.params.id &&
          ls.get("userType") === this.props.match.params.type && (
            <React.Fragment>
              <div align="center">
                <this.UserNavbar />
                <this.HandleAlert />
                <h1 className="display-3 jumbotron">5-Day Forecast</h1>
                <h5 className="display-5 text-muted">Hyderabad, India</h5>
                <div className="row justify-content-center">
                  {this.formatCards()}
                </div>
              </div>
            </React.Fragment>
          )}
      </React.Fragment>
    );
  }
}
