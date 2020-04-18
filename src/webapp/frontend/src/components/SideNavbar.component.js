//SideNav.js
import React, { Component } from "react";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";

import "../css/SideNavbar.css";
import avi from "../css/logo.ico";
class SideNavbar extends Component {
	render() {
		const styles = {
			tabLink: {
				height: 50,
			},
			tabLabel: {
				fontSize: 28,
				color: "white",
				textTransform: "none",
			},
		};
		return (
			<div>
				<Paper
					zDepth={1}
					className="sidenav"
					children={
						<div className="content-wrapper">
							<center>
								<div className="relative-avi-wrapper">
									<Paper className="avi-border" circle />
									<img
										src={avi}
										className="avatar"
										alt="avatar"
									/>
								</div>
							</center>
							<div className="relative-nav-wrapper">
								<center>
									<div>
										<p className="initial">
											W<span className="name">ebapp</span>
										</p>
									</div>
									<div>
										<p className="initial">
											W
											<span className="name">webapp</span>
										</p>
									</div>
								</center>

								<br />
								<Divider />
								<div>
									<FlatButton
										style={styles.tabLink}
										label="Bio"
										labelStyle={styles.tabLabel}
										disableTouchRipple
										fullWidth
									/>
								</div>
								<div>
									<FlatButton
										style={styles.tabLink}
										label="Social"
										labelStyle={styles.tabLabel}
										disableTouchRipple
										fullWidth
									/>
								</div>
								<div>
									<FlatButton
										style={styles.tabLink}
										label="Projects"
										labelStyle={styles.tabLabel}
										disableTouchRipple
										fullWidth
									/>
								</div>
							</div>
						</div>
					}
				/>
			</div>
		);
	}
}
export { SideNavbar };
