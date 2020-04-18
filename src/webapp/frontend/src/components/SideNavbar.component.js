//SideNav.js
import React, { Component } from "react";
import "../css/SideNavbar.css";
import ls from "local-storage";
import logo from "../images/logo.png";

class SideNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: "",
      userType: "",
    };
  }

  componentDidMount() {
    if (ls.get("username") === null) {
      this.setState({ loggedIn: false });
    } else {
      this.setState({
        loggedIn: true,
        username: ls.get("username"),
        userType: ls.get("userType"),
      });
    }
  }

  render() {
    return (
      <div class="sidenav" align="center">
        <div className="sideContent">
          <img src={logo} alt="Organisation"></img>
          {this.state.loggedIn && (
            <React.Fragment>
              <a
                style={{ paddingTop: "15%" }}
                href={
                  "/" +
                  this.state.userType +
                  "/" +
                  this.state.username +
                  "/home"
                }
              >
                <i
                  class="fa fa-home"
                  style={{ fontsize: "16px", marginRight: "10px" }}
                ></i>
                Home
              </a>
              <a
                href={
                  "/" +
                  this.state.userType +
                  "/" +
                  this.state.username +
                  "/predict"
                }
              >
                Prediction
              </a>
              <a
                href={
                  "/" +
                  this.state.userType +
                  "/" +
                  this.state.username +
                  "/weather"
                }
              >
                Weather
              </a>
              <a
                href={
                  "/" +
                  this.state.userType +
                  "/" +
                  this.state.username +
                  "/profile"
                }
              >
                Profile
              </a>
              <a
                href={
                  "/" +
                  this.state.userType +
                  "/" +
                  this.state.username +
                  "/users"
                }
              >
                Users
              </a>
              <a
                href={
                  "/" +
                  this.state.userType +
                  "/" +
                  this.state.username +
                  "/query"
                }
              >
                Customer Care
              </a>
              <a
                href={"/login"}
                onClick={(e) => {
                  ls.clear();
                  window.location.href = "/login";
                }}
              >
                Logout
              </a>
            </React.Fragment>
          )}
          {!this.state.loggedIn && (
            <React.Fragment>
              <a style={{ paddingTop: "15%" }} href={"/home"}>
                <i
                  class="fa fa-home"
                  style={{ fontsize: "16px", marginRight: "10px" }}
                ></i>
                Home
              </a>
              <a href={"/register"}>Register</a>
              <a href={"/login"}>Login</a>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}
export { SideNavbar };
