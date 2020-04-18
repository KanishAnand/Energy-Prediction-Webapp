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

	fetchInfo = () => {
		if (ls.get("username") === null) {
			if (this.state.loggedIn === true) {
				this.setState({ loggedIn: false });
			}
		} else {
			if (this.state.loggedIn === false) {
				this.setState({
					loggedIn: true,
					username: this.state.username,
					userType: this.state.userType,
				});
			}
		}
	};

	componentDidMount() {
		this.fetchInfo();
		this.interval = setInterval(() => {
			this.fetchInfo();
		}, 500);
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
									class="fa fa-bar-chart"
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
									"/weather"
								}
							>
								{" "}
								<i
									class="fas fa-cloud-sun-rain"
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
									class="fa fa-user"
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
									class="fa fa-users"
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
									class="fa fa-envelope"
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
									this.setState({ loggedIn: false });
								}}
							>
								{" "}
								<i
									class="fa fa-sign-out"
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
									class="fa fa-home"
									style={{
										fontsize: "16px",
										marginRight: "10px",
									}}
								></i>
								Home
							</a>
							<a href={"/register"}>
								<i
									class="fa fa-home"
									style={{
										fontsize: "16px",
										marginRight: "10px",
									}}
								></i>
								Register
							</a>
							<a href={"/login"}>
								<i
									class="fa fa-sign-in"
									style={{
										fontsize: "16px",
										marginRight: "10px",
									}}
								></i>
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
