import React, { Component } from "react";
import Card from "./Card.component";
import { Link } from "react-router-dom";
import ls from "local-storage";
import { Navbar, Nav, Alert } from "react-bootstrap";

const weatherURL =
	"http://api.openweathermap.org/data/2.5/forecast?id=1269843&appid=95e286bae5647877dbb924f3779736a8&units=imperial";

export default class Weather extends Component {
	state = {
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
						<Link
							className="nav-link"
							to="/login"
							onClick={(e) => ls.clear()}
						>
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
				console.log("Data List Loaded", data.list);
				const dailyData = data.list.filter((reading) =>
					reading.dt_txt.includes("18:00:00")
				);
				this.setState({ days: dailyData });
			});
	};

	formatCards = () => {
		return this.state.days.map((day, index) => (
			<Card day={day} key={index} />
		));
	};

	render() {
		return (
			<div align="center">
				<this.UserNavbar />
				<h1 className="display-3 jumbotron">5-Day Forecast</h1>
				<h5 className="display-5 text-muted">Hyderabad, India</h5>
				<div className="row justify-content-center">
					{this.formatCards()}
				</div>
			</div>
		);
	}
}
