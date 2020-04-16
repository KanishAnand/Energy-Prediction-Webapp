import React, { Component } from "react";
import { Link } from "react-router-dom";
import ls from "local-storage";
import axios from "axios";
import { Navbar, Nav, Alert } from "react-bootstrap";

export default class Weather extends Component {
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
    // axios
    //   .get("http://localhost:4000/user")
    //   .then((response) => {
    //     this.setState({ users: response.data, message: "", type: "light" });
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
  };

  componentDidMount() {
    this.fetchInfo();
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

  // WeatherScript = () => {
  // window.myWidgetParam ? window.myWidgetParam : (window.myWidgetParam = []);
  // window.myWidgetParam.push({
  //   id: 11,
  //   cityid: "1269843",
  //   appid: "95e286bae5647877dbb924f3779736a8",
  //   units: "metric",
  //   containerid: "openweathermap-widget-11",
  // });
  // var script = document.createElement("script");
  // script.async = true;
  // script.charset = "utf-8";
  // script.src =
  //   "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
  // var s = document.getElementsByTagName("script")[0];
  // s.parentNode.insertBefore(script, s);
  // return (
  // );
  // };

  View = () => {
    return (
      <React.Fragment>
        <div id="openweathermap-widget-11"></div>
        <script src="//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/d3.min.js"></script>
        {/* <script>window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];  window.myWidgetParam.push({id: 11,cityid: '1269843',appid: '95e286bae5647877dbb924f3779736a8',units: 'metric',containerid: 'openweathermap-widget-11',  });  (function() {var script = document.createElement('script');script.async = true;script.charset = "utf-8";script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);  })();</script> */}
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
