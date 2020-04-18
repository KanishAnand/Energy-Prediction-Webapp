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
						<i
							class="fa fa-home"
							style={{ fontsize: "16px", marginRight: "10px" }}
						></i>
						Home
					</a>
					<a href="#">
						<i
							class="fa fa-bar-chart"
							style={{ fontsize: "16px", marginRight: "10px" }}
						></i>
						Prediction
					</a>
					<a href="#">
						<i
							class="fas fa-cloud-sun-rain"
							style={{ fontsize: "16px", marginRight: "10px" }}
						></i>
						Weather
					</a>
					<a href="#">
						<i
							class="fa fa-user"
							style={{ fontsize: "16px", marginRight: "10px" }}
						></i>
						Profile
					</a>
					<a href="#">
						<i
							class="fa fa-users"
							style={{ fontsize: "16px", marginRight: "10px" }}
						></i>
						Users
					</a>
					<a href="#">
						<i
							class="fa fa-envelope"
							style={{ fontsize: "16px", marginRight: "10px" }}
						></i>
						Customer Care
					</a>
					<a href="#">
						<i
							class="fa fa-sign-out"
							style={{ fontsize: "16px", marginRight: "10px" }}
						></i>
						Logout
					</a>
				</div>
			</div>
		);
	}
}
export { SideNavbar };
