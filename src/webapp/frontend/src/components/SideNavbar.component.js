//SideNav.js
import React, { Component } from "react";
import "../css/SideNavbar.css";
import logo from "../images/logo.png";

class SideNavbar extends Component {
	render() {
		return (
			<div class="sidenav" align="center">
				<div className="sideContent">
					<img src={logo} alt="Organisation"></img>
					<a style={{ paddingTop: "15%" }} href="#">
						Home
					</a>
					<a href="#">Prediction</a>
					<a href="#">Weather</a>
					<a href="#">Profile</a>
					<a href="#">Users</a>
					<a href="#">Customer Care</a>
					<a href="#">Logout</a>
				</div>
			</div>
		);
	}
}
export { SideNavbar };
