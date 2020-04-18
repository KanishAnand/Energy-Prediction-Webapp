//SideNav.js
import React, { Component } from "react";
// import Paper from "material-ui/Paper";
// import Divider from "material-ui/Divider";
// import FlatButton from "material-ui/FlatButton";

import "../css/SideNavbar.css";
// import avi from "../css/logo.ico";

class SideNavbar extends Component {
	render() {
		return (
			<div class="sidenav" align="center">
				<a href="#">About</a>
				<a href="#">Services</a>
				<a href="#">Clients</a>
				<a href="#">Contact</a>
			</div>
		);
	}
}
export { SideNavbar };
