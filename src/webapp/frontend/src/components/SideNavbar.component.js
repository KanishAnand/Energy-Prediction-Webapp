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
			<div className="sidenav" align="center">
				<div className="sideContent">
					<img className="logo" src={logo} alt="Organisation"></img>
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
									className="fa fa-home"
									style={{
										fontsize: "16px",
										marginRight: "10px",
									}}
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
								{" "}
								<i
									className="fa fa-bar-chart"
									style={{
										fontsize: "16px",
										marginRight: "10px",
									}}
								></i>
								Prediction
							</a>
							<a
								href={
									"/" +
									this.state.userType +
									"/" +
									this.state.username +
									"/graphs"
								}
							>
								{" "}
								<i
									className="fa fa-line-chart"
									style={{
										fontsize: "16px",
										marginRight: "10px",
									}}
								></i>
								Graphs
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
								{" "}
								<i
									className="fas fa-cloud-sun-rain"
									style={{
										fontsize: "16px",
										marginRight: "10px",
									}}
								></i>
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
								{" "}
								<i
									className="fa fa-user"
									style={{
										fontsize: "16px",
										marginRight: "10px",
									}}
								></i>
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
								{" "}
								<i
									className="fa fa-users"
									style={{
										fontsize: "16px",
										marginRight: "10px",
									}}
								></i>
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
								{" "}
								<i
									className="fa fa-envelope"
									style={{
										fontsize: "16px",
										marginRight: "10px",
									}}
								></i>
								Customer Care
							</a>
							<a
								href={"/login"}
								onClick={(e) => {
									ls.clear();
									window.location.href = "/login";
								}}
							>
								{" "}
								<i
									className="fa fa-sign-out"
									style={{
										fontsize: "16px",
										marginRight: "10px",
									}}
								></i>
								Logout
							</a>
						</React.Fragment>
					)}
					{!this.state.loggedIn && (
						<React.Fragment>
							<a style={{ paddingTop: "15%" }} href={"/home"}>
								<i
									className="fa fa-home"
									style={{
										fontsize: "16px",
										marginRight: "10px",
									}}
								></i>
								Home
							</a>
							<a href={"/register"}>
								{" "}
								<i
									className="fas fa-user-plus"
									style={{
										fontsize: "16px",
										marginRight: "10px",
									}}
								></i>{" "}
								Register
							</a>
							<a href={"/login"}>
								{" "}
								<i
									className="fa fa-sign-in"
									style={{
										fontsize: "16px",
										marginRight: "10px",
									}}
								></i>{" "}
								Login
							</a>
						</React.Fragment>
					)}
				</div>
			</div>
		);
	}
}
export { SideNavbar };
