//SideNav.js
import React, { Component } from "react";
// import Paper from "material-ui/Paper";
// import Divider from "material-ui/Divider";
// import FlatButton from "material-ui/FlatButton";

import "../css/SideNavbar.css";
// import avi from "../css/logo.ico";

class SideNavbar extends Component {
	render() {
		// const styles = {
		// 	tabLink: {
		// 		height: 50,
		// 		paddingBottom: "20%",
		// 	},
		// 	tabLabel: {
		// 		fontSize: 28,
		// 		color: "white",
		// 		textTransform: "none",
		// 	},
		// };
		return (
			<div class="sidenav">
				<a href="#">About</a>
				<a href="#">Services</a>
				<a href="#">Clients</a>
				<a href="#">Contact</a>
			</div>

			// <div>
			// 	<Paper
			// 		zDepth={1}
			// 		className="sidenav"
			// 		children={
			// 			<div className="content-wrapper">
			// 				<center
			// 					style={{
			// 						paddingBottom: "70px",
			// 					}}
			// 				>
			// 					<div className="relative-avi-wrapper">
			// 						<Paper className="avi-border" circle />
			// 						<img
			// 							src={avi}
			// 							className="avatar"
			// 							alt="avatar"
			// 						/>
			// 					</div>
			// 				</center>
			// 				<div className="relative-nav-wrapper">
			// 					<center>
			// 						<div>
			// 							<span className="name">
			// 								Energy Consumption
			// 							</span>
			// 						</div>
			// 					</center>

			// 					<br />
			// 					<Divider />
			// 					<div style={{ paddingTop: "50px" }}>
			// 						<FlatButton
			// 							style={styles.tabLink}
			// 							label="Prediction"
			// 							labelStyle={styles.tabLabel}
			// 							disableTouchRipple
			// 							fullWidth
			// 						/>
			// 					</div>
			// 					<div>
			// 						<FlatButton
			// 							style={styles.tabLink}
			// 							label="Weather"
			// 							labelStyle={styles.tabLabel}
			// 							disableTouchRipple
			// 							fullWidth
			// 						/>
			// 					</div>
			// 					<div>
			// 						<FlatButton
			// 							style={styles.tabLink}
			// 							label="Users"
			// 							labelStyle={styles.tabLabel}
			// 							disableTouchRipple
			// 							fullWidth
			// 						/>
			// 					</div>
			// 					{/* <div>
			// 						<FlatButton
			// 							style={styles.tabLink}
			// 							label="Customer Care"
			// 							labelStyle={styles.tabLabel}
			// 							disableTouchRipple
			// 							fullWidth
			// 						/>
			// 					</div>
			// 					<div>
			// 						<FlatButton
			// 							style={styles.tabLink}
			// 							label="Profile"
			// 							labelStyle={styles.tabLabel}
			// 							disableTouchRipple
			// 							fullWidth
			// 						/>
			// 					</div> */}
			// 				</div>
			// 			</div>
			// 		}
			// 	/>
			// </div>
		);
	}
}
export { SideNavbar };
